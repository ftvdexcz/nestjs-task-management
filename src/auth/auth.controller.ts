import { Body, Controller, Post } from '@nestjs/common';
import { AuthCreadentialsDTO } from './dto/auth_credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() authCredentialsDTO: AuthCreadentialsDTO): Promise<User> {
    return this.authService.signup(authCredentialsDTO);
  }

  @Post('/signin')
  signin(@Body() authCredentialsDTO: AuthCreadentialsDTO) {
    return this.authService.signin(authCredentialsDTO);
  }
}
