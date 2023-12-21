import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import type { GqlContext } from '../common/context';

import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';

@Resolver()
export class AuthResolver {
  public constructor(private readonly authService: AuthService) {}

  /**
   * Creates user and returns access token.
   */
  @Mutation(() => String)
  public async register(@Args('input') input: RegisterInput, @Context() context: GqlContext): Promise<string> {
    const [accessToken, refreshToken] = await this.authService.register(input);

    context.setRefreshToken(refreshToken);

    return accessToken;
  }

  /**
   * Logs user in and returns access token.
   */
  @Mutation(() => String)
  public async login(@Args('input') input: LoginInput, @Context() context: GqlContext): Promise<string> {
    const [accessToken, refreshToken] = await this.authService.login(input);

    context.setRefreshToken(refreshToken);

    return accessToken;
  }

  /**
   * Refreshes access token using refresh token from cookie.
   */
  @Mutation(() => String)
  public async refreshAccessToken(@Context() context: GqlContext): Promise<string> {
    return this.authService.refreshAccessToken(context.getRefreshToken() || '');
  }

  /**
   * Logs user out and deletes refresh token.
   */
  @Mutation(() => Boolean)
  public logout(@Context() context: GqlContext): boolean {
    context.setRefreshToken('');

    return true;
  }
}
