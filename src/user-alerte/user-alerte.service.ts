import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/model/entities/user.entity';
import { Crypto } from 'src/model/entities/crypto.entity';
import { Repository } from 'typeorm';
import { CreateUserAlerteDto } from './dto/create-user-alerte.dto';
import { UserAlerte } from './entities/user-alerte.entity';
import { Cron } from '@nestjs/schedule';
import { CryptosService } from 'src/services/cryptos/cryptos.service';
import * as admin from 'firebase-admin';

@Injectable()
export class UserAlerteService {
  constructor(
    @InjectRepository(Crypto) private readonly cryptoRepo: Repository<Crypto>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private cryptoService: CryptosService,
  ) {}

  async create(createUserAlerteDto: CreateUserAlerteDto) {
    const userAlert = new UserAlerte();
    const user = await this.userRepo.findOne(createUserAlerteDto.userId);
    const crypto = await this.cryptoRepo.findOne(createUserAlerteDto.cryptoId);
    userAlert.upper_price = createUserAlerteDto.upper_price;
    userAlert.lower_price = createUserAlerteDto.lower_price;
    userAlert.user = user;
    userAlert.crypto = crypto;

    await userAlert.save();

    return userAlert;
  }

  async checkAlerts(cryptoId: string) {
    const userAlerts = await UserAlerte.find({
      where: {
        crypto: cryptoId,
      },
      relations: ['user'],
    });

    return userAlerts;
  }

  async sendNotification(alert, crypto) {
    const payload = {
      notification: {
        title: `${crypto.name}`,
        body: 'One of your cryptos has reached the limit',
      },
    };
    await admin.messaging().sendToDevice(alert.user.fcmToken, payload);
  }

  @Cron('0 * * * *')
  async handleCron() {
    const cryptos = await this.cryptoService.initCryptoDB();
    cryptos.forEach(async (crypto) => {
      const alertsList = await this.checkAlerts(crypto.id);
      alertsList.forEach((alert) => {
        if (
          crypto.current_price <= alert.lower_price ||
          crypto.current_price >= alert.upper_price
        ) {
          this.sendNotification(alert, crypto);
        }
      });
    });
  }
}
