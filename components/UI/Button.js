import { StyleSheet, Pressable, View, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Button = ({ children, onPress }) => {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: GlobalStyles.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight:'500'
  },

  pressed: {
    opacity: 0.75,
  },
});

export default Button;
