import {
  ICreateLocation,
  ILocationsRepository,
} from '@domain/plan/repositories/types/ILocationsRepository';
import { formatJSONResponse } from '@libs/apiGateway';

class CreateLocationsUseCase {
  constructor(private locationsRepository: ILocationsRepository) {}

  async execute({ origin, destiny, pricing }: ICreateLocation): Promise<void> {
    const locationExists = await this.locationsRepository.findLocation(
      origin,
      destiny,
    );

    if (locationExists) {
      throw formatJSONResponse('Location already exists', 400);
    }

    await this.locationsRepository.store({ origin, destiny, pricing });
  }
}

export { CreateLocationsUseCase };
