import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { User } from '@prisma/client';

import { UserService } from '../user/user.service';

import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';

/**
 * Encoded in JWT token user data.
 */
export interface IAuthorizedUserData {
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
  ) {}

  /**
   * Creates user, sets refresh token and returns access token.
   */
  public async register(dto: RegisterInput): Promise<[string, string]> {
    if (await this.usersService.findByLogin(dto.login)) {
      throw new HttpException(
        'This login is already being used.',
        HttpStatus.BAD_REQUEST,
        { description: 'This login is already being used.' },
      );
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
      throw new HttpException(
        'Incorrect login or password.',
        HttpStatus.UNAUTHORIZED,
        {
          description:
            'Your email or password is incorrect. Please double check and try again.',
        },
      );
    }

    return this.generateTokens(candidate);
  }

  /**
   * Verifies token and returns data encoded in it.
   */
  public async verifyToken(
    token: string,
  ): Promise<IAuthorizedUserData | undefined> {
    try {
      return await this.jwtService.verifyAsync<IAuthorizedUserData>(token);
    } catch {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  private async generateTokens(user: User): Promise<[string, string]> {
    const data: IAuthorizedUserData = {
      id: user.id,
      login: user.login,
    };

    return Promise.all([
      this.jwtService.signAsync(data, {
        expiresIn: '30m',
      }),
      this.jwtService.signAsync(data, {
        expiresIn: '30d',
      }),
    ]);
  }
}
