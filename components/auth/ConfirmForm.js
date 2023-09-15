import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import Input from "../UI/Input";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";

const ConfirmForm = ({
  userToConfirm,
  confirmAccount,
  clearErrorHandler,
  hasError,
  errorMessage,
}) => {
  const [confirmData, setConfirmData] = useState({
    code: "",
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

  const formIsValid = confirmData.code.trim().length > 0;

  const changeInputHandler = (input, value) => {
    setConfirmData((prevState) => {
      return {
        ...prevState,
        [input]: value,
      };
    });
  };

  const submitForm = () => {
    if (!formIsValid) {
      Alert.alert("Validations error", "Please provide the code", [
        {
          text: "OK",
          onPress: clearErrorHandler,
        },
      ]);
      return;
    }
    confirmAccount(confirmData.code);
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.form}>
        <Text style={styles.formTitle}>
          Dear {userToConfirm.username} Please enter the code sent to{" "}
          {userToConfirm.email}
        </Text>
        <Input
          label="Code"
          otherProps={{
            keyboardType: "numeric",
            onChangeText: changeInputHandler.bind(this, "code"),
            value: confirmData.code,
          }}
        />
        <Button onPress={submitForm}>Confirm Account</Button>
      </View>
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
  formTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ConfirmForm;
