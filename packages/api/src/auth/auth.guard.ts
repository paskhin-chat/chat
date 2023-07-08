import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { GqlContext } from '../common/context';

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

    const accessToken = gqlContext.getAccessToken() || '';
    const refreshToken = gqlContext.getRefreshToken() || '';

    await Promise.all([
      this.authService.verifyToken(accessToken),
      this.authService.verifyToken(refreshToken),
    ]);

    return true;
  }
}
