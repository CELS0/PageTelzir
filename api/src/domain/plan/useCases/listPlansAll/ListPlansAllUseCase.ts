import { Plan } from '@domain/plan/infra/typeorm/entities/Plan';
import { IPlansRepository } from '@domain/plan/repositories/types/IPlansRepository';

class ListPlansAllUseCase {
  constructor(private plansRepository: IPlansRepository) {}

  async execute(): Promise<Plan[]> {
    const plans = await this.plansRepository.list();

    return plans;
  }
}

export { ListPlansAllUseCase };
