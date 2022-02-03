import { IPlansRepository } from '@domain/plan/repositories/types/IPlansRepository';
import { ListPlansAllUseCase } from '../listPlansAll/ListPlansAllUseCase';

function ListPlansAllUseCaseFactory(
  plansRepository: IPlansRepository,
): ListPlansAllUseCase {
  return new ListPlansAllUseCase(plansRepository);
}

export { ListPlansAllUseCaseFactory };
