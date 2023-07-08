import type { CookieOptions, Request, Response } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Context, WebSocket } from 'graphql-ws/lib/server';
import { ContextFunction } from 'apollo-server-core/src/types';

import type { AuthService } from '../../auth/auth.service';
import { IViewerData } from '../../auth/auth.service';
import { IConnectionParams } from '../../schema';

interface IGraphqlInternalContext {
  req: Request;
  res: Response;
}

type TGraphqlWsInternalContext = Context<
  IConnectionParams,
  { socket: WebSocket; req: Request }
>;

/**
 * All available cookie keys.
 */
export enum CookiesName {
  REFRESH_TOKEN = 'rt',
}

/**
 * Mutual context for ws subscription connection and http requests.
 */
export class GqlContext {
  private readonly context:
    | {
        type: 'gql';
        value: IGraphqlInternalContext;
      }
    | {
        type: 'ws';
        value: TGraphqlWsInternalContext;
      };

  public constructor(
    private readonly authService: AuthService,
    internalContext: IGraphqlInternalContext | TGraphqlWsInternalContext,
  ) {
    this.context =
      'req' in internalContext
        ? {
            type: 'gql',
            value: internalContext,
          }
        : {
            type: 'ws',
            value: internalContext,
          };
  }

  /**
   * Gets access token.
   */
  public getAccessToken(): string | undefined {
    if (this.context.type === 'gql') {
      const [type, token] =
        this.context.value.req.headers.authorization?.split(' ') ?? [];

      return type === 'Bearer' ? token : undefined;
    }

    return this.context.value.connectionParams?.authorization;
  }

  /**
   * Gets viewer data from access token.
   */
  public async getViewerData(): Promise<IViewerData | undefined> {
    return this.authService.verifyToken(this.getAccessToken() || '');
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
    if (this.context.type === 'gql') {
      return (
        this.context.value.req.cookies as Record<string, string | undefined>
      )[name];
    }

    return (
      this.context.value.extra.req.cookies as Record<string, string | undefined>
    )[name];
  }

  private setCookie(name: string, value: string, options: CookieOptions): void {
    if (this.context.type === 'gql') {
      this.context.value.res.cookie(name, value, options);

      return;
    }

    throw new HttpException(
      "There is no the response in the context. Perhaps it's WS request.",
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

/**
 * Creates mutual context for ws subscription connection and http requests.
 */
export function contextFactory(
  authService: AuthService,
): ContextFunction<
  IGraphqlInternalContext | TGraphqlWsInternalContext,
  GqlContext
> {
  return (context) => new GqlContext(authService, context);
}
