import { Injectable } from '@nestjs/common';
import { config, IConfig } from 'config';

@Injectable()
export class ConfigService {
  private readonly NODE_ENV =
    process.env.NODE_ENV === 'production' ? 'production' : 'development';

  /**
   * Is it production environment.
   */
  public get prod(): boolean {
    return this.NODE_ENV === 'production';
  }

  /**
   * Is it development environment.
   */
  public get dev(): boolean {
    return this.NODE_ENV === 'development';
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
   * Get config by its name.
   *
   * @param name
   */
  public get<Name extends keyof IConfig>(name: Name): IConfig[Name] {
    return config[name];
  }
}
