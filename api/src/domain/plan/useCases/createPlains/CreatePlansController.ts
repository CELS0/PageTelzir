import { PlansRepositoryFactory } from '@domain/plan/repositories/factories/PlansRepositoryFactory';
import { formatJSONResponse } from '@libs/apiGateway';
import { ICreatePlan } from '../../repositories/types/IPlansRepository';
import { CreatePlansUseCaseFactory } from '../factories/CreatePlansUseCaseFactory';

type IResponse = {
  message: string;
  statusCode: number;
};

class CreatePlansController {
  async handler({
    title,
    description,
    timeExtend,
  }: ICreatePlan): Promise<IResponse> {
    const createPlainUseCase = CreatePlansUseCaseFactory(
      PlansRepositoryFactory(),
    );

    try {
      await createPlainUseCase.execute({
        title,
        description,
        timeExtend,
      });

      const response = {
        message: 'Plain create success',
        statusCode: 201,
      };

      return response;
    } catch (error) {
      throw formatJSONResponse(error.body, error.statusCode);
    }
  }
}

export { CreatePlansController };
