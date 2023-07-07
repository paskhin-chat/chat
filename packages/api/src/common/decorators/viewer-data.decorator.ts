import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { GqlContext } from '../context';

/**
 * Gets viewer data from request context.
 */
export const ViewerDataDecorator = createParamDecorator(
  (_, context: ExecutionContext) => {
    const gqlContext =
      GqlExecutionContext.create(context).getContext<GqlContext>();

    return gqlContext.getViewerData();
  },
);
