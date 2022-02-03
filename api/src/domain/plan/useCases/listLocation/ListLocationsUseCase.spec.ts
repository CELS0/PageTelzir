import { LocationsRepository } from '@domain/plan/infra/typeorm/repositories/LocationsRepository';
import { LocationsRepositoryFactory } from '@domain/plan/repositories/factories/LocationsRepositoryFactory';
import { ListLocationUseCaseFactory } from '../factories/ListLocationUseCaseFactory';

jest.mock('@domain/plan/infra/typeorm/repositories/LocationsRepository');

const useCase = () => ListLocationUseCaseFactory(LocationsRepositoryFactory());

describe('ListLocationUseCaseFactory', () => {
  test('Should be able to list a locations', async () => {
    jest
      .spyOn(LocationsRepository.prototype, 'list')
      .mockImplementationOnce((): any => {
        return [
          {
            id: 1,
            origin: '018',
            destiny: '085',
            pricing: 5.4,
            createdAt: '2022-02-03T03:26:34.667Z',
            updatedAt: '2022-02-03T03:26:34.667Z',
          },
          {
            id: 2,
            origin: '018',
            destiny: '084',
            pricing: 5.4,
            createdAt: '2022-02-03T03:26:40.789Z',
            updatedAt: '2022-02-03T03:26:40.789Z',
          },
        ];
      });

    const sut = useCase();
    const result = await sut.execute();

    expect(result.length > 0).toBe(true);
  });
});
