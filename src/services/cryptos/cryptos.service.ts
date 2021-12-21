import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Crypto } from '../../model/entities/crypto.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CryptoDTO } from 'src/model/dto/crypto.dto';
import { Observable } from 'rxjs';
import { AlgoliaService } from 'nestjs-algoliasearch-2';

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
    const { name, iconUrl, symbol, price, sparkline, percentage } =
      cryptoDetails;
    cryptoEntity.name = name;
    cryptoEntity.iconUrl = iconUrl;
    cryptoEntity.percentage = percentage;
    cryptoEntity.current_price = price;
    cryptoEntity.symbol = symbol;
    cryptoEntity.past_price = sparkline;
    cryptoEntity.percentage = this.getPercentage(
      sparkline,
      cryptoEntity,
    ).toFixed(2);

    await this.repo.save(cryptoEntity);
  }

  private async update(name: string, newValue) {
    await this.repo.update({ name: name }, { past_price: newValue });
  }

  private async getCryptosData() {
    const headersRequest = {
      'Content-Type': 'application/json', // afaik this one is not needed
      'x-access-token': `coinrankingde79b56531fa0c2ab0242b702af9fa881304242bf5f5f5c6`,
    };
    const response = await this.httpService
      .get('https://api.coinranking.com/v2/coins', { headers: headersRequest })
      .toPromise()
      .catch((err) => {
        throw new HttpException(err.response.data, err.response.status);
      });

    return response.data;
  }

  public async initCryptoDB() {
    const cryptosData = await this.getCryptosData();
    const cryptosDataCoins = cryptosData.data.coins;
    cryptosDataCoins.map(async (crypto) => {
      if (!(await this.isDatabaseInitiated())) {
        await this.insert(crypto);
      } else {
        this.saveObjectToIndex(crypto);
        await this.update(crypto.name, crypto.sparkline);
      }
    });
    return {
      code: 200,
      message: 'Database successfully initiated or updated.',
    };
  }

  private getPercentage(sparkline: number[], cryptoEntity: Crypto) {
    const sparklineLength: number = sparkline.length;
    const lastPrice: number = sparkline[sparklineLength - 2];
    const currentPrice: number = sparkline[sparklineLength - 1];
    const priceDifference: number = currentPrice - lastPrice;
    const percentage: number = (priceDifference / lastPrice) * 100;
    if (percentage > 0) {
      cryptoEntity.isIncrease = true;
      return percentage;
    }
    cryptoEntity.isIncrease = false;
    return percentage;
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
}
