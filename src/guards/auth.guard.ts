import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const validate = await super.canActivate(context);

      if (!validate) throw new UnauthorizedException();

      return true;
    } catch (error) {
      return false;
    }
  }
}
