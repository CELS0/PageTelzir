import { Profile } from '@domain/auth/infra/typeorm/entities/Profile';

type ICreateProfile = {
  name: string;
  fone: string;
  planId?: number;
};
interface IProfilesRepository {
  store({ name, fone, planId }: ICreateProfile): Promise<Profile>;
  findById(profileId: number): Promise<Profile>;
  findByName(name: string): Promise<Profile>;
}

export { IProfilesRepository, ICreateProfile };
