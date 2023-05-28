import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { GqlContext } from '../gql-context';

/**
 * Gets authorized user data from request context.
 */
export const AuthorizedUserDataDecorator = createParamDecorator(
  (_, context: ExecutionContext) => {
    const gqlContext =
      GqlExecutionContext.create(context).getContext<GqlContext>();

    return gqlContext.getAuthorizedUserData();
  },
);
