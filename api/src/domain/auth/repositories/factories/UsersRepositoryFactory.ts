import { UsersRepository } from '@domain/auth/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '../types/IUsersRepository';

function UsersRepositoryFactory(): IUsersRepository {
  return new UsersRepository();
}

export { UsersRepositoryFactory };
