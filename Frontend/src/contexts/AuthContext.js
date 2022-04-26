import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //   console.log("auth is ", auth.createUserWithEmailAndPassword);

  const signup = async (email, password) => {
    try {
      console.log("email and password is =>", email, password);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (err) {
      console.log(err);
    }

    // return createUserWithEmailAndPassword(email, password);
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const Logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoggedIn(true);
    });

    // Just return the unsubscribe function.  React will call it when it's
    // no longer needed.
    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    signup,
    isLoggedIn,
    Logout,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
