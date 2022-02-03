import { ICallsRepository } from '@domain/plan/repositories/types/ICallsRepository';
import { ILocationsRepository } from '@domain/plan/repositories/types/ILocationsRepository';
import { IProfilesRepository } from '@domain/auth/repositories/types/IProfilesRepository';
import { CreateCallsUseCase } from '../createCall/CreateCallsUseCase';

function CreateCallsUseCaseFactory(
  locationsRepository: ILocationsRepository,
  profilesRepository: IProfilesRepository,
  callsRepository: ICallsRepository,
): CreateCallsUseCase {
  return new CreateCallsUseCase(
    locationsRepository,
    profilesRepository,
    callsRepository,
  );
}

export { CreateCallsUseCaseFactory };
