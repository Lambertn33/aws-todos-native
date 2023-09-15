import { View, Text, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import Loader from "../../UI/Loader";

const CreateTodoForm = ({ onCreateNewTodo, hasError, isSubmitting }) => {
  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
  });

  const inputChangedHandler = (input, value) => {
    setInputValues((prevValues) => {
      return {
        ...prevValues,
        [input]: value,
      };
    });
  };

  const validateInput = (input) => input.trim().length > 0;

  const submitForm = () => {
    if (
      !validateInput(inputValues.title) ||
      !validateInput(inputValues.description)
    ) {
      Alert.alert("Validations error", "please fill all fields");
      return;
    }
    onCreateNewTodo(inputValues.title, inputValues.description);
  };

  return (
    <View style={styles.formContainer}>
      {isSubmitting ? (
        <View style={styles.loader}>
          <Loader />
        </View>
      ) : (
        <>
          <Text style={styles.formTitle}>Create Todo</Text>
          <View style={styles.form}>
            <Input
              label="Title"
              otherProps={{
                keyboardType: "default",
                onChangeText: inputChangedHandler.bind(this, "title"),
                value: inputValues.username,
              }}
            />
            <Input
              label="Description"
              otherProps={{
                keyboardType: "default",
                numberOfLines: 3,
                multiline: true,
                onChangeText: inputChangedHandler.bind(this, "description"),
                value: inputValues.username,
              }}
            />
            <Button onPress={submitForm}>Create Todo</Button>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    gap: 16,
    flex: 1
  },
  form: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 6,
    gap: 18,
  },
  formTitle: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "800",
  },
  loader: {
    alignItems: 'center',
    flex: 1,
  },
});

export default CreateTodoForm;
