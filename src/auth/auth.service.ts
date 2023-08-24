import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCreadentialsDTO } from './dto/auth_credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt_payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signup(authCredentialsDTO: AuthCreadentialsDTO): Promise<User> {
    return this.userRepository.createUser(authCredentialsDTO);
  }

  async signin(authCredentialsDTO: AuthCreadentialsDTO) {
    const user = await this.userRepository.findOne({
      where: { username: authCredentialsDTO.username },
    });

    if (
      user &&
      (await bcrypt.compare(authCredentialsDTO.password, user.password))
    ) {
      const payload: JwtPayload = { username: user.username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    }

    throw new UnauthorizedException('Please check your credentials');
  }
}
