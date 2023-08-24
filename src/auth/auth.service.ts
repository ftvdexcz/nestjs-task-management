import { Injectable } from '@nestjs/common';
import { UserRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
}
