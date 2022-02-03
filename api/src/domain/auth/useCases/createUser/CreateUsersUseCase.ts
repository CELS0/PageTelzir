import {
  ICreateUser,
  IUsersRepository,
} from '@domain/auth/repositories/types/IUsersRepository';
import { formatJSONResponse } from '@libs/apiGateway';
import { IHashProvider } from '@shared/providers/hash/IHashProvider';

class CreateUsersUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    username,
    hashPassword,
    profileId,
    isAdmin,
  }: ICreateUser): Promise<void> {
    const userExists = await this.usersRepository.findByUsername(username);

    if (userExists) {
      throw formatJSONResponse('User already exists', 400);
    }

    hashPassword = await this.hashProvider.hash(hashPassword);

    await this.usersRepository.store({
      username,
      hashPassword,
      profileId,
      isAdmin,
    });
  }
}

export { CreateUsersUseCase };
