import { IUsersRepository } from '@domain/auth/repositories/types/IUsersRepository';
import { IHashProvider } from '@shared/providers/hash/IHashProvider';
import { CreateUsersUseCase } from '../createUser/CreateUsersUseCase';

function CreateUsersUseCaseFactory(
  usersRepository: IUsersRepository,
  hashProvider: IHashProvider,
): CreateUsersUseCase {
  return new CreateUsersUseCase(usersRepository, hashProvider);
}

export { CreateUsersUseCaseFactory };
