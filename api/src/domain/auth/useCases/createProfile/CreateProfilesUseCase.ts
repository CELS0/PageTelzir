import { Profile } from '@domain/auth/infra/typeorm/entities/Profile';
import {
  ICreateProfile,
  IProfilesRepository,
} from '@domain/auth/repositories/types/IProfilesRepository';
import { formatJSONResponse } from '@libs/apiGateway';

class CreateProfilesUseCase {
  constructor(private profilesRepository: IProfilesRepository) {}

  async execute({ name, fone, planId }: ICreateProfile): Promise<Profile> {
    const userExists = await this.profilesRepository.findByName(name);

    if (userExists) {
      throw formatJSONResponse('User already exists', 400);
    }
    const profile = await this.profilesRepository.store({
      name,
      fone,
      planId,
    });

    return profile;
  }
}

export { CreateProfilesUseCase };
