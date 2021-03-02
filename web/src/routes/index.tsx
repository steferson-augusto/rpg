/* eslint-disable multiline-ternary */
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import AppRoutes from './app.routes'
import { useAuth } from '../contexts/auth'
import AuthRoutes from './auth.routes'
import Structure from '../components/Structure'

const Routes: React.FC = () => {
  const { signed } = useAuth()

  return (
    <BrowserRouter>
      {signed ? (
        <Structure>
          <AppRoutes />
        </Structure>
      ) : (
        <AuthRoutes />
      )}
    </BrowserRouter>
  )
}

export default Routes
