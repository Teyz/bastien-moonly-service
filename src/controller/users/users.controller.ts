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

  @Put()
  @UseGuards(JwtAuthGuard)
  updateProfile(@Req() req, @Body() updateProfileDTO: UpdateProfileDTO) {
    return this.usersService.updateProfile(req.user.userId, updateProfileDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Post('bookmark')
  addBookmarkedCrypto(@Body() id: number, @Req() req) {
    return this.usersService.addBookmarkedCrypto(id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllBookmarkedCryptos(@Req() req) {
    return this.usersService.getAllBookmarkedCryptos(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/cryptos')
  getAllCryptosWithoutBookmarkedOnes(@Req() req) {
    return this.usersService.getAllCryptosWithoutBookmarkedOnes(
      req.user.userId,
    );
  }
}
