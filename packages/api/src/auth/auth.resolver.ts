import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';

import type { GqlContext } from '../common/context/gql-context';
import { UserDto } from '../user/dto/user.dto';
import { AuthorizedUserDataDecorator } from '../common/decorators';
import { UserService } from '../user/user.service';

import { AuthService } from './auth.service';
import type { IAuthorizedUserData } from './auth.service';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';

@Resolver()
export class AuthResolver {
  public constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  /**
   * Gets authenticated user.
   */
  @Query(() => UserDto, { nullable: true, name: 'viewer' })
  public async viewer(
    @AuthorizedUserDataDecorator()
    authorizedUserData: IAuthorizedUserData | undefined,
  ): Promise<User | null> {
    return authorizedUserData
      ? this.usersService.findById(authorizedUserData.id)
      : null;
  }

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
