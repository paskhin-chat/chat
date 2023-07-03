import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { GqlContext } from '../common/context/gql-context';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly authService: AuthService) {}

  /**
   * If request authorized.
   */
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext =
      GqlExecutionContext.create(context).getContext<GqlContext>();

    const accessToken = gqlContext.getAccessToken();

    if (!accessToken || !(await this.authService.verifyToken(accessToken))) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
