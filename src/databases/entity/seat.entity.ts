import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { BookedSeat } from './bookedseat.entity';
import { Screen } from './screen.entity';

@Entity('Seat', { schema: 'BMS' })
export class Seat extends BaseEntity {
  @Column({ type: 'int' })
  seatNumber: number;

  @Column({ type: 'varchar' })
  screenId: string;

  @ManyToOne(() => Screen, (screen) => screen.seats)
  screen: Screen;

  @OneToMany(() => BookedSeat, (bookedSeats) => bookedSeats.seat)
  bookedSeats: BookedSeat[];
}
