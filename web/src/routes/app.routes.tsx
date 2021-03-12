import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Attributes from '../pages/Attributes'

const AppRoutes: React.FC = () => (
  <Switch>
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/atributos" component={Attributes} />
    <Route exact path="/">
      <Redirect to="/dashboard" />
    </Route>
    <Route path="*">
      <Redirect to="/dashboard" />
    </Route>
  </Switch>
)

export default AppRoutes
