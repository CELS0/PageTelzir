import { PlansRepository } from '@domain/plan/infra/typeorm/repositories/PlansRepository';
import { PlansRepositoryFactory } from '@domain/plan/repositories/factories/PlansRepositoryFactory';
import { ListPlansAllUseCaseFactory } from '../factories/ListPlansAllUseCaseFactory';

jest.mock('@domain/plan/infra/typeorm/repositories/PlansRepository');
jest.mock('@domain/plan/infra/typeorm/repositories/LocationsRepository');

const useCase = () => ListPlansAllUseCaseFactory(PlansRepositoryFactory());

describe('ListPlansAllUseCaseFactory', () => {
  test('Should be able to list a plans all', async () => {
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

    const sut = useCase();
    const result = await sut.execute();

    expect(result.length > 0).toBe(true);
  });
});
