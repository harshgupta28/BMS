import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Account } from './databases/entity/account.entity';
import { BookedSeat } from './databases/entity/bookedseat.entity';
import { Booking } from './databases/entity/booking.entity';
import { City } from './databases/entity/city.entity';
import { Movie } from './databases/entity/movie.entity';
import { Screen } from './databases/entity/screen.entity';
import { Seat } from './databases/entity/seat.entity';
import { Show } from './databases/entity/show.entity';
import { Theatre } from './databases/entity/theatre.entity';
import { User } from './databases/entity/user.entity';
import { TheatreModule } from './theatre/theatre.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(<string>process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        Account,
        BookedSeat,
        Booking,
        City,
        Movie,
        Screen,
        Seat,
        Show,
        Theatre,
        User,
      ],
      synchronize: false,
    }),
    TheatreModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
