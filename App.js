import { useContext } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Welcome from "./screens/public/Welcome";
import Confirm from "./screens/public/Confirm";
import Auth from "./screens/public/Auth";
import SuccessConfirm from "./screens/public/SuccessConfirm";

import Todos from "./screens/private/todos/Todos";
import ManageTodo from "./screens/private/todos/ManageTodo";
import Profile from "./screens/private/user/Profile";

import AuthContextProvider from "./context/authContext";
import { AuthContext } from "./context/authContext";

import { GlobalStyles } from "./constants/styles";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const PublicStack = () => {
  const screenOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator initialRouteName="welcome" screenOptions={screenOptions}>
      <Stack.Screen name="auth" component={Auth} />
      <Stack.Screen name="welcome" component={Welcome} />
      <Stack.Screen name="confirm" component={Confirm} />
      <Stack.Screen name="successConfirm" component={SuccessConfirm} />
    </Stack.Navigator>
  );
};

const TodosStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="todosList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="todosList" component={Todos} />
      <Stack.Screen name="manageTodo" component={ManageTodo} />
    </Stack.Navigator>
  );
};

const PrivateStack = () => {
  return (
    <Tabs.Navigator
      initialRouteName="todos"
      screenOptions={{
        tabBarLabelStyle: {
          textAlign: "center",
          color: "white",
          fontSize: 13,
          fontWeight: "600",
        },
        tabBarIconStyle: {
          color: "white",
        },
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary,
        },

        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary,
        },
        headerTintColor: "white",
      }}
    >
      <Tabs.Screen
        component={TodosStack}
        name="todos"
        options={({ navigation }) => {
          return {
            headerRight: () => (
              <View style={{ marginRight: 4 }}>
                <Ionicons
                  name="add"
                  color="white"
                  size={32}
                  onPress={() => navigation.navigate("manageTodo")}
                />
              </View>
            ),
            title: "Todos",
            tabBarLabel: "Todos Management",
            tabBarIcon: ({ size }) => (
              <Ionicons name="calendar" color="white" size={size} />
            ),
          };
        }}
      />
      <Tabs.Screen
        component={Profile}
        name="profile"
        options={{
          title: "My profile",
          tabBarLabel: "profile",
          tabBarIcon: ({ size }) => (
            <Ionicons name="person-circle" color="white" size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const Root = () => {
  const authCtx = useContext(AuthContext);
  const isAuthenticated = authCtx.user !== null;
  return (
    <NavigationContainer>
      {!isAuthenticated ? <PublicStack /> : <PrivateStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthContextProvider>
      <Root />
    </AuthContextProvider>
  );
}
