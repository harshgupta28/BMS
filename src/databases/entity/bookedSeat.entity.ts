import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Booking } from './booking.entity';
import { Seat } from './seat.entity';
import { Show } from './show.entity';

@Entity('BookedSeat', { schema: 'BMS' })
export class BookedSeat extends BaseEntity {
  @Column({ type: 'varchar' })
  seatId: string;

  @Column({ type: 'varchar' })
  showId: string;

  @Column({ type: 'varchar' })
  bookingId: string;

  @ManyToOne(() => Seat, (seat) => seat.id)
  seat: Seat;

  @ManyToOne(() => Show, (show) => show.id)
  show: Show;

  @ManyToOne(() => Booking, (booking) => booking.id)
  booking: Booking;
}
