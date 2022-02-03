import { Location } from '@domain/plan/infra/typeorm/entities/Location';
import { ILocationsRepository } from '@domain/plan/repositories/types/ILocationsRepository';

class ListLocationsUseCase {
  constructor(private locationsRepository: ILocationsRepository) {}

  async execute(): Promise<Location[]> {
    const locations = await this.locationsRepository.list();

    return locations;
  }
}
export { ListLocationsUseCase };
