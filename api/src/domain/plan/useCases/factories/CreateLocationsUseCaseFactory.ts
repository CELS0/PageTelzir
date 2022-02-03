import { ILocationsRepository } from '@domain/plan/repositories/types/ILocationsRepository';
import { CreateLocationsUseCase } from '../createlocation/CreateLocationsUseCase';

function CreateLocationsUseCaseFactory(
  locationsRepository: ILocationsRepository,
): CreateLocationsUseCase {
  return new CreateLocationsUseCase(locationsRepository);
}

export { CreateLocationsUseCaseFactory };
