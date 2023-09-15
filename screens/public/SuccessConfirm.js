import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const SuccessConfirm = ({ route, navigation }) => {
  const { confirmedUser } = route.params;
  const todosImage = require("../../assets/images/todo.png");

  const navigateToAuthHandler = () => {
    navigation.push("auth");
  };

  return (
    <View style={styles.container}>
      <Image source={todosImage} style={styles.image} />
      <View style={styles.descriptionContainer}>
        <View>
          <Text style={styles.title}>Account Confirmed</Text>
          <Text style={styles.description}>
            Dear {confirmedUser.username}, Your account has been confirmed
            successfully, you can now login in your account
          </Text>
        </View>
        <View style={styles.button}>
          <Pressable onPress={navigateToAuthHandler}>
            <Text style={styles.buttonLabel}>Login Now</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: GlobalStyles.colors.primary,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  buttonLabel: {
    color: "white",
    fontSize: 20,
    fontWeight: "800",
  },
  container: {
    backgroundColor: GlobalStyles.colors.secondary,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    paddingHorizontal: 6
  },
  image: {
    width: 250,
    height: 250,
  },
  descriptionContainer: {
    gap: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  description: {
    textAlign: "center",
  },
});

export default SuccessConfirm;
