import React, { createContext,useContext, useState, useEffect } from "react"
import { auth } from "../utils/firebase"
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

   async function signup(email, password) {

    const userCredentail =await createUserWithEmailAndPassword(auth, email, password);
    setCurrentUser(userCredentail.user);
   
  }

  async function login(email, password)  {
    console.log("a");
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setCurrentUser(userCredential.user);
    console.log(currentUser)
  

  }

  // function postStory(email) {
  //   const token = auth.currentUser.getIdToken();
  //   return auth.sendPasswordResetEmail(email)
  // }
  // function logout() {
  //   return auth.signOut()
  // }

  // function resetPassword(email) {
  //   return auth.sendPasswordResetEmail(email)
  // }

  // function updateEmail(email) {
  //   return currentUser.updateEmail(email)
  // }

  // function updatePassword(password) {
  //   return currentUser.updatePassword(password)
  // }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup
    // logout,
    // resetPassword,
    // updateEmail,
    // updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
