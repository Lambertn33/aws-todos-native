import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Input from "../UI/Input";
import { GlobalStyles } from "../../constants/styles";
import Button from "../UI/Button";

const AuthForm = ({ onNavigateBack }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValues, setInputValues] = useState({
    names: "",
    email: "",
    password: "",
  });

  const toggleAuthMode = () => {
    setInputValues({
      email: "",
      password: "",
      names: "",
    });
    setIsLoginMode(!isLoginMode);
  };

  const inputChangedHandler = (input, value) => {
    setInputValues((prevValues) => {
      return {
        ...prevValues,
        [input]: value,
      };
    });
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>AWS Todos App</Text>
      {/* FORM */}
      <View style={styles.form}>
        {/* FORM INPUTS */}
        <View style={styles.inputsRow}>
          {!isLoginMode && (
            <Input
              label="Names"
              otherProps={{
                keyboardType: "default",
                onChangeText: inputChangedHandler.bind(this, "names"),
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
          <Button onPress={() => console.log("hi")}>
            {isLoginMode ? "Login" : "Signup"}
          </Button>
          <View style={styles.formActions}>
            <TouchableOpacity onPress={toggleAuthMode}>
              <Text style={styles.formAction}>
                {isLoginMode ? "No account Yet?" : "Already have an account?"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onNavigateBack}>
              <Text style={styles.formAction}>Return home</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* FORM ACTIONS*/}
      </View>
      {/* FORM */}
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
    backgroundColor: 'white',
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
    fontSize: 15
  },
  formTitle: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "800",
    color: GlobalStyles.colors.primary
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
