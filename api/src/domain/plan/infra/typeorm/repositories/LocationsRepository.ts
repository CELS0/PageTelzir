import { ILocationsRepository } from '@domain/plan/repositories/types/ILocationsRepository';
import { DBManager } from '@shared/db';
import { EntityRepository, Repository } from 'typeorm';
import { Location } from '../entities/Location';

@EntityRepository(Location)
class LocationsRepository
  extends Repository<Location>
  implements ILocationsRepository
{
  async findLocation(origin: string, destiny: string): Promise<Location> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(LocationsRepository);

    const location = await repository.findOne({ origin, destiny });

    return location;
  }

  async store({
    origin,
    destiny,
    pricing,
  }: {
    origin: string;
    destiny: string;
    pricing: number;
  }): Promise<void> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(LocationsRepository);

    const location = repository.create({ origin, destiny, pricing });

    await repository.save(location);
  }

  async findById(locationId: number): Promise<Location> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(LocationsRepository);

    const location = await repository.findOne(locationId);

    return location;
  }

  async list(): Promise<Location[]> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(LocationsRepository);

    const locations = await repository.find();

    return locations;
  }
}
export { LocationsRepository };
