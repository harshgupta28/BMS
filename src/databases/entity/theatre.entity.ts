import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { City } from './city.entity';
import { Screen } from './screen.entity';

@Entity('Theatre', { schema: 'BMS' })
export class Theatre extends BaseEntity {
  @Column({ type: 'varchar', length: 64 })
  name: string;

  @Column({ type: 'varchar' })
  cityId: string;

  @OneToMany(() => Screen, (screens) => screens.theatre)
  screens: Screen[];

  @ManyToOne(() => City, (city) => city.theatres)
  city: City;
}
