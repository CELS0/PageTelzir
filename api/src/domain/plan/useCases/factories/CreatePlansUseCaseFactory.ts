import { IPlansRepository } from '@domain/plan/repositories/types/IPlansRepository';
import { CreatePlansUseCase } from '../createPlains/CreatePlansUseCase';

function CreatePlansUseCaseFactory(
  plansRepository: IPlansRepository,
): CreatePlansUseCase {
  return new CreatePlansUseCase(plansRepository);
}

export { CreatePlansUseCaseFactory };
