import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./screens/public/Welcome";
import Auth from "./screens/public/Auth";

const Stack = createNativeStackNavigator();

const PublicStack = () => {
  const screenOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator initialRouteName="welcome" screenOptions={screenOptions}>
      <Stack.Screen name="auth" component={Auth} />
      <Stack.Screen name="welcome" component={Welcome} />
    </Stack.Navigator>
  );
};

const Root = () => {
  return (
    <NavigationContainer>
      <PublicStack />
    </NavigationContainer>
  );
};

export default function App() {
  return <Root />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
