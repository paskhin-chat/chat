import { Injectable } from '@nestjs/common';
import { testConfig, prodConfig, devConfig, IConfig } from 'config';

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
    return this.get('REDIS_HOST');
  }

  /**
   * Redis port.
   */
  public get redisPort(): number {
    return this.get('REDIS_PORT');
  }

  /**
   * Redis URL.
   */
  public get redisUrl(): string {
    return this.get('REDIS_URL');
  }

  /**
   * Retrieve a production configuration based on its name.
   */
  public getProd<Name extends keyof IConfig>(name: Name): IConfig[Name] {
    return prodConfig[name];
  }

  /**
   * Retrieve a development configuration based on its name.
   */
  public getDev<Name extends keyof IConfig>(name: Name): IConfig[Name] {
    return devConfig[name];
  }

  /**
   * Retrieve a testing configuration based on its name.
   */
  public getTest<Name extends keyof IConfig>(name: Name): IConfig[Name] {
    return testConfig[name];
  }

  /**
   * Retrieve a configuration based on its name and the current environment.
   */
  public get<Name extends keyof IConfig>(name: Name): IConfig[Name] {
    if (this.prod) {
      return this.getProd(name);
    }

    if (this.test) {
      return this.getTest(name);
    }

    return this.getDev(name);
  }
}
