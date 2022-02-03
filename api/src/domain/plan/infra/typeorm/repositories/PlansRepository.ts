import {
  ICreatePlan,
  IPlansRepository,
} from '@domain/plan/repositories/types/IPlansRepository';
import { DBManager } from '@shared/db';
import { EntityRepository, Repository } from 'typeorm';
import { Plan } from '../entities/Plan';

@EntityRepository(Plan)
class PlansRepository extends Repository<Plan> implements IPlansRepository {
  async findById(planId: number): Promise<Plan> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(PlansRepository);

    const plain = repository.findOne(planId);

    return plain;
  }

  async list(): Promise<Plan[]> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(PlansRepository);

    const plans = repository.find();

    return plans;
  }

  async findPlan({ title, timeExtend }: ICreatePlan): Promise<Plan> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(PlansRepository);

    const plain = await repository.findOne({ title, timeExtend });

    return plain;
  }

  async store({
    title,
    description,
    timeExtend,
  }: {
    title: string;
    description?: string;
    timeExtend: number;
  }): Promise<void> {
    const connection = await DBManager.getConnection();
    const repository = connection.getCustomRepository(PlansRepository);

    const plain = repository.create({ title, description, timeExtend });

    await repository.save(plain);
  }
}
export { PlansRepository };
