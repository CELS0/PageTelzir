import { CreateLocationsController } from '@domain/plan/useCases/createlocation/CreateLocationsController';
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const createLocationsController = new CreateLocationsController();
const Products: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async event => {
  try {
    const { origin, destiny, pricing } = event.body;
    const { Authorization } = event.headers;
    const entity = await createLocationsController.handler(
      {
        origin,
        destiny,
        pricing,
      },
      Authorization,
    );

    const { message, statusCode } = entity;

    const response = formatJSONResponse(message, statusCode);

    return response;
  } catch (e: any) {
    if (!e.statusCode) return formatJSONResponse(e.message, 500);
    return e;
  }
};

export const main = middyfy(Products);
