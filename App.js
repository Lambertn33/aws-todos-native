import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AuthForm from "./components/auth/AuthForm";
import Auth from "./screens/Auth";
import Welcome from "./screens/Welcome";

export default function App() {
  return (
    <View style={styles.container}>
      <Welcome />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
