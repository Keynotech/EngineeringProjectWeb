/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/no-anonymous-default-export */
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import React, { createContext, useContext, useState, useEffect } from "react"
import { firebaseAuth } from "../firebase"

export const AuthContext = createContext()

// eslint-disable-next-line react/function-component-definition
export default ({ children }) => {
  const [user, setUser] = useState({})

  async function signUpWithEmail(email, password) {
    await createUserWithEmailAndPassword(firebaseAuth, email, password)
  }

  async function loginWithEmail(email, password) {
    await signInWithEmailAndPassword(firebaseAuth, email, password)
  }

  async function logout() {
    await signOut(firebaseAuth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        auth: firebaseAuth,
        signUpWithEmail,
        loginWithEmail,
        logout,
      }}
    >
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
