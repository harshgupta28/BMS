import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Show } from './show.entity';

@Entity('Movie', { schema: 'BMS' })
export class Movie extends BaseEntity {
  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ type: 'int' })
  durationInMin: number;

  @Column({ type: 'varchar', length: 32 })
  language: string;

  @OneToMany(() => Show, (shows) => shows.movie)
  shows: Show[];
}
