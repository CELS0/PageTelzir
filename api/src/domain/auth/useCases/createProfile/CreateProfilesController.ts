import { Profile } from '@domain/auth/infra/typeorm/entities/Profile';
import { ProfilesRepositoryFactory } from '@domain/auth/repositories/factories/ProfilesRepositoryFactory';
import { ICreateProfile } from '@domain/auth/repositories/types/IProfilesRepository';
import { formatJSONResponse } from '@libs/apiGateway';
import { CreateProfilesUseCaseFactory } from '../factories/CreateProfilesUseCaseFactory';

type IResponse = {
  message: Profile;
  statusCode: number;
};

class CreateProfilesController {
  async handler({ name, fone, planId }: ICreateProfile): Promise<IResponse> {
    const createPlansUseCase = CreateProfilesUseCaseFactory(
      ProfilesRepositoryFactory(),
    );
    try {
      const profile = await createPlansUseCase.execute({
        name,
        fone,
        planId,
      });

      const response = {
        message: profile,
        statusCode: 201,
      };

      return response;
    } catch (error) {
      throw formatJSONResponse(error.body, error.statusCode);
    }
  }
}

export { CreateProfilesController };
