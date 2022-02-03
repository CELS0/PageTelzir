import {
  ICreateProfile,
  IProfilesRepository,
} from '@domain/auth/repositories/types/IProfilesRepository';
import { DBManager } from '@shared/db';
import { EntityRepository, Repository } from 'typeorm';
import { Profile } from '../entities/Profile';

@EntityRepository(Profile)
class ProfilesRepository
  extends Repository<Profile>
  implements IProfilesRepository
{
  async findByName(name: string): Promise<Profile> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(ProfilesRepository);

    const profile = await repository.findOne({ name });

    return profile;
  }

  async store({ name, fone, planId }: ICreateProfile): Promise<Profile> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(ProfilesRepository);

    const profile = repository.create({ name, fone, planId });

    await repository.save(profile);

    return profile;
  }

  async findById(profileId: number): Promise<Profile> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(ProfilesRepository);

    const profile = await repository.findOne(profileId);

    return profile;
  }
}
export { ProfilesRepository };
