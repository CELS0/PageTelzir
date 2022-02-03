import { formatJSONResponse } from '@libs/apiGateway';
import {
  ICreatePlan,
  IPlansRepository,
} from '../../repositories/types/IPlansRepository';

class CreatePlansUseCase {
  constructor(private plansRepository: IPlansRepository) {}

  async execute({
    title,
    description,
    timeExtend,
  }: ICreatePlan): Promise<void> {
    const PlainExists = await this.plansRepository.findPlan({
      title,
      timeExtend,
    });

    if (PlainExists) {
      throw formatJSONResponse('Plain already exists', 400);
    }

    await this.plansRepository.store({ title, description, timeExtend });
  }
}

export { CreatePlansUseCase };
