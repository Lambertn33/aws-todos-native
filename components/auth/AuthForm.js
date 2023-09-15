import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Loader from "../UI/Loader";

const AuthForm = ({
  onNavigateBack,
  authIsLogin,
  clearErrorHandler,
  changeAuthHandler,
  handleAuth,
  errorMessage,
  isSubmitting,
  hasError,
}) => {
  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (hasError) {
      Alert.alert("Error", errorMessage, [
        {
          text: "Retry",
          onPress: clearErrorHandler,
        },
      ]);
    }
  }, [hasError]);

  const toggleAuthMode = () => {
    setInputValues({
      email: "",
      password: "",
      username: "",
    });
    changeAuthHandler();
  };

  const inputChangedHandler = (input, value) => {
    setInputValues((prevValues) => {
      return {
        ...prevValues,
        [input]: value,
      };
    });
  };

  const validateInput = (input) => input.trim().length > 0;

  const submitForm = () => {
    if (
      !validateInput(inputValues.email) ||
      !validateInput(inputValues.password) ||
      (!authIsLogin && !validateInput(inputValues.username))
    ) {
      Alert.alert("Validation errors", "Please fill all inputs and try again");
      return;
    }
    handleAuth(inputValues);
  };

  return (
    <View style={styles.formContainer}>
      {isSubmitting ? (
        <Loader />
      ) : (
        <>
          <Text style={styles.formTitle}>AWS Todos App</Text>
          <View style={styles.form}>
            {/* FORM INPUTS */}
            <View style={styles.inputsRow}>
              {!authIsLogin && (
                <Input
                  label="Username"
                  otherProps={{
                    keyboardType: "default",
                    onChangeText: inputChangedHandler.bind(this, "username"),
                    value: inputValues.names,
                  }}
                />
              )}
              <Input
                label="Email"
                otherProps={{
                  keyboardType: "email-address",
                  onChangeText: inputChangedHandler.bind(this, "email"),
                  value: inputValues.email,
                }}
              />
              <Input
                label="Password"
                otherProps={{
                  secureTextEntry: true,
                  onChangeText: inputChangedHandler.bind(this, "password"),
                  value: inputValues.password,
                }}
              />
            </View>
            {/* FORM INPUTS*/}

            {/* FORM ACTIONS*/}
            <View style={styles.buttonsContainer}>
              <Button onPress={submitForm}>
                {authIsLogin ? "Login" : "Signup"}
              </Button>
              <View style={styles.formActions}>
                <TouchableOpacity onPress={toggleAuthMode}>
                  <Text style={styles.formAction}>
                    {authIsLogin
                      ? "No account Yet?"
                      : "Already have an account?"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onNavigateBack}>
                  <Text style={styles.formAction}>Return home</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* FORM ACTIONS*/}
          </View>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    gap: 12,
    backgroundColor: GlobalStyles.colors.secondary,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  form: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 6,
    gap: 18,
  },
  formActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formAction: {
    fontWeight: "500",
    color: GlobalStyles.colors.primary,
    fontSize: 15,
  },
  formTitle: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "800",
    color: GlobalStyles.colors.primary,
  },
  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 4,
  },
  inputsRow: {
    gap: 12,
  },
  inputRow: {
    flex: 1,
  },
});

export default AuthForm;
