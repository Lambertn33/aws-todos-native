import { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { signUpHelper } from "../../helpers/auth";
import AuthForm from "../../components/auth/AuthForm";

import { AuthContext } from "../../context/authContext";

const Auth = ({ navigation }) => {
  const [authIsLogin, setAuthIsLogin] = useState(true);
  const [cognitoAuth, setCognitoAuth] = useState({
    error: "",
    success: false,
    isSubmitting: false,
  });

  const authCtx = useContext(AuthContext);

  const changeAuthHandler = () => {
    setAuthIsLogin(!authIsLogin);
  };

  const clearErrorHandler = () => {
    setCognitoAuth({
      error: "",
      success: false,
    });
  };

  const handleAuth = async (authInputs) => {
    const { username, email, password } = authInputs;
    try {
      setCognitoAuth((prevState) => {
        return { ...prevState, isSubmitting: true };
      });
      if (authIsLogin) {
        // signin
        await authCtx.signIn(username, password);
        setCognitoAuth((prevState) => {
          return { ...prevState, isSubmitting: false };
        });
      } else {
        // signup
        await signUpHelper(username, email, password);
        navigation.push("confirm", {
          userToConfirm: {
            username: username,
            email: email,
          },
        });
      }
    } catch (err) {
      setCognitoAuth((prevState) => {
        return { ...prevState, error: err.message, isSubmitting: false };
      });
    }
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.formContainer}>
      <AuthForm
        authIsLogin={authIsLogin}
        changeAuthHandler={changeAuthHandler}
        clearErrorHandler={clearErrorHandler}
        errorMessage={cognitoAuth.error}
        isSubmitting={cognitoAuth.isSubmitting}
        handleAuth={handleAuth}
        hasError={cognitoAuth.error.trim().length > 0}
        onNavigateBack={navigateBack}
        successSignup={cognitoAuth.success && !authIsLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
});

export default Auth;
