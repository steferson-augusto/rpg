import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Attributes from '../pages/Attributes'
import Skills from '../pages/Skills'
import Macro from '../pages/Macro'
import WeaponSmith from '../pages/Macro/WeaponSmith'

const AppRoutes: React.FC = () => (
  <Switch>
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/atributos" component={Attributes} />
    <Route exact path="/pericias" component={Skills} />
    <Route exact path="/macros/forja-de-armas" component={WeaponSmith} />
    <Route exact path="/macros" component={Macro} />
    <Route exact path="/">
      <Redirect to="/dashboard" />
    </Route>
    <Route path="*">
      <Redirect to="/dashboard" />
    </Route>
  </Switch>
)

export default AppRoutes
