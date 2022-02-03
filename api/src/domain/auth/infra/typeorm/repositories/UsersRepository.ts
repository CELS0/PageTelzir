import {
  ICreateUser,
  IUsersRepository,
} from '@domain/auth/repositories/types/IUsersRepository';
import { DBManager } from '@shared/db';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> implements IUsersRepository {
  async findByUsername(username: string): Promise<User> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(UsersRepository);

    const user = await repository.findOne({ username });

    return user;
  }

  async store({
    username,
    hashPassword,
    profileId,
    isAdmin,
  }: ICreateUser): Promise<void> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(UsersRepository);

    const user = repository.create({
      username,
      hashPassword,
      profileId,
      isAdmin,
    });

    await repository.save(user);
  }
}

export { UsersRepository };
