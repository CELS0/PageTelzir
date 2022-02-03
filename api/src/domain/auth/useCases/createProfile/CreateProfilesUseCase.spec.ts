import { ProfilesRepository } from '@domain/auth/infra/typeorm/repositories/ProfilesRepository';
import { ProfilesRepositoryFactory } from '@domain/auth/repositories/factories/ProfilesRepositoryFactory';
import { CreateProfilesUseCaseFactory } from '../factories/CreateProfilesUseCaseFactory';

jest.mock('@domain/auth/infra/typeorm/repositories/ProfilesRepository');

const useCase = () => CreateProfilesUseCaseFactory(ProfilesRepositoryFactory());

describe('CreateProfilesUseCaseFactory', () => {
  test('Should be able to create a profile', async () => {
    jest
      .spyOn(ProfilesRepository.prototype, 'findByName')
      .mockImplementationOnce((): any => {
        return null;
      });

    const sut = useCase();
    await sut.execute({ name: 'name', fone: '9999999999', planId: 1 });
  });

  test('Should not be able to create a profile if profile already exists', async () => {
    try {
      jest
        .spyOn(ProfilesRepository.prototype, 'findByName')
        .mockImplementationOnce((): any => {
          return { name: 'nameTest', plainId: 1 };
        });

      const sut = useCase();
      await sut.execute({ name: 'name', fone: '9999999999', planId: 1 });
    } catch (error) {
      expect(error.statusCode).toBe(400);
      expect(error.body).toBe('"User already exists"');
    }
  });
});
