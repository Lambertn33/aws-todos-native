import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { GlobalStyles } from "../constants/styles";

const Welcome = ({ navigation }) => {
  const todosImage = require("../assets/images/todo.png");

  const navigateToAuthHandler = () => {
    navigation.navigate("auth");
  };

  return (
    <View style={styles.container}>
      <Image source={todosImage} style={styles.image} />
      <View style={styles.descriptionContainer}>
        <View>
          <Text style={styles.title}>Welcome to AWS Todos App</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            ab sequi perferendis at asperiores mollitia labore repellat hic, cum
            cumque similique. Numquam enim deserunt aspernatur. Nihil, nesciunt!
            Eaque, doloribus alias?
          </Text>
        </View>
        <View style={styles.button}>
          <Pressable onPress={navigateToAuthHandler}>
            <Text style={styles.buttonLabel}>Get started</Text>
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

export default Welcome;
