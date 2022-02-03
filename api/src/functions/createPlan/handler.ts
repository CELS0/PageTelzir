import { CreatePlansController } from '@domain/plan/useCases/createPlains/CreatePlansController';
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const createPlansController = new CreatePlansController();
const Products: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async event => {
  try {
    const { title, description, timeExtend } = event.body;
    const entity = await createPlansController.handler({
      title,
      description,
      timeExtend,
    });

    const { message, statusCode } = entity;

    const response = formatJSONResponse(message, statusCode);

    return response;
  } catch (e: any) {
    if (!e.statusCode) return formatJSONResponse(e.message, 500);
    return e;
  }
};

export const main = middyfy(Products);
