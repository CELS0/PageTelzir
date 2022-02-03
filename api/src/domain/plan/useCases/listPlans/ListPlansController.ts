import { LocationsRepositoryFactory } from '@domain/plan/repositories/factories/LocationsRepositoryFactory';
import { PlansRepositoryFactory } from '@domain/plan/repositories/factories/PlansRepositoryFactory';
import { formatJSONResponse } from '@libs/apiGateway';
import { ListPlansUseCaseFactory } from '../factories/ListPlansUseCaseFactory';
import { IListPlansReponse, IListPlansRequest } from './ListPlansUseCase';

type IResponse = {
  message: IListPlansReponse[];
  statusCode: number;
};

class ListPlansController {
  async handler({
    origin,
    destiny,
    time,
  }: IListPlansRequest): Promise<IResponse> {
    const listPlansUseCase = ListPlansUseCaseFactory(
      PlansRepositoryFactory(),
      LocationsRepositoryFactory(),
    );

    try {
      const result = await listPlansUseCase.execute({ origin, destiny, time });

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

export { ListPlansController };
