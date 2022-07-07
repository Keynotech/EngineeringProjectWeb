/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from "react"
import { Navigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContextProvider"

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext()

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  return children
}

export default ProtectedRoute
