import { User } from '@domain/auth/infra/typeorm/entities/User';

type ICreateUser = {
  username: string;
  hashPassword: string;
  profileId: number;
  isAdmin?: boolean;
};

interface IUsersRepository {
  store({
    username,
    hashPassword,
    profileId,
    isAdmin,
  }: ICreateUser): Promise<void>;
  findByUsername(username: string): Promise<User>;
}

export { IUsersRepository, ICreateUser };
