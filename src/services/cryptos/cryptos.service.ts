import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Crypto } from '../../model/entities/crypto.entity';
import { Repository } from 'typeorm';
import { CryptoDTO } from 'src/model/dto/crypto.dto';

@Injectable()
export class CryptosService {
    constructor(@InjectRepository(Crypto) private readonly repo: Repository<Crypto>) { }

    public async getAll(): Promise<CryptoDTO[]> {
        return await this.repo.find();
    }
}
