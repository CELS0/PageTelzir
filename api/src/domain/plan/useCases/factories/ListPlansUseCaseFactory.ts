import { ILocationsRepository } from '@domain/plan/repositories/types/ILocationsRepository';
import { IPlansRepository } from '@domain/plan/repositories/types/IPlansRepository';
import { ListPlansUseCase } from '../listPlans/ListPlansUseCase';

function ListPlansUseCaseFactory(
  plansRepository: IPlansRepository,
  locationsRepository: ILocationsRepository,
): ListPlansUseCase {
  return new ListPlansUseCase(plansRepository, locationsRepository);
}

export { ListPlansUseCaseFactory };
