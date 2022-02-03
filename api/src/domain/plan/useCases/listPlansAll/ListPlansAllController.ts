import { Plan } from '@domain/plan/infra/typeorm/entities/Plan';
import { PlansRepositoryFactory } from '@domain/plan/repositories/factories/PlansRepositoryFactory';
import { formatJSONResponse } from '@libs/apiGateway';
import { ListPlansAllUseCaseFactory } from '../factories/ListPlansAllUseCaseFactory';

type IResponse = {
  message: Plan[];
  statusCode: number;
};

class ListPlansAllController {
  async handler(): Promise<IResponse> {
    const listPlansUseCase = ListPlansAllUseCaseFactory(
      PlansRepositoryFactory(),
    );

    try {
      const result = await listPlansUseCase.execute();

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

export { ListPlansAllController };
