import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Callback from '../pages/Callback'
import Login from '../pages/Login'

const AuthRoutes: React.FC = () => (
  <Switch>
    <Route path="/login/callback" component={Callback} />
    <Route exact path="/login" component={Login} />
    <Route path="*">
      <Redirect to="/login" />
    </Route>
  </Switch>
)

export default AuthRoutes
