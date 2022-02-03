import { ListPlansController } from '@domain/plan/useCases/listPlans/ListPlansController';
import { IListPlansRequest } from '@domain/plan/useCases/listPlans/ListPlansUseCase';
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './index';

const listPlansController = new ListPlansController();
const Products: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async event => {
  const { origin, destiny, time } = event.pathParameters;
  try {
    const entity = await listPlansController.handler({
      origin,
      destiny,
      time,
    } as unknown as IListPlansRequest);

    const { message, statusCode } = entity;

    const response = formatJSONResponse(message, statusCode);

    return response;
  } catch (e: any) {
    if (!e.statusCode) return formatJSONResponse(e.message, 500);
    return e;
  }
};

export const main = middyfy(Products);
