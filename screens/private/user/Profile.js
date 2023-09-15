import { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../../context/authContext";
import Button from "../../../components/UI/Button";
import { GlobalStyles } from "../../../constants/styles";

const Profile = () => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.signOut();
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Ionicons
          name="person-circle"
          color={GlobalStyles.colors.primary}
          size={200}
        />
        <Text style={styles.title}>User profile</Text>
      </View>
      <View style={styles.user}>
        <View>
          <Text style={styles.userText}>username: {authCtx.user.username}</Text>
          <Text style={styles.userText}>email: {authCtx.user.email}</Text>
        </View>
        <Button onPress={logoutHandler}>Logout</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 24,
    backgroundColor: GlobalStyles.colors.secondary,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  user: {
    gap: 12,
  },
  userText: {
    fontSize: 16,
    fontWeight: "700",
  },
});

export default Profile;
