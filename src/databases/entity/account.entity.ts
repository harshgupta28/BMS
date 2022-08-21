import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('Account', { schema: 'BMS' })
export class Account extends BaseEntity {
  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'varchar', length: 128, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 128 })
  passwordHash: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
