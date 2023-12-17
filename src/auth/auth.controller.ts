import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { RegistrationGuard } from './guards/registration.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginGuard } from './guards/login.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LoginGuard)
  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const user = await this.userService.login(loginUserDto);

    const access = await this.authService.generateAccessToken(user);
    const refresh = await this.authService.generateRefreshToken(
      user._id as string,
    );

    res.statusCode = HttpStatus.OK;
    return res.send({ ...access, ...refresh, username: user.username });
  }

  @UseGuards(RegistrationGuard)
  @Post('registration')
  async registrationUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    await this.userService.registration(createUserDto);

    res.statusCode = HttpStatus.CREATED;
    return res.send('user created');
  }
}
