import { IProfilesRepository } from '@domain/auth/repositories/types/IProfilesRepository';
import { CreateProfilesUseCase } from '../createProfile/CreateProfilesUseCase';

function CreateProfilesUseCaseFactory(
  profilesRepository: IProfilesRepository,
): CreateProfilesUseCase {
  return new CreateProfilesUseCase(profilesRepository);
}

export { CreateProfilesUseCaseFactory };
