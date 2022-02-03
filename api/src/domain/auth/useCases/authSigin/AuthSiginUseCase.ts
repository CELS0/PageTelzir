import { IProfilesRepository } from '@domain/auth/repositories/types/IProfilesRepository';
import { IUsersRepository } from '@domain/auth/repositories/types/IUsersRepository';
import { formatJSONResponse } from '@libs/apiGateway';
import { EXPIRES_IN, SECRET_JWT } from '@shared/constants';
import { IHashProvider } from '@shared/providers/hash/IHashProvider';
import { IJwtProvider } from '@shared/providers/jwt/IJwtProvider';

export interface IProfileReponse {
  token: string;
  name: string;
  isAdmin: boolean;
}

class AuthSiginUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
    private jwtProvider: IJwtProvider,
    private profilesRepository: IProfilesRepository,
  ) {}

  async execute(username: string, password: string): Promise<IProfileReponse> {
    const userExists = await this.usersRepository.findByUsername(username);

    if (!userExists) {
      throw formatJSONResponse('User or password incorrect', 400);
    }

    const { hashPassword, profileId, isAdmin } = userExists;

    const { name, planId } = await this.profilesRepository.findById(profileId);

    const isValid = this.hashProvider.compare(password, hashPassword);

    if (!isValid) {
      throw formatJSONResponse('User or password incorrect', 400);
    }

    const tokenReponse = await this.jwtProvider.generateToken(
      { profileId, planId },
      SECRET_JWT,
      EXPIRES_IN,
    );

    const { token } = tokenReponse;

    return { token, name, isAdmin };
  }
}

export { AuthSiginUseCase };
