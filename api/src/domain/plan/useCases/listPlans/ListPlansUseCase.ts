import { ILocationsRepository } from '@domain/plan/repositories/types/ILocationsRepository';
import { IPlansRepository } from '@domain/plan/repositories/types/IPlansRepository';
import { formatJSONResponse } from '@libs/apiGateway';

export type IListPlansRequest = {
  origin: string;
  destiny: string;
  time: number;
};

export type IListPlansReponse = {
  id: number;
  title: string;
  plan: number;
  notPlan: number;
};

class ListPlansUseCase {
  constructor(
    private plansRepository: IPlansRepository,
    private locationsRepository: ILocationsRepository,
  ) {}

  private timeValid(timeExtend: number, time: number): number {
    if (time < timeExtend) {
      return 0;
    }

    return time - timeExtend;
  }

  async execute({
    origin,
    destiny,
    time,
  }: IListPlansRequest): Promise<IListPlansReponse[]> {
    const plans = await this.plansRepository.list();

    const locationExists = await this.locationsRepository.findLocation(
      origin,
      destiny,
    );

    if (!locationExists) {
      throw formatJSONResponse('Location not already exists', 400);
    }

    const { pricing } = locationExists;

    const response: IListPlansReponse[] = [];

    plans.forEach(plan => {
      const { timeExtend, title } = plan;

      const result: IListPlansReponse = {
        id: plan.id,
        title,
        plan: Number(
          (this.timeValid(timeExtend, time) * pricing * 1.1).toFixed(2),
        ),
        notPlan: Number((time * pricing).toFixed(2)),
      };

      response.push(result);
    });

    return response;
  }
}
export { ListPlansUseCase };
