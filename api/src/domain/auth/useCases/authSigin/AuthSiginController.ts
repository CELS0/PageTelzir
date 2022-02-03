import { ProfilesRepositoryFactory } from '@domain/auth/repositories/factories/ProfilesRepositoryFactory';
import { UsersRepositoryFactory } from '@domain/auth/repositories/factories/UsersRepositoryFactory';
import { formatJSONResponse } from '@libs/apiGateway';
import { BCryptProviderFactory } from '@shared/providers/hash/factories/BCryptProviderFactory';
import { JsonWebTokenProviderFactory } from '@shared/providers/jwt/factories/JsonWebTokenProviderFactory';
import { AuthSiginUseCaseFactory } from '../factories/AuthSiginUseCaseFactory';
import { IProfileReponse } from './AuthSiginUseCase';

type IResponse = {
  message: IProfileReponse;
  statusCode: number;
};

class AuthSiginController {
  async handler(username: string, password: string): Promise<IResponse> {
    const authSiginUseCase = await AuthSiginUseCaseFactory(
      UsersRepositoryFactory(),
      BCryptProviderFactory(),
      JsonWebTokenProviderFactory(),
      ProfilesRepositoryFactory(),
    );
    try {
      const result = await authSiginUseCase.execute(username, password);

      const response = {
        message: result,
        statusCode: 201,
      };

      return response;
    } catch (error) {
      throw formatJSONResponse(error.body, error.statusCode);
    }
  }
}

export { AuthSiginController };
