import { User } from '@prisma/client';
import { TokenDto } from './token.dto';

export class LoginPayloadDto {
  user: Partial<User>;
  token: TokenDto;

  constructor(user: Partial<User>, token: TokenDto) {
    this.user = user;
    this.token = token;
  }
}
