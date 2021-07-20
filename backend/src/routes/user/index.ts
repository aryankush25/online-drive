import { FastifyReply, FastifyRequest } from 'fastify';
import userController from '../../controller/userController';
import { FastifyInstanceExtended } from '../../server';
import * as schemas from './schema';
import * as hooks from './hooks';

export const registerUserRoutes = (server: FastifyInstanceExtended) => {
  server.get(
    '/user/:email/:password',
    {
      schema: schemas.loginRoute,
    },
    (request: FastifyRequest, reply: FastifyReply) => {
      return userController.login(server.db, request, reply);
    },
  );

  server.post(
    '/user',
    {
      schema: schemas.registerRoute,
      preValidation: hooks.registerRoutePreValidation,
    },
    (request: FastifyRequest, reply: FastifyReply) => {
      return userController.register(server.db, request, reply);
    },
  );

  server.get(
    '/user/:userId',
    {
      schema: schemas.meRoute,
    },
    (request: FastifyRequest, reply: FastifyReply) => {
      return userController.me(server.db, request, reply);
    },
  );
};
