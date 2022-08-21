import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { BookedSeat } from './bookedseat.entity';
import { Show } from './show.entity';
import { User } from './user.entity';

@Entity('Booking', { schema: 'BMS' })
export class Booking extends BaseEntity {
  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'varchar' })
  showId: string;

  @Column({ type: 'int' })
  numberOfSeatsBooked: number;

  @Column({ type: 'date' })
  showDate: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Show, (show) => show.id)
  show: Show;

  @OneToMany(() => BookedSeat, (bookedSeats) => bookedSeats.booking)
  bookedSeats: BookedSeat[];
}
