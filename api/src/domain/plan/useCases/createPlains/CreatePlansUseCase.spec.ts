import { PlansRepository } from '@domain/plan/infra/typeorm/repositories/PlansRepository';
import { PlansRepositoryFactory } from '@domain/plan/repositories/factories/PlansRepositoryFactory';
import { CreatePlansUseCaseFactory } from '../factories/CreatePlansUseCaseFactory';

jest.mock('@domain/plan/infra/typeorm/repositories/PlansRepository');

const useCase = () => CreatePlansUseCaseFactory(PlansRepositoryFactory());

describe('CreatePlansUseCaseFactory', () => {
  test('Should be able to create a plan', async () => {
    jest
      .spyOn(PlansRepository.prototype, 'findPlan')
      .mockImplementationOnce((): any => {
        return null;
      });

    const sut = useCase();
    await sut.execute({
      title: 'title',
      description: 'description',
      timeExtend: 20,
    });
  });

  test('Should not be able to create a plan if plan already exists', async () => {
    try {
      jest
        .spyOn(PlansRepository.prototype, 'findPlan')
        .mockImplementationOnce((): any => {
          return { id: 1 };
        });

      const sut = useCase();
      await sut.execute({
        title: 'title',
        description: 'description',
        timeExtend: 20,
      });
    } catch (error) {
      expect(error.statusCode).toBe(400);
      expect(error.body).toBe('"Plain already exists"');
    }
  });
});
