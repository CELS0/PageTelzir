import { ProfilesRepository } from '@domain/auth/infra/typeorm/repositories/ProfilesRepository';
import { UsersRepository } from '@domain/auth/infra/typeorm/repositories/UsersRepository';
import { ProfilesRepositoryFactory } from '@domain/auth/repositories/factories/ProfilesRepositoryFactory';
import { UsersRepositoryFactory } from '@domain/auth/repositories/factories/UsersRepositoryFactory';
import { BCryptProviderFactory } from '@shared/providers/hash/factories/BCryptProviderFactory';
import { BCryptProvider } from '@shared/providers/hash/implementations/BCryptProvider';
import { JsonWebTokenProviderFactory } from '@shared/providers/jwt/factories/JsonWebTokenProviderFactory';
import { JsonWebTokenProvider } from '@shared/providers/jwt/implementations/JsonWebTokenProvider';
import { AuthSiginUseCaseFactory } from '../factories/AuthSiginUseCaseFactory';

jest.mock('@domain/auth/infra/typeorm/repositories/UsersRepository');
jest.mock('@domain/auth/infra/typeorm/repositories/ProfilesRepository');
jest.mock('@shared/providers/hash/implementations/BCryptProvider');
jest.mock('@shared/providers/jwt/implementations/JsonWebTokenProvider');

const useCase = () =>
  AuthSiginUseCaseFactory(
    UsersRepositoryFactory(),
    BCryptProviderFactory(),
    JsonWebTokenProviderFactory(),
    ProfilesRepositoryFactory(),
  );

describe('AuthSiginUseCaseFactory', () => {
  test('Should be able to generate a token to an authenticated user', async () => {
    jest
      .spyOn(UsersRepository.prototype, 'findByUsername')
      .mockImplementationOnce((): any => {
        return { hashPassword: 'hashPassword', profileId: 1, isAdmin: true };
      });

    jest
      .spyOn(ProfilesRepository.prototype, 'findById')
      .mockImplementationOnce((): any => {
        return { name: 'nameTest', plainId: 1 };
      });

    jest
      .spyOn(BCryptProvider.prototype, 'compare')
      .mockImplementationOnce((): any => {
        return true;
      });

    jest
      .spyOn(JsonWebTokenProvider.prototype, 'generateToken')
      .mockImplementationOnce((): any => {
        return {
          token:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzM4ODgyODgsImV4cCI6MTYzMzg5MTg4OCwic3ViIjoiMSJ9.h4cHWM3WmpMCT8txJ0vXbn2l72ZWUdDoJqkECRTn3NM',
        };
      });

    const sut = useCase();
    const result = await sut.execute('usernameTest', 'password');

    expect(result).toHaveProperty('token');
  });

  test('Should not be able to generate a token if user not already exists', async () => {
    jest
      .spyOn(UsersRepository.prototype, 'findByUsername')
      .mockImplementationOnce((): any => {
        return null;
      });

    try {
      const sut = useCase();
      await sut.execute('usernameTest', 'password');
    } catch (error) {
      expect(error.statusCode).toBe(400);
      expect(error.body).toBe('"User or password incorrect"');
    }
  });

  test('Should not be able to generate a token if password incorrect', async () => {
    jest
      .spyOn(UsersRepository.prototype, 'findByUsername')
      .mockImplementationOnce((): any => {
        return { hashPassword: 'hashPassword', profileId: 1, isAdmin: true };
      });

    jest
      .spyOn(ProfilesRepository.prototype, 'findById')
      .mockImplementationOnce((): any => {
        return { name: 'nameTest', plainId: 1 };
      });

    jest
      .spyOn(BCryptProvider.prototype, 'compare')
      .mockImplementationOnce((): any => {
        return false;
      });

    try {
      const sut = useCase();
      await sut.execute('usernameTest', 'password');
    } catch (error) {
      expect(error.statusCode).toBe(400);
      expect(error.body).toBe('"User or password incorrect"');
    }
  });
});
