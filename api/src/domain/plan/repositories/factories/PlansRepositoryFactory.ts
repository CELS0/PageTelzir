import { IPlansRepository } from '../types/IPlansRepository';
import { PlansRepository } from '../../infra/typeorm/repositories/PlansRepository';

function PlansRepositoryFactory(): IPlansRepository {
  return new PlansRepository();
}

export { PlansRepositoryFactory };
