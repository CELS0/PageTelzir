import { UsersRepository } from '@domain/auth/infra/typeorm/repositories/UsersRepository';
import { UsersRepositoryFactory } from '@domain/auth/repositories/factories/UsersRepositoryFactory';
import { BCryptProviderFactory } from '@shared/providers/hash/factories/BCryptProviderFactory';
import { BCryptProvider } from '@shared/providers/hash/implementations/BCryptProvider';
import { CreateUsersUseCaseFactory } from '../factories/CreateUsersUseCaseFactory';

jest.mock('@domain/auth/infra/typeorm/repositories/UsersRepository');
jest.mock('@shared/providers/hash/implementations/BCryptProvider');

const useCase = () =>
  CreateUsersUseCaseFactory(UsersRepositoryFactory(), BCryptProviderFactory());

describe('CreateUsersUseCaseFactory', () => {
  test('Should be able to create a user', async () => {
    jest
      .spyOn(UsersRepository.prototype, 'findByUsername')
      .mockImplementationOnce((): any => {
        return null;
      });

    jest
      .spyOn(BCryptProvider.prototype, 'hash')
      .mockImplementationOnce((): any => {
        return 'hashPassword';
      });

    const sut = useCase();
    await sut.execute({
      username: 'name',
      hashPassword: 'hashPassword',
      profileId: 1,
      isAdmin: true,
    });
  });

  test('Should not be able to create a user if user already exists', async () => {
    try {
      jest
        .spyOn(UsersRepository.prototype, 'findByUsername')
        .mockImplementationOnce((): any => {
          return { id: 1 };
        });

      const sut = useCase();
      await sut.execute({
        username: 'name',
        hashPassword: 'hashPassword',
        profileId: 1,
        isAdmin: true,
      });
    } catch (error) {
      expect(error.statusCode).toBe(400);
      expect(error.body).toBe('"User already exists"');
    }
  });
});
