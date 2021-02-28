import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import AppRoutes from './app.routes'
import { useAuth } from '../contexts/auth'
import AuthRoutes from './auth.routes'

const Routes: React.FC = () => {
  const { signed } = useAuth()
  return (
    <BrowserRouter>{signed ? <AppRoutes /> : <AuthRoutes />}</BrowserRouter>
  )
}

export default Routes
