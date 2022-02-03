import { CreateProfilesController } from '@domain/auth/useCases/createProfile/CreateProfilesController';
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const createProfilesController = new CreateProfilesController();
const Products: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async event => {
  try {
    const { name, fone, planId } = event.body;
    const entity = await createProfilesController.handler({
      name,
      fone,
      planId,
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
