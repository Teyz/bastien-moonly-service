import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
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

  @Get('all/:userId')
  checkAlerts(@Param() params) {
    console.log(params.userId);

    return this.userAlerteService.getUserAlerts(params.userId);
  }
}
