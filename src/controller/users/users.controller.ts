import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { CreateUserDto } from 'src/model/dto/user.dto';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  addBookmarkedCrypto(@Param() params, @Req() req) {
    return this.usersService.addBookmarkedCrypto(params.id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllBookmarkedCryptos() {
    return this.usersService.getAllBookmarkedCryptos();
  }
}
