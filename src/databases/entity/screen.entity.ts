import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Seat } from './seat.entity';
import { Show } from './show.entity';
import { Theatre } from './theatre.entity';

@Entity('Screen', { schema: 'BMS' })
export class Screen extends BaseEntity {
  @Column({ type: 'int' })
  screenNumber: number;

  @Column({ type: 'int' })
  totalSeats: number;

  @Column({ type: 'varchar' })
  theatreId: string;

  @OneToMany(() => Show, (shows) => shows.screen)
  shows: Show[];

  @ManyToOne(() => Theatre, (theatre) => theatre.screens)
  theatre: Theatre;

  @OneToMany(() => Seat, (seats) => seats.screen)
  seats: Seat[];
}
