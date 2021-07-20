import { FastifyReply, FastifyRequest } from 'fastify';

export const registerRoutePreValidation = async (request: FastifyRequest, reply: FastifyReply) => {
  console.log('Register Pre Handler called before', request.body['name']);

  // await wait(5000);

  console.log('Register Pre Handler called after', request.body['name']);

  // request.body['name'] = 'Aryan';

  // reply.send();
  // req.body = { ...req.body, importantKey }

  // return reply;
};
