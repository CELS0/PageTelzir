import { Plan } from '@domain/plan/infra/typeorm/entities/Plan';

type ICreatePlan = {
  title: string;
  description?: string;
  timeExtend: number;
};

interface IPlansRepository {
  store({ title, description, timeExtend }: ICreatePlan): Promise<void>;
  findPlan({ title, timeExtend }: ICreatePlan): Promise<Plan>;
  findById(planId: number): Promise<Plan>;
  list(): Promise<Plan[]>;
}

export { IPlansRepository, ICreatePlan };
