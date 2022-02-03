import { AuthSiginController } from '@domain/auth/useCases/authSigin/AuthSiginController';
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const authSiginController = new AuthSiginController();
const Products: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async event => {
  try {
    const { username, password } = event.body;
    const entity = await authSiginController.handler(username, password);

    const { message, statusCode } = entity;

    const response = formatJSONResponse(message, statusCode);

    return response;
  } catch (e: any) {
    if (!e.statusCode) return formatJSONResponse(e.message, 500);
    return e;
  }
};

export const main = middyfy(Products);
