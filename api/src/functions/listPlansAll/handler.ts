import { ListPlansAllController } from '@domain/plan/useCases/listPlansAll/ListPlansAllController';
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './index';

const listPlansAllController = new ListPlansAllController();
const Products: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async () => {
  try {
    const entity = await listPlansAllController.handler();

    const { message, statusCode } = entity;

    const response = formatJSONResponse(message, statusCode);

    return response;
  } catch (e: any) {
    if (!e.statusCode) return formatJSONResponse(e.message, 500);
    return e;
  }
};

export const main = middyfy(Products);
