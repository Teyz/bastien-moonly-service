import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserAlerteService } from './user-alerte.service';
import { CreateUserAlerteDto } from './dto/create-user-alerte.dto';

@Controller('userAlerte')
export class UserAlerteController {
  constructor(private readonly userAlerteService: UserAlerteService) {}

  @Post()
  create(@Body() createUserAlerteDto: CreateUserAlerteDto) {
    return this.userAlerteService.create(createUserAlerteDto);
  }

  @Get()
  sendNotification() {
    return this.userAlerteService.checkAlerts(
      '0032782f-04f1-429f-a692-462b76bd40b6',
    );
  }
}
