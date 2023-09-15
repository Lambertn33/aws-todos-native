import { useState } from "react";
import { View, StyleSheet } from "react-native";
import ConfirmForm from "../../components/auth/ConfirmForm";
import { confirmSignUpHelper } from "../../helpers/auth";

const Confirm = ({ route, navigation }) => {
  const [cognitoAccountConfirm, setCognitoAccountConfirm] = useState({
    error: "",
    success: false,
    isSubmitting: false,
  });

  const { userToConfirm } = route.params;

  const clearErrorHandler = () => {
    setCognitoAccountConfirm({
      error: "",
      success: false,
      isSubmitting: false,
    });
  };

  const confirmAccount = async (code) => {
    try {
      setCognitoAccountConfirm((prevState) => {
        return { ...prevState, isSubmitting: true };
      });
      await confirmSignUpHelper(userToConfirm.username, code);
      navigation.push("successConfirm", {
        confirmedUser: userToConfirm,
      });
      setCognitoAccountConfirm((prevState) => {
        return { ...prevState, success: true, isSubmitting: false };
      });
    } catch (err) {
      setCognitoAccountConfirm((prevState) => {
        return { ...prevState, error: err.message, isSubmitting: false };
      });
    }
  };
  return (
    <View style={styles.formContainer}>
      <ConfirmForm
        clearErrorHandler={clearErrorHandler}
        confirmAccount={confirmAccount}
        errorMessage={cognitoAccountConfirm.error}
        hasError={cognitoAccountConfirm.error.trim().length > 0}
        userToConfirm={userToConfirm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
});

export default Confirm;
