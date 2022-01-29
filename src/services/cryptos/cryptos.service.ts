import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Crypto } from '../../model/entities/crypto.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CryptoDTO } from 'src/model/dto/crypto.dto';
import { map } from 'rxjs/operators';
import { AlgoliaService } from 'nestjs-algoliasearch-2';
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
    cryptoEntity.past_price = [quote.USD.price.toFixed(4)];
    cryptoEntity.symbol = symbol;
    cryptoEntity.tags = tags;

    await this.repo.save(cryptoEntity);
  }

  private async update(name: string, newValue) {
    const crypto = await this.findByName(name);
    crypto.past_price.push(newValue);
    await this.repo.update(
      { name: name },
      {
        current_price: newValue.toFixed(4),
        past_price: crypto.past_price,
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
        this.saveObjectToIndex(crypto);
        await this.insert(crypto);
      } else {
        await this.update(crypto.name, crypto.quote.USD.price);
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

  async addBookmarkedCrypto(id: number) {
    const crypto = await this.findById(id);
    await this.repo.update(id, crypto);

    return true;
  }

  async saveObjectToIndex(objectToSave: any) {
    const indexName = 'moonly';
    const index = this.algoliaService.initIndex(indexName);

    await index.saveObject(objectToSave, {
      autoGenerateObjectIDIfNotExist: true,
    });
  }

  async algoliaSearch(search: string) {
    const indexName = 'moonly';
    const index = this.algoliaService.initIndex(indexName);

    return await index.search(search);
  }

  async filterByPrice(filter: string) {
    return await this.repo.find({
      order: {
        current_price: filter === 'desc' ? 'DESC' : 'ASC',
      },
    });
  }

  async filterByName(filter: string) {
    return await this.repo.find({
      order: {
        name: filter === 'desc' ? 'DESC' : 'ASC',
      },
    });
  }

  async filterByRank() {
    return await this.repo.find({
      order: {
        cmc_rank: 'ASC',
      },
    });
  }
}
