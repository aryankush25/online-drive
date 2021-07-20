import { FastifyReply, FastifyRequest } from 'fastify';
import { DBInterface } from '../plugins/db';
import { ArgumentsDoesNotExistError, UserDoesNotExistError } from '../errors';
import { isNilOrEmpty } from '../utils/helpers';

const userController = {
  login: async (db: DBInterface, request: FastifyRequest, reply: FastifyReply) => {
    const userRepository = db.userRepository;

    const email = request.params['email'];
    const password = request.params['password'];

    const user = await userRepository.verifyUser(email, password);

    return user;
  },

  register: async (db: DBInterface, request: FastifyRequest, reply: FastifyReply) => {
    const userRepository = db.userRepository;

    const name = request.body['name'];
    const email = request.body['email'];
    const password = request.body['password'];

    const user = await userRepository.createUser(name, email, password);

    return user;
  },

  me: async (db: DBInterface, request: FastifyRequest, reply: FastifyReply) => {
    const userRepository = db.userRepository;

    const userId = request.params['userId'];

    if (isNilOrEmpty(userId)) {
      throw ArgumentsDoesNotExistError();
    }

    const user = await userRepository.getUser({ where: { id: userId } });

    if (isNilOrEmpty(user)) {
      throw UserDoesNotExistError();
    }

    return user;
  },
};

export default userController;
