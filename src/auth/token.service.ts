import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async generateAccessToken(payload: any): Promise<any> {
    const accessToken = this.jwtService.sign(
      { data: payload },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRIATION,
      },
    );
    return accessToken;
  }

  async validateAccessToken(accessToken: any) {
    try {
      await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
    } catch (err) {
      if (err.message == 'jwt expired') {
        // todo - generate refresh token
        throw new UnauthorizedException(err.message);
      } else {
        throw new UnauthorizedException(err.message);
      }
    }
  }

  async generateRefreshToken(payload: any): Promise<any> {
    const refreshToken = this.jwtService.sign(
      { data: payload },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRIATION,
      },
    );
    return refreshToken;
  }

  async validateRefreshToken(refreshToken: any) {
    try {
      await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
