import { LocationsRepository } from '@domain/plan/infra/typeorm/repositories/LocationsRepository';
import { LocationsRepositoryFactory } from '@domain/plan/repositories/factories/LocationsRepositoryFactory';
import { CreateLocationsUseCaseFactory } from '../factories/CreateLocationsUseCaseFactory';

jest.mock('@domain/plan/infra/typeorm/repositories/LocationsRepository');

const useCase = () =>
  CreateLocationsUseCaseFactory(LocationsRepositoryFactory());

describe('CreateLocationsUseCaseFactory', () => {
  test('Should be able to create a location', async () => {
    jest
      .spyOn(LocationsRepository.prototype, 'findLocation')
      .mockImplementationOnce((): any => {
        return null;
      });

    const sut = useCase();
    await sut.execute({
      origin: 'origin',
      destiny: 'destiny',
      pricing: 2.0,
    });
  });

  test('Should not be able to create a location if location already exists', async () => {
    try {
      jest
        .spyOn(LocationsRepository.prototype, 'findLocation')
        .mockImplementationOnce((): any => {
          return { id: 1 };
        });

      const sut = useCase();
      await sut.execute({
        origin: 'origin',
        destiny: 'destiny',
        pricing: 2.0,
      });
    } catch (error) {
      expect(error.statusCode).toBe(400);
      expect(error.body).toBe('"Location already exists"');
    }
  });
});
