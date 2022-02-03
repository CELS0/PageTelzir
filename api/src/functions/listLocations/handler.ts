import { ListLocationsController } from '@domain/plan/useCases/listLocation/ListLocationsController';
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './index';

const listLocationsController = new ListLocationsController();
const Products: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async () => {
  try {
    const entity = await listLocationsController.handler();

    const { message, statusCode } = entity;

    const response = formatJSONResponse(message, statusCode);

    return response;
  } catch (e: any) {
    if (!e.statusCode) return formatJSONResponse(e.message, 500);
    return e;
  }
};

export const main = middyfy(Products);
