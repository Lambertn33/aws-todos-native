import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getCurrentUserHelper, signInHelper, signOutHelper } from "../helpers/auth";

export const AuthContext = createContext({
  user: null,
  signIn: (username, password) => {},
  signOut: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getCurrentUser = async () => {
    try {
      const user = await getCurrentUserHelper();
      await AsyncStorage.setItem("token", user.token);
      setUser(user);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(()=> {
    getCurrentUser();
  }, []);

  const signIn = async (username, password) => {
    await signInHelper(username, password);
    await getCurrentUser();
  };

  const signOut = async () => {
    await signOutHelper();
    console.log('logout');
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  const authValue = {
    user,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
