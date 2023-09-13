import { View, Text, StyleSheet } from "react-native";
import AuthForm from "../components/auth/AuthForm";
import { GlobalStyles } from "../constants/styles";

const Auth = () => {
  const todosImage = require("../assets/images/todo.png");
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <AuthForm />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary,
    flex: 1,
  },
  formContainer: {
    flex: 2,
  },
});

export default Auth;
