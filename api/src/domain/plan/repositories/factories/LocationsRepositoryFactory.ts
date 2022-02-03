import { LocationsRepository } from '@domain/plan/infra/typeorm/repositories/LocationsRepository';
import { ILocationsRepository } from '../types/ILocationsRepository';

function LocationsRepositoryFactory(): ILocationsRepository {
  return new LocationsRepository();
}

export { LocationsRepositoryFactory };
