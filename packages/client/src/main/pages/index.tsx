import React, { FC, lazy, Suspense, useEffect } from "react";
import { Redirect, Route, Switch } from "wouter";

import { UiCirclePending, UiFlexCentered, useAuthManager } from "../shared";
import { viewerModel } from "../entities";

const UserPage = lazy(() => import("./user"));
const LoginPage = lazy(() => import("./login"));
const RoomPage = lazy(() => import("./room"));
const SignUpPage = lazy(() => import("./sign-up"));

/**
 * Application main router.
 */
export const Router: FC = () => {
  const authManager = useAuthManager();

  const viewerStore = viewerModel.useViewerStore();
  const viewerExecutor = viewerModel.useViewerExecutor({
    onSuccess: (data) => {
      if (data?.viewer) {
        viewerStore.set(data.viewer);
      }
    },
  });

  useEffect(() => {
    if (authManager.loggedIn) {
      viewerExecutor.execute();
    }
  }, [authManager.loggedIn]);

  if (authManager.loggedIn) {
    return (
      <Suspense
        fallback={
          <UiFlexCentered viewportHeight={true}>
            <UiCirclePending />
          </UiFlexCentered>
        }
      >
        <Switch>
          <Route path="/rooms/:id?" component={RoomPage} />
          <Route path="/users/:id?" component={UserPage} />
          <Redirect to="/rooms" />
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
        <Route path="/login" component={LoginPage} />
        <Route path="/sign-up" component={SignUpPage} />
        <Redirect to="/login" />
      </Switch>
    </Suspense>
  );
};
