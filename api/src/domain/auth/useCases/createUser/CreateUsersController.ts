import { UsersRepositoryFactory } from '@domain/auth/repositories/factories/UsersRepositoryFactory';
import { ICreateUser } from '@domain/auth/repositories/types/IUsersRepository';
import { formatJSONResponse } from '@libs/apiGateway';
import { BCryptProviderFactory } from '@shared/providers/hash/factories/BCryptProviderFactory';
import { CreateUsersUseCaseFactory } from '../factories/CreateUsersUseCaseFactory';

type IResponse = {
  message: string;
  statusCode: number;
};

class CreateUsersController {
  async handler({
    username,
    hashPassword,
    profileId,
    isAdmin,
  }: ICreateUser): Promise<IResponse> {
    const createUsersUseCase = CreateUsersUseCaseFactory(
      UsersRepositoryFactory(),
      BCryptProviderFactory(),
    );
    try {
      await createUsersUseCase.execute({
        username,
        hashPassword,
        profileId,
        isAdmin,
      });

      const response = {
        message: 'User create success',
        statusCode: 201,
      };

      return response;
    } catch (error) {
      throw formatJSONResponse(error.body, error.statusCode);
    }
  }
}

export { CreateUsersController };
