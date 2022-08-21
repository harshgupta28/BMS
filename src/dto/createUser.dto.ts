import { Injectable } from '@nestjs/common';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Injectable()
export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  cityId: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
