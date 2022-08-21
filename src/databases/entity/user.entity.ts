import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Account } from './account.entity';
import { BaseEntity } from './base.entity';
import { Booking } from './booking.entity';
import { City } from './city.entity';

@Entity('User', { schema: 'BMS' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ type: 'varchar', length: 128 })
  email: string;

  @Column({ type: 'varchar' })
  cityId: string;

  @Column({ type: 'varchar', length: 32 })
  phoneNumber: string;

  @Column({ type: 'timestamp with time zone' })
  recentLoggedInAtUTC: Date;

  @OneToMany(() => Account, (accounts) => accounts.user)
  accounts: Account[];

  @OneToMany(() => Booking, (bookings) => bookings.user)
  bookings: Booking[];

  @ManyToOne(() => City, (city) => city.id)
  city: City;
}
