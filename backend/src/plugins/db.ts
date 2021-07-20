import fp from 'fastify-plugin';
import { createConnection, getConnectionOptions } from 'typeorm';
import UserRepository from '../repository/UserRepository';
import { User } from '../database/entity/User';

export interface DBInterface {
  userRepository: UserRepository;
}

export default fp(async (server) => {
  try {
    const connectionOptions = await getConnectionOptions();

    Object.assign(connectionOptions, {
      entities: [User],
    });

    console.log(`connecting to database: ${connectionOptions.type}...`);
    await createConnection(connectionOptions);
    console.log('database connected');

    const userRepository = new UserRepository();

    server.decorate('db', {
      userRepository,
    });
  } catch (error) {
    console.log(error);

    console.log('make sure you have set .env variables - see .env.sample');
  }
});
