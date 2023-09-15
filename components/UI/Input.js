import { TextInput, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Input = ({ label, otherProps }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...otherProps} style={styles.input} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 8,
    gap: 3,
  },
  label: {
    color: GlobalStyles.colors.dark,
    fontSize: 18,
    fontWeight: "500",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    color: GlobalStyles.colors.dark,
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 6,
    fontSize: 16,
  },
});

export default Input;
