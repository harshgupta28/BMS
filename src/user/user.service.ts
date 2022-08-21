import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/databases/entity/account.entity';
import { User } from 'src/databases/entity/user.entity';
import { UserInterface } from 'src/databases/model/user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(
    name: string,
    email: string,
    cityId: string,
    phoneNumber: string,
    username: string,
    passwordHash: string,
  ) {
    const user = await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { name, email, cityId, phoneNumber, recentLoggedInAtUTC: new Date() },
      ])
      .execute();

    const userId = user.identifiers[0].id;
    await this.createAccount(userId, username, passwordHash);

    return { userId, username };
  }
  async createAccount(userId: string, username: string, passwordHash: string) {
    await this.accountRepository
      .createQueryBuilder()
      .insert()
      .into(Account)
      .values([{ userId, username, passwordHash }])
      .execute();
  }

  async findUser(username: string): Promise<any> {
    const user: UserInterface = await this.accountRepository
      .createQueryBuilder('account')
      .select('account.userId')
      .addSelect('account.username')
      .addSelect('account.passwordHash')
      .where('account.username = :username', { username: username })
      .getOne();

    return user;
  }

  async doesUserExist(username: string): Promise<boolean> {
    const existingUserName = await this.accountRepository
      .createQueryBuilder('account')
      .select('account.username')
      .where('account.username = :username', { username: username })
      .getOne();

    if (existingUserName) {
      return true;
    }
    return false;
  }
}
