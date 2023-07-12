import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { User } from '@prisma/client';
import { pick } from 'lodash';
import { UserInputError, AuthenticationError } from 'apollo-server';

import { UserService } from '../user/user.service';

import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';

/**
 * Encoded in JWT token viewer data.
 */
export interface IViewerData {
  /**
   * User's id.
   */
  id: string;
  /**
   * User's login.
   */
  login: string;
}

const ACCESS_TOKEN_EXPIRES_IN = '30m';
const REFRESH_TOKEN_EXPIRES_IN = '30d';

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Creates user, sets refresh token and returns access token.
   */
  public async register(dto: RegisterInput): Promise<[string, string]> {
    if (await this.usersService.findByLogin(dto.login)) {
      throw new UserInputError('This login is already being used');
    }

    const user = await this.usersService.create({
      ...dto,
      password: await hash(dto.password, 5),
    });

    return this.generateTokens(user);
  }

  /**
   * Logs user in, sets refresh token and returns access token.
   */
  public async login(dto: LoginInput): Promise<[string, string]> {
    const candidate = await this.usersService.findByLogin(dto.login);

    if (!candidate || !(await compare(dto.password, candidate.password))) {
      throw new AuthenticationError('Incorrect login or password');
    }

    return this.generateTokens(candidate);
  }

  /**
   * Verifies token and returns data encoded in it.
   */
  public async verifyToken(token: string): Promise<IViewerData> {
    try {
      return pick(await this.jwtService.verifyAsync<IViewerData>(token), [
        'id',
        'login',
      ]);
    } catch {
      throw new AuthenticationError('Unauthorized');
    }
  }

  /**
   * Refreshes access token using refresh token.
   */
  public async refreshAccessToken(refreshToken: string): Promise<string> {
    return this.generateToken(
      await this.verifyToken(refreshToken),
      ACCESS_TOKEN_EXPIRES_IN,
    );
  }

  private async generateTokens(user: User): Promise<[string, string]> {
    return Promise.all([
      this.generateToken(user, ACCESS_TOKEN_EXPIRES_IN),
      this.generateToken(user, REFRESH_TOKEN_EXPIRES_IN),
    ]);
  }

  private async generateToken<Data extends IViewerData>(
    data: Data,
    expiresIn: string,
  ): Promise<string> {
    return this.jwtService.signAsync(
      pick<Data, keyof Data>(data, ['id', 'login']),
      { expiresIn },
    );
  }
}
