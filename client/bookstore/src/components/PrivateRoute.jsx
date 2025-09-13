import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
// import styles from './PrivateRoute.module.css'

const PrivateRoute = ({ children }) => {
  const { user } = useAuth()
  const location = useLocation()

  return user ? children : <Navigate to="/login" state={{ from: location }} replace />
}

export default PrivateRoute