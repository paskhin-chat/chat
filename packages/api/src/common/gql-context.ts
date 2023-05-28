import type { CookieOptions, Request, Response } from 'express';

import type { AuthService } from '../auth/auth.service';
import { IAuthorizedUserData } from '../auth/auth.service';

enum CookiesName {
  REFRESH_TOKEN = 'rt',
}

/**
 * App gql context that contains request, response and methods to interact with
 * it.
 */
export class GqlContext {
  public constructor(
    private readonly req: Request,
    private readonly res: Response,
    private readonly authService: AuthService,
  ) {}

  /**
   * Gets access token.
   */
  public getAccessToken(): string | undefined {
    const [type, token] = this.req.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

  /**
   * Gets user data from access token.
   */
  public async getAuthorizedUserData(): Promise<
    IAuthorizedUserData | undefined
  > {
    const accessToken = this.getAccessToken();

    if (!accessToken) {
      return undefined;
    }

    return this.authService.verifyToken(accessToken);
  }

  /**
   * Gets refresh token.
   */
  public getRefreshToken(): string | undefined {
    return this.getCookie(CookiesName.REFRESH_TOKEN);
  }

  /**
   * Sets refresh token.
   */
  public setRefreshToken(value: string): void {
    this.setCookie(CookiesName.REFRESH_TOKEN, value, {
      httpOnly: true,
      secure: true,
    });
  }

  private getCookie(name: string): string | undefined {
    return (this.req.cookies as Record<string, string | undefined>)[name];
  }

  private setCookie(name: string, value: string, options: CookieOptions): void {
    this.res.cookie(name, value, options);
  }
}
