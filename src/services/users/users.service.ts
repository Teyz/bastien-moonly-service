import { UpdateProfileDTO } from './../../model/dto/user.dto';
import { CryptosService } from 'src/services/cryptos/cryptos.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/model/dto/user.dto';
import { Crypto } from 'src/model/entities/crypto.entity';
import { User } from 'src/model/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Crypto) private readonly cryptoRepo: Repository<Crypto>,
    private cryptoService: CryptosService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await User.create(createUserDto);
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

  async findByUsername(username: string) {
    return await User.findOne({
      where: {
        username: username,
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

  async updateProfile(userId: number, data: UpdateProfileDTO): Promise<any> {
    try {
      await User.update(userId, {
        username: data.username,
        email: data.email,
        password: await bcrypt.hash(data.password, 8),
      });

      return {
        success: true,
        message: 'Successfully updated profile',
      };
    } catch (err) {
      console.log(err);

      return {
        error: true,
        message: 'Payload inccorect !',
      };
    }
  }

  async addBookmarkedCrypto(id: number, userId: number): Promise<any> {
    const crypto = await this.cryptoService.findById(id);
    const user = await this.findById(userId);

    const isAlreadyBookmarked = await this.isAlreadyBookmarked(crypto, userId);

    const userBookmarkedCryptos = await User.find({
      where: {
        id: userId,
      },
      relations: ['bookmarkedCryptos'],
    });

    let allBookmarkedCryptos: Crypto[] = [];

    if (userBookmarkedCryptos[0].bookmarkedCryptos !== undefined) {
      allBookmarkedCryptos = userBookmarkedCryptos[0].bookmarkedCryptos;
    }

    if (isAlreadyBookmarked) {
      await this.removeBookmarkedCrypto(crypto.id, allBookmarkedCryptos, user);
      return {
        success: true,
        type: 0,
        message: 'This crypto has been unbookmarked.',
      };
    } else {
      allBookmarkedCryptos.push(crypto);

      user.bookmarkedCryptos = allBookmarkedCryptos;

      User.save(user);

      return {
        success: true,
        type: 1,
        message: 'This crypto has been bookmarked.',
      };
    }
  }

  private async removeBookmarkedCrypto(
    id: string,
    allBookmarkedCryptos: Crypto[],
    user: User,
  ) {
    const bookmarkedCryptos = allBookmarkedCryptos.filter((crypto) => {
      return crypto.id !== id.toString();
    });

    user.bookmarkedCryptos = bookmarkedCryptos;

    User.save(user);
  }

  private async isAlreadyBookmarked(
    cryptoToBookmard: Crypto,
    userId: number,
  ): Promise<boolean> {
    const userBookmarkedCryptos = await User.find({
      where: {
        id: userId,
      },
      relations: ['bookmarkedCryptos'],
    });

    let allBookmarkedCryptos: Crypto[] = [];

    if (userBookmarkedCryptos[0].bookmarkedCryptos !== undefined) {
      allBookmarkedCryptos = userBookmarkedCryptos[0].bookmarkedCryptos;
    }

    const isAlreadyBookmarked = allBookmarkedCryptos.map(
      (cryptoBookmarked: Crypto) => {
        return cryptoBookmarked.id === cryptoToBookmard.id;
      },
    );

    return isAlreadyBookmarked.includes(true);
  }

  async getAllBookmarkedCryptos(userId: number): Promise<Crypto[]> {
    const userBookmarkedCryptos = await User.find({
      where: {
        id: userId,
      },
      relations: ['bookmarkedCryptos'],
    });
    return (await userBookmarkedCryptos[0].bookmarkedCryptos) || [];
  }
}
