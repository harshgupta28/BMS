import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Theatre } from './theatre.entity';
import { User } from './user.entity';

@Entity('City', { schema: 'BMS' })
export class City extends BaseEntity {
  @Column({ type: 'varchar', length: 64 })
  name: string;

  @OneToMany(() => Theatre, (theatres) => theatres.city)
  theatres: Theatre[];

  @OneToMany(() => User, (users) => users.city)
  users: User[];
}
