import { LocationsRepositoryFactory } from '@domain/plan/repositories/factories/LocationsRepositoryFactory';
import { ICreateLocation } from '@domain/plan/repositories/types/ILocationsRepository';
import { formatJSONResponse } from '@libs/apiGateway';
import { SECRET_JWT } from '@shared/constants';
import { JsonWebTokenProviderFactory } from '@shared/providers/jwt/factories/JsonWebTokenProviderFactory';
import { CreateLocationsUseCaseFactory } from '../factories/CreateLocationsUseCaseFactory';

type IResponse = {
  message: string;
  statusCode: number;
};

class CreateLocationsController {
  async handler(
    { origin, destiny, pricing }: ICreateLocation,
    token: string,
  ): Promise<IResponse> {
    const createLocationsUseCase = CreateLocationsUseCaseFactory(
      LocationsRepositoryFactory(),
    );

    try {
      const jsonWebTokenProvider = JsonWebTokenProviderFactory();

      await jsonWebTokenProvider.validatedToken(token, SECRET_JWT);

      await createLocationsUseCase.execute({
        origin,
        destiny,
        pricing,
      });

      const response = {
        message: 'Location create success',
        statusCode: 201,
      };

      return response;
    } catch (error) {
      throw formatJSONResponse(error.body, error.statusCode);
    }
  }
}

export { CreateLocationsController };
