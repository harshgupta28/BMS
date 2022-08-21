import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../databases/entity/movie.entity';
import { Screen } from '../databases/entity/screen.entity';
import { Show } from '../databases/entity/show.entity';
import { Theatre } from '../databases/entity/theatre.entity';
import { TheatreInterface } from '../databases/model/theatre.interface';

@Injectable()
export class TheatreService {
  constructor(
    @InjectRepository(Screen)
    private screenRepository: Repository<Screen>,
    @InjectRepository(Theatre)
    private theatreRepository: Repository<Theatre>,
  ) {}

  async getMovies(theatreId: string): Promise<any[]> {
    const movieData = await this.screenRepository
      .createQueryBuilder('screen')
      .innerJoin(Show, 'show', 'screen.id = show."screenId"')
      .innerJoin(Movie, 'movie', 'show."movieId" = movie.id')
      .where('screen.theatreId = :id', { id: theatreId })
      .select('movie.name', 'movieName')
      .addSelect('movie.id', 'movieId')
      .addSelect('movie.language', 'movieLanguage')
      .addSelect('movie.durationInMin', 'movieDuration')
      .getRawMany();
    return movieData;
  }

  async getTheatresInCity(cityId: string): Promise<TheatreInterface[]> {
    const theatreListFromDB = await this.theatreRepository
      .createQueryBuilder('theatre')
      .leftJoin(Screen, 'screen', 'theatre.id = screen."theatreId"')
      .select('theatre.id', 'theatreId')
      .addSelect('theatre.name', 'theatreName')
      .addSelect('theatre.cityId', 'cityId')
      .addSelect('COUNT(screen)', 'screenCount')
      .where('theatre.cityId = :cityId', { cityId: cityId })
      .groupBy('theatre.id')
      .getRawMany();

    const theatreList = this.getTheatres(theatreListFromDB);
    return theatreList;
  }

  async getTheatresForMovieInCity(
    cityId: string,
    movieId: string,
  ): Promise<TheatreInterface[]> {
    const theatreListFromDB = await this.theatreRepository
      .createQueryBuilder('theatre')
      .innerJoin(Screen, 'screen', 'theatre.id = screen."theatreId"')
      .innerJoin(Show, 'show', 'screen.id = show."screenId"')
      .select('theatre.id', 'theatreId')
      .addSelect('theatre.name', 'theatreName')
      .addSelect('theatre.cityId', 'cityId')
      .addSelect('COUNT(screen)', 'screenCount')
      .where('theatre.cityId = :cityId', { cityId: cityId })
      .andWhere('show.movieId = :movieId', { movieId: movieId })
      .groupBy('theatre.id')
      .getRawMany();

    const theatreList = this.getTheatres(theatreListFromDB);
    return theatreList;
  }

  getTheatres(theatreListFromDB) {
    const theatreList = [];
    theatreListFromDB.forEach((theatre) => {
      const theatreObj: TheatreInterface = {
        id: theatre.theatreId,
        name: theatre.theatreName,
        cityId: theatre.cityId,
        numberOfScreens: theatre.screenCount,
      };
      theatreList.push(theatreObj);
    });
    return theatreList;
  }
}
