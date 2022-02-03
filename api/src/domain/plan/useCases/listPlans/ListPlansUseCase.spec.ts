import { LocationsRepository } from '@domain/plan/infra/typeorm/repositories/LocationsRepository';
import { PlansRepository } from '@domain/plan/infra/typeorm/repositories/PlansRepository';
import { LocationsRepositoryFactory } from '@domain/plan/repositories/factories/LocationsRepositoryFactory';
import { PlansRepositoryFactory } from '@domain/plan/repositories/factories/PlansRepositoryFactory';
import { ListPlansUseCaseFactory } from '../factories/ListPlansUseCaseFactory';

jest.mock('@domain/plan/infra/typeorm/repositories/PlansRepository');
jest.mock('@domain/plan/infra/typeorm/repositories/LocationsRepository');

const useCase = () =>
  ListPlansUseCaseFactory(
    PlansRepositoryFactory(),
    LocationsRepositoryFactory(),
  );

describe('ListPlansUseCaseFactory', () => {
  test('Should be able to list a plans', async () => {
    jest
      .spyOn(PlansRepository.prototype, 'list')
      .mockImplementationOnce((): any => {
        return [
          {
            timeExtend: 10,
            title: 'FaleMais1',
          },
          {
            timeExtend: 2,
            title: 'FaleMais1',
          },
        ];
      });

    jest
      .spyOn(LocationsRepository.prototype, 'findLocation')
      .mockImplementationOnce((): any => {
        return { id: 1 };
      });

    const sut = useCase();
    const result = await sut.execute({
      origin: '018',
      destiny: '084',
      time: 5,
    });

    expect(result[0]).toHaveProperty('id');
  });
  test('Should not be able to list a plans if location not already exists', async () => {
    jest
      .spyOn(PlansRepository.prototype, 'list')
      .mockImplementationOnce((): any => {
        return [
          {
            timeExtend: 1,
            title: 'FaleMais1',
          },
          {
            timeExtend: 2,
            title: 'FaleMais1',
          },
        ];
      });

    jest
      .spyOn(LocationsRepository.prototype, 'findLocation')
      .mockImplementationOnce((): any => {
        return null;
      });

    try {
      const sut = useCase();
      await sut.execute({ origin: '018', destiny: '084', time: 2 });
    } catch (error) {
      expect(error.statusCode).toBe(400);
      expect(error.body).toBe('"Location not already exists"');
    }
  });
});
