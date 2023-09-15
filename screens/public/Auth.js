import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { signUpHelper } from "../../helpers/auth";
import AuthForm from "../../components/auth/AuthForm";

const Auth = ({ navigation }) => {
  const [authIsLogin, setAuthIsLogin] = useState(true);
  const [cognitoAuth, setCognitoAuth] = useState({
    error: "",
    success: false,
    isSubmitting: false,
  });

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
      if (authIsLogin) {
        console.log("Login.......");
      } else {
        setCognitoAuth((prevState) => {
          return { ...prevState, isSubmitting: true };
        });
        await signUpHelper(username, email, password);
        setCognitoAuth((prevState) => {
          return { ...prevState, success: true, isSubmitting: false };
        });
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
