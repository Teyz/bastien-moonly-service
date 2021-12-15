import { UpdateProfileDTO } from './../../model/dto/user.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
  Put,
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

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateProfile(@Param() params, @Body() updateProfileDTO: UpdateProfileDTO) {
    console.log('ici');

    return this.usersService.updateProfile(params.id, updateProfileDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  addBookmarkedCrypto(@Param() params) {
    console.log('test');
    return this.usersService.addBookmarkedCrypto(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllBookmarkedCryptos() {
    return this.usersService.getAllBookmarkedCryptos();
  }
}
