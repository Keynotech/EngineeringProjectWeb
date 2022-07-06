/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/no-anonymous-default-export */
import React, { createContext, useContext, useState, useEffect } from "react"
import { firebaseAuth } from "../firebase"

export const AuthContext = createContext()

// eslint-disable-next-line react/function-component-definition
export default ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          // User is signed in.
          const { uid, displayName, email, photoURL } = user
          setUser({ uid, displayName, email, photoURL })
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error(error)
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, auth: firebaseAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const auth = useContext(AuthContext)

  if (auth === undefined) {
    throw new Error("Missing auth")
  }
  return auth
}
