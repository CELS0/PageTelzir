import { Location } from '@domain/plan/infra/typeorm/entities/Location';

type ICreateLocation = {
  origin: string;
  destiny: string;
  pricing: number;
};

interface ILocationsRepository {
  store({ origin, destiny, pricing }: ICreateLocation): Promise<void>;
  findById(locationId: number): Promise<Location>;
  findLocation(origin: string, destiny: string): Promise<Location>;
  list(): Promise<Location[]>;
}
export { ILocationsRepository, ICreateLocation };
