import { ILocationsRepository } from '@domain/plan/repositories/types/ILocationsRepository';
import { ListLocationsUseCase } from '../listLocation/ListLocationsUseCase';

function ListLocationUseCaseFactory(
  locationsRepository: ILocationsRepository,
): ListLocationsUseCase {
  return new ListLocationsUseCase(locationsRepository);
}

export { ListLocationUseCaseFactory };
