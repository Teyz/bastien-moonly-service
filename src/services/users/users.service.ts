import { UpdateProfileDTO } from './../../model/dto/user.dto';
import { CryptosService } from 'src/services/cryptos/cryptos.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/model/dto/user.dto';
import { Crypto } from 'src/model/entities/crypto.entity';
import { User } from 'src/model/entities/user.entity';
import { Repository } from 'typeorm';
import { CryptoDTO } from 'src/model/dto/crypto.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Crypto) private readonly cryptoRepo: Repository<Crypto>,
    private cryptoService: CryptosService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = User.create(createUserDto);
    await user.save();

    delete user.password;
    return user;
  }

  async showById(id: number): Promise<User> {
    const user = await this.findById(id);

    delete user.id;
    delete user.password;
    delete user.updatedAt;
    return user;
  }

  async findById(id: number) {
    return await User.findOne(id);
  }

  async findByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }

  async saveorupdateRefreshToke(
    refreshToken: string,
    id: string,
    refreshtokenexpires,
  ) {
    await User.update(id, {
      refreshtoken: refreshToken,
      refreshtokenexpires,
    });
  }

  async updateProfile(
    profile_id: string,
    data: UpdateProfileDTO,
  ): Promise<any> {
    try {
      await User.update(profile_id, data);

      return {
        success: true,
        message: 'Successfully updated profile',
      };
    } catch (err) {
      return {
        error: true,
        message: 'Payload inccorect !',
      };
    }
  }

  async addBookmarkedCrypto(id: number) {
    const crypto = await this.cryptoService.findById(id);
    const allBookmarked = await User.find({ relations: ['bookmarkedCryptos'] });

    const allBookmarkedCrypto = allBookmarked[0].bookmarkedCryptos;

    allBookmarkedCrypto.push(crypto);

    await User.save(allBookmarked);

    return true;
  }

  async getAllBookmarkedCryptos() {
    const user = await User.find({ relations: ['bookmarkedCryptos'] });
    return user[0].bookmarkedCryptos;
  }
}
