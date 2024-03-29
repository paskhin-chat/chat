import { Injectable } from '@nestjs/common';
import * as process from 'node:process';

import { IEnv } from '../common/env';

@Injectable()
export class ConfigService {
  /**
   * Is it production environment.
   */
  public get prod(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  /**
   * Is it development environment.
   */
  public get dev(): boolean {
    return process.env.NODE_ENV === 'development';
  }

  /**
   * Is it testing environment.
   */
  public get test(): boolean {
    return process.env.NODE_ENV === 'test';
  }

  /**
   * Redis host.
   */
  public get redisHost(): string {
    return this.getEnv('REDIS_HOST');
  }

  /**
   * Redis port.
   */
  public get redisPort(): number {
    return this.getEnv('REDIS_PORT');
  }

  /**
   * Redis URL.
   */
  public get redisUrl(): string {
    return this.getEnv('REDIS_URL');
  }

  /**
   * JWT secret token.
   */
  public get jwtSecret(): string {
    return this.getEnv('JWT_SECRET');
  }

  /**
   * Cookies secret token.
   */
  public get cookiesSecretToken(): string {
    return this.getEnv('COOKIES_SECRET_TOKEN');
  }

  /**
   * Gets expires in property of JWT tokens.
   */
  public get jwtTokensDuration(): {
    /**
     * Access token.
     */
    at: string;
    /**
     * Refresh token.
     */
    rt: string;
  } {
    return {
      at: this.prod ? '1m' : '1d',
      rt: '30d',
    };
  }

  private getEnv<Name extends keyof IEnv>(name: Name): IEnv[Name] {
    return process.env[name];
  }
}
