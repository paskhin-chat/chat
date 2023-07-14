import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { UseGuards } from '@nestjs/common';

import type { GqlContext } from '../common/context';
import { UserDto } from '../user/dto/user.dto';
import { ViewerDataDecorator } from '../common/decorators';
import { UserService } from '../user/user.service';

import { AuthService } from './auth.service';
import type { IViewerData } from './auth.service';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { AuthGuard } from './auth.guard';

@Resolver()
export class AuthResolver {
  public constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  /**
   * Gets authenticated user.
   */
  @UseGuards(AuthGuard)
  @Query(() => UserDto, { nullable: true })
  public async viewer(
    @ViewerDataDecorator() viewerData: IViewerData,
  ): Promise<User | null> {
    return this.usersService.findById(viewerData.id);
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
   * Refreshes access token using refresh token from cookie.
   */
  @Mutation(() => String)
  public async refreshAccessToken(
    @Context() context: GqlContext,
  ): Promise<string> {
    return this.authService.refreshAccessToken(context.getRefreshToken() || '');
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

  /**
   * Logs user out and deletes refresh token.
   */
  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  public logout(@Context() context: GqlContext): boolean {
    context.setRefreshToken('');

    return true;
  }
}
