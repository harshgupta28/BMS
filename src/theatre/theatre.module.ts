import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../databases/entity/movie.entity';
import { Screen } from '../databases/entity/screen.entity';
import { Show } from '../databases/entity/show.entity';
import { Theatre } from '../databases/entity/theatre.entity';
import { TheatreController } from './theatre.controller';
import { TheatreService } from './theatre.service';
@Module({
  imports: [TypeOrmModule.forFeature([Movie, Screen, Show, Theatre])],
  controllers: [TheatreController],
  providers: [TheatreService],
})
export class TheatreModule {}
