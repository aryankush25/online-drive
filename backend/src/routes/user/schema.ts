import { FastifySchema } from 'fastify';

const userResponseSchema = {
  200: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      email: { type: 'string' },
      createdAt: { type: 'string' },
      updatedAt: { type: 'string' },
      deletedAt: { type: 'string' },
    },
  },
};

export const loginRoute: FastifySchema = {
  params: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
  },
  response: userResponseSchema,
};

export const registerRoute: FastifySchema = {
  body: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
      name: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
    },
  },
  response: userResponseSchema,
};

export const meRoute: FastifySchema = {
  params: {
    type: 'object',
    required: ['userId'],
    properties: {
      userId: { type: 'string' },
    },
  },
  response: userResponseSchema,
};
