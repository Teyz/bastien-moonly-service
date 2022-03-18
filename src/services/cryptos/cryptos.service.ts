import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Crypto, Percentage } from '../../model/entities/crypto.entity';
import { Repository } from 'typeorm';
import { CryptoDTO } from 'src/model/dto/crypto.dto';
import { AlgoliaService } from 'nestjs-algolia';
import axios from 'axios';

@Injectable()
export class CryptosService {
  constructor(
    @InjectRepository(Crypto) private readonly repo: Repository<Crypto>,
    private httpService: HttpService,
    private readonly algoliaService: AlgoliaService,
  ) {}

  public async getAll(): Promise<CryptoDTO[]> {
    return await this.repo
      .find()
      .then((cryptos) => cryptos.map((e) => CryptoDTO.fromEntity(e)));
  }

  public async findById(id: number) {
    return await this.repo.findOne(id);
  }

  public async findByName(name: string): Promise<Crypto | null> {
    return await this.repo.findOne({ name: name });
  }

  private async insert(cryptoDetails) {
    const cryptoEntity: Crypto = this.repo.create();
    const { name, symbol, quote, tags, cmc_rank, id } = cryptoDetails;
    const percentage = quote.USD.percent_change_1h;
    const isIncrease = Math.sign(percentage);
    cryptoEntity.cmc_rank = cmc_rank;
    cryptoEntity.name = name;
    cryptoEntity.icon_url = `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`;
    cryptoEntity.isIncrease = isIncrease > 0 ? true : false;
    cryptoEntity.percentage = percentage.toFixed(2);
    cryptoEntity.current_price = quote.USD.price.toFixed(4);
    cryptoEntity.past_price = [
      { price: quote.USD.price.toFixed(4), date: new Date() },
    ];
    cryptoEntity.symbol = symbol;
    cryptoEntity.tags = tags;
    cryptoEntity.percentages = await this.setPercents(cryptoDetails);
    const cryptoName = {
      name: cryptoEntity.name,
    };
    await this.addRecordToIndex(cryptoName);

    await this.repo.save(cryptoEntity);
  }

  private async setPercents(crypto): Promise<Percentage> {
    return {
      percent_change_1h: crypto.quote.USD.percent_change_1h,
      percent_change_24h: crypto.quote.USD.percent_change_24h,
      percent_change_7d: crypto.quote.USD.percent_change_7d,
    };
  }

  private async update(cryptoDetails) {
    const crypto = await this.findByName(cryptoDetails.name);
    const past_price = crypto.past_price;
    past_price.push({
      price: cryptoDetails.quote.USD.price.toFixed(4),
      date: new Date(),
    });
    await this.repo.update(
      { name: cryptoDetails.name },
      {
        current_price: cryptoDetails.quote.USD.price.toFixed(4),
        past_price: past_price,
        percentages: await this.setPercents(cryptoDetails),
      },
    );
  }

  private async getCryptosData() {
    const headersRequest = {
      'Content-Type': 'application/json',
      'X-CMC_PRO_API_KEY': `909a9b9f-afa8-4f32-8f24-f77224716cbe`,
    };
    const response = await axios.get(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      { headers: headersRequest },
    );

    return response.data.data;
  }

  public async initCryptoDB() {
    const cryptosData = await this.getCryptosData();
    const cryptosDataCoins = cryptosData;
    cryptosDataCoins.map(async (crypto) => {
      if (!(await this.isDatabaseInitiated())) {
        await this.insert(crypto);
      } else {
        await this.update(crypto);
      }
    });
    return {
      code: 200,
      message: 'Database successfully initiated or updated.',
    };
  }

  private async isDatabaseInitiated() {
    return await this.repo
      .find()
      .then(
        (cryptos) => cryptos.map((e) => CryptoDTO.fromEntity(e)).length > 0,
      );
  }

  async addRecordToIndex(record: any) {
    const index = this.algoliaService.initIndex('moonly');

    await index.addObject(record);
  }

  async algoliaSearch(search: string) {
    const indexName = 'moonly';
    const index = this.algoliaService.initIndex(indexName);

    return await index.search(search);
  }

  async filterByPrice(orderBy: 'ASC' | 'DESC') {
    return await this.repo.find({
      order: {
        current_price: orderBy || 'DESC',
      },
    });
  }

  async filterByName(filter: string) {
    return await this.repo.find({
      name: filter,
    });
  }

  async filterByRank(orderBy: 'ASC' | 'DESC') {
    return await this.repo.find({
      order: {
        cmc_rank: orderBy || 'ASC',
      },
    });
  }
}
