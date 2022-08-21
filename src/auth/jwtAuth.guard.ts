import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request: Request): Promise<any> {
    let authHeaders = '';
    let accessToken = '';

    try {
      authHeaders = request.headers.authorization;
      accessToken = <string>authHeaders.split(' ')[1];
    } catch (err) {
      throw new UnauthorizedException('Access token is not set');
    }

    await this.tokenService.validateAccessToken(accessToken).catch((err) => {
      throw new UnauthorizedException(err.message);
    });

    const username = request.body.username;
    const user = await this.authService.getUser(username);
    return user;
  }
}
