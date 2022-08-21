import { Controller, Get, Param } from '@nestjs/common';
import { TheatreInterface } from '../databases/model/theatre.interface';
import { TheatreService } from './theatre.service';

@Controller('theatre')
export class TheatreController {
  constructor(private readonly theatreService: TheatreService) {}

  @Get('city/:cityId')
  getTheatresInCity(
    @Param('cityId') cityId: string,
  ): Promise<TheatreInterface[]> {
    return this.theatreService.getTheatresInCity(cityId);
  }

  @Get('movies/:theatreId')
  async getMovies(@Param('theatreId') theatreId: string): Promise<any[]> {
    return await this.theatreService.getMovies(theatreId);
  }

  @Get('movie/:cityId/:movieId')
  getTheatresForMovieInCity(
    @Param('cityId') cityId: string,
    @Param('movieId') movieId: string,
  ): Promise<TheatreInterface[]> {
    return this.theatreService.getTheatresForMovieInCity(cityId, movieId);
  }
}
