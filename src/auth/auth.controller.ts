import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwtAuth.guard';
import { LoginAuthGuard } from './loginAuth.guard';
import { RegisterUserAuthGuard } from './registerUser.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards(RegisterUserAuthGuard)
  async registerUser(@Body() body: CreateUserDto) {
    return this.authService.registerUser(
      body.name,
      body.email,
      body.cityId,
      body.phoneNumber,
      body.username,
      body.password,
    );
  }

  @Post('login')
  @UseGuards(LoginAuthGuard)
  async login(@Body('username') username: string) {
    return this.authService.login(username);
  }

  @UseGuards(JwtAuthGuard)
  @Post('user')
  async getUser(@Body('username') username: string) {
    return this.authService.getUser(username);
  }
}
