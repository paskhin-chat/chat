import { Injectable } from '@nestjs/common';
import * as process from 'node:process';
import * as constants from 'constant';

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
  public get jwtSecretToken(): string {
    return this.getEnv('JWT_SECRET_TOKEN');
  }

  /**
   * Cookies secret token.
   */
  public get cookiesSecretToken(): string {
    return this.getEnv('COOKIES_SECRET_TOKEN');
  }

  /**
   * Client URL.
   */
  public get allowedCorsClientUrls(): string[] {
    return [
      constants.urls.dev.client,
      `${constants.Protocol.HTTP}://${constants.domains.dev.api}:${constants.ports.dev.api}`,
    ];
  }

  private getEnv<Name extends keyof IEnv>(name: Name): IEnv[Name] {
    return process.env[name];
  }
}
