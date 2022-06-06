import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
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
    return this.userAlerteService.getUserAlerts(params.userId);
  }

  @Delete('single/:alertId')
  removeAlert(@Param() params) {
    return this.userAlerteService.removeAlert(params.alertId);
  }
}
