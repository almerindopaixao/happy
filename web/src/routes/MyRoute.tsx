import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import {
  getTokenLocalStorage,
  getTokenSessionStorage,
} from '../services/token';

interface Props extends RouteProps {
  isClosed?: boolean;
}

export default function MyRoute({
  component: Component,
  isClosed = false,
  ...rest
}: Props): JSX.Element {
  const isLoggedIn = !!getTokenLocalStorage() || !!getTokenSessionStorage();

  if (isClosed && !isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} component={Component} />;
}
