import { Location } from '@domain/plan/infra/typeorm/entities/Location';
import { LocationsRepositoryFactory } from '@domain/plan/repositories/factories/LocationsRepositoryFactory';
import { formatJSONResponse } from '@libs/apiGateway';
import { ListLocationUseCaseFactory } from '../factories/ListLocationUseCaseFactory';

type IResponse = {
  message: Location[];
  statusCode: number;
};

class ListLocationsController {
  async handler(): Promise<IResponse> {
    const listLocationUseCaseFactory = ListLocationUseCaseFactory(
      LocationsRepositoryFactory(),
    );

    try {
      const result = await listLocationUseCaseFactory.execute();

      const response = {
        message: result,
        statusCode: 200,
      };

      return response;
    } catch (error) {
      throw formatJSONResponse(error.body, error.statusCode);
    }
  }
}

export { ListLocationsController };
