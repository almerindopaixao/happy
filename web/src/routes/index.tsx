import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from '../pages/Landing';
import OrphanagesMap from '../pages/OrphanagesMap';
import CreateOrphanage from '../pages/CreateOrphanage';
import Orphanage from '../pages/Orphanage';
import CreateOrphanageSuccess from '../pages/CreateOrphanageSuccess';
import Login from '../pages/Login';

export default function Routes(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={OrphanagesMap} />
        <Route path="/orphanages/create" exact component={CreateOrphanage} />
        <Route
          path="/orphanages/create/success"
          component={CreateOrphanageSuccess}
        />
        <Route path="/orphanages/:id" component={Orphanage} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}
