import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { User } from '@prisma/client';
import { pick } from 'lodash';
import { AuthenticationError, UserInputError } from 'apollo-server';

import { UserService } from '../user/user.service';
import { ConfigService } from '../config/config.service';

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

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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
      throw new UserInputError('Incorrect login or password');
    }

    return this.generateTokens(candidate);
  }

  /**
   * Verifies token and returns data encoded in it.
   */
  public async verifyToken(token: string): Promise<IViewerData> {
    try {
      return pick(await this.jwtService.verifyAsync<IViewerData>(token), ['id', 'login']);
    } catch {
      throw new AuthenticationError('Unauthorized');
    }
  }

  /**
   * Refreshes access token using refresh token.
   */
  public async refreshAccessToken(refreshToken: string): Promise<string> {
    return this.generateToken(await this.verifyToken(refreshToken), this.configService.jwtTokensDuration.at);
  }

  private async generateTokens(user: User): Promise<[string, string]> {
    return Promise.all([
      this.generateToken(user, this.configService.jwtTokensDuration.at),
      this.generateToken(user, this.configService.jwtTokensDuration.rt),
    ]);
  }

  private async generateToken<Data extends IViewerData>(data: Data, expiresIn: string): Promise<string> {
    return this.jwtService.signAsync(pick<Data, keyof Data>(data, ['id', 'login']), { expiresIn });
  }
}
