import React, { FC, lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'wouter';

import { viewerModel } from 'entity';
import { UiCirclePending, UiFlexCentered } from 'shared';

const UsersPage = lazy(() => import('./users'));
const LoginPage = lazy(() => import('./login'));
const RoomsPage = lazy(() => import('./rooms'));
const SignUpPage = lazy(() => import('./sign-up'));

/**
 * Application main router.
 */
export const Router: FC = () => {
  const viewerExecutor = viewerModel.useViewerExecutor();

  if (viewerExecutor.loading) {
    return (
      <UiFlexCentered viewportHeight={true}>
        <UiCirclePending />
      </UiFlexCentered>
    );
  }

  if (viewerExecutor.response) {
    return (
      <Suspense
        fallback={
          <UiFlexCentered viewportHeight={true}>
            <UiCirclePending />
          </UiFlexCentered>
        }
      >
        <Switch>
          <Route<{ id?: string }> path='/rooms/:id?' component={RoomsPage} />
          <Route<{ id?: string }> path='/users/:id?' component={UsersPage} />
          <Redirect to='/rooms' />
        </Switch>
      </Suspense>
    );
  }

  return (
    <Suspense
      fallback={
        <UiFlexCentered viewportHeight={true}>
          <UiCirclePending />
        </UiFlexCentered>
      }
    >
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/sign-up' component={SignUpPage} />
        <Redirect to='/login' />
      </Switch>
    </Suspense>
  );
};
