import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCreadentialsDTO } from './dto/auth_credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDTO: AuthCreadentialsDTO): Promise<User> {
    const { password, username } = authCredentialsDTO;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log(hashedPassword, password);

    const user = this.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.save(user);
    } catch (err) {
      if (err.code === '23505')
        throw new ConflictException('Username already exists');
      throw new InternalServerErrorException();
    }

    return user;
  }
}
