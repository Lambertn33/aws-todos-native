import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { signInHelper, signOutHelper } from "../helpers/auth";

export const AuthContext = createContext({
  user: null,
  isLoading: false,
  signIn: (username, password) => {},
  signOut: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getCurrentUser = async () => {
    try {
      const user = await getCurrentUserHelper();
      AsyncStorage.setItem("token", user.token);
      setUser(user);
    } catch (err) {
      setUser(null);
    }
  };

  const signIn = async (username, password) => {
    await signInHelper(username, password);
    await getCurrentUser();
  };
  const signOut = async () => {
    await signOutHelper();
    AsyncStorage.removeItem("token");
    setUser(null);
  };

  const authValue = {
    user,
    isLoading,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
