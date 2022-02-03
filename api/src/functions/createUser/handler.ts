import { CreateUsersController } from '@domain/auth/useCases/createUser/CreateUsersController';
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const createUsersController = new CreateUsersController();
const Products: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async event => {
  try {
    const { username, hashPassword, profileId, isAdmin } = event.body;
    const entity = await createUsersController.handler({
      username,
      hashPassword,
      profileId,
      isAdmin,
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
