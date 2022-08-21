import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(
    name: string,
    email: string,
    cityId: string,
    phoneNumber: string,
    username: string,
    password: string,
  ) {
    const passwordHash = await this.generateHash(password);
    const user = await this.userService.createUser(
      name,
      email,
      cityId,
      phoneNumber,
      username,
      passwordHash,
    );
    return user;
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUser(username);
    const isSamePassword = await this.compareHash(password, user.passwordHash);
    if (user && !isSamePassword) {
      return null;
    }
    return user;
  }

  async login(username: string): Promise<any> {
    const user = await this.userService.findUser(username);
    const payload = { sub: user.userId, username: user.username };
    const accessToken = await this.tokenService
      .generateAccessToken(payload)
      .then();
    const refreshToken = await this.tokenService
      .generateRefreshToken(payload)
      .then();
    return { accessToken, refreshToken };
  }

  async getUser(username: string) {
    const user = await this.userService.findUser(username);
    const { password, ...result } = user;
    return result;
  }

  async doesUserExist(username: string): Promise<boolean> {
    return await this.userService.doesUserExist(username);
  }

  async generateHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async compareHash(
    password: string,
    passwordHashInDB: string,
  ): Promise<boolean> {
    const isStringMatched = await bcrypt.compare(password, passwordHashInDB);
    return isStringMatched;
  }
}
