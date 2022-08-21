import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { BookedSeat } from './bookedseat.entity';
import { Booking } from './booking.entity';
import { Movie } from './movie.entity';
import { Screen } from './screen.entity';

@Entity('Show', { schema: 'BMS' })
export class Show extends BaseEntity {
  @Column({ type: 'timestamp with time zone' })
  startTimeInUTC: Date;

  @Column({ type: 'timestamp with time zone' })
  endTimeInUTC: Date;

  @Column({ type: 'timestamp with time zone' })
  availableUntil: Date;

  @Column({ type: 'varchar' })
  screenId: string;

  @Column({ type: 'varchar' })
  movieId: string;

  @ManyToOne(() => Movie, (movie) => movie.id)
  movie: Movie;

  @ManyToOne(() => Screen, (screen) => screen.shows)
  screen: Screen;

  @OneToMany(() => Booking, (bookings) => bookings.show)
  bookings: Booking[];

  @OneToMany(() => BookedSeat, (bookedSeats) => bookedSeats.show)
  bookedSeats: BookedSeat[];
}
