import { IProfilesRepository } from '../types/IProfilesRepository';
import { ProfilesRepository } from '../../infra/typeorm/repositories/ProfilesRepository';

function ProfilesRepositoryFactory(): IProfilesRepository {
  return new ProfilesRepository();
}

export { ProfilesRepositoryFactory };
