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
   * Api port.
   */
  public get apiPort(): number {
    return this.get('API_PORT');
  }

  /**
   * Api prefix.
   */
  public get apiPrefix(): string {
    return this.get('API_PREFIX');
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
   * Gql playground enabled.
   */
  public get gqlPlaygroundEnabled(): boolean | null {
    return this.get('API_GQL_PLAYGROUND_ENABLED');
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
