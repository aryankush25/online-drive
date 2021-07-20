import { getRepository } from 'typeorm';
import { v4 } from 'uuid';
import { hash, compare } from 'bcryptjs';
import * as R from 'ramda';

import { User } from '../database/entity/User';
import { UnauthorizedError, UserDoesNotExistError } from '../errors';

class UserRepository {
  private userRepository = getRepository(User);

  async verifyUser(email: string, password: string) {
    const user: User = await this.userRepository.findOne({
      email,
    });

    if (user) {
      const isMatch = await compare(password, user.hashedPassword);

      if (!isMatch) {
        throw UnauthorizedError();
      }

      return R.omit(['hashedPassword'], user);
    } else {
      throw UserDoesNotExistError();
    }
  }

  async createUser(name: string, email: string, password: string) {
    const hashedPassword = await hash(password, 10);

    const user: User = await this.userRepository.save({
      id: v4(),
      name: name,
      email: email,
      hashedPassword: hashedPassword,
      createdAt: new Date().toISOString(),
    });

    return R.omit(['hashedPassword'], user);
  }

  async getUser(props: Object = {}, options: Object = {}) {
    const user = await this.userRepository.findOne(props, options);

    return R.omit(['hashedPassword'], user);
  }
}

export default UserRepository;
