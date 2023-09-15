import { useContext } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../../../context/authContext";
import Button from "../../../components/UI/Button";

const Profile = () => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.signOut();
  };
  return (
    <View>
      <Text>User profile</Text>
      <Text>username: {authCtx.user.username}</Text>
      <Text>email: {authCtx.user.email}</Text>
      <Button onPress={logoutHandler}>Logout</Button>
    </View>
  );
};

export default Profile;
