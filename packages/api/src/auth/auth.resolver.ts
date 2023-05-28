import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import type { GqlContext } from '../common/gql-context';

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
  public async register(
    @Args('input') input: RegisterInput,
    @Context() context: GqlContext,
  ): Promise<string> {
    const [accessToken, refreshToken] = await this.authService.register(input);

    context.setRefreshToken(refreshToken);

    return accessToken;
  }

  /**
   * Logs user in and returns access token.
   */
  @Mutation(() => String)
  public async login(
    @Args('input') input: LoginInput,
    @Context() context: GqlContext,
  ): Promise<string> {
    const [accessToken, refreshToken] = await this.authService.login(input);

    context.setRefreshToken(refreshToken);

    return accessToken;
  }
}
