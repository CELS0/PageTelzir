import { IProfilesRepository } from '@domain/auth/repositories/types/IProfilesRepository';
import { IUsersRepository } from '@domain/auth/repositories/types/IUsersRepository';
import { IHashProvider } from '@shared/providers/hash/IHashProvider';
import { IJwtProvider } from '@shared/providers/jwt/IJwtProvider';
import { AuthSiginUseCase } from '../authSigin/AuthSiginUseCase';

function AuthSiginUseCaseFactory(
  usersRepository: IUsersRepository,
  hashProvider: IHashProvider,
  jwtProvider: IJwtProvider,
  profilesRepository: IProfilesRepository,
): AuthSiginUseCase {
  return new AuthSiginUseCase(
    usersRepository,
    hashProvider,
    jwtProvider,
    profilesRepository,
  );
}

export { AuthSiginUseCaseFactory };
