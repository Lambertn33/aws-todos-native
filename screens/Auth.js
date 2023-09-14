import { View, StyleSheet } from "react-native";
import AuthForm from "../components/auth/AuthForm";

const Auth = ({ navigation }) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.formContainer}>
      <AuthForm onNavigateBack={navigateBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
});

export default Auth;
