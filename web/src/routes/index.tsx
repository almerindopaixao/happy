import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import MyRoute from './MyRoute';

import Landing from '../pages/Landing';
import OrphanagesMap from '../pages/OrphanagesMap';
import CreateOrphanage from '../pages/CreateOrphanage';
import Orphanage from '../pages/Orphanage';
import CreateOrphanageSuccess from '../pages/CreateOrphanageSuccess';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';

export default function Routes(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <MyRoute path="/" exact component={Landing} />
        <MyRoute path="/app" component={OrphanagesMap} />
        <MyRoute path="/orphanages/create" exact component={CreateOrphanage} />
        <MyRoute
          path="/orphanages/create/success"
          component={CreateOrphanageSuccess}
        />
        <MyRoute path="/orphanages/:id" component={Orphanage} />
        <MyRoute exact path="/login" component={Login} />
        <MyRoute exact path="/forgot_password" component={ForgotPassword} />
        <MyRoute exact path="/dashboard" isClosed component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}
