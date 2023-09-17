import { View, Text, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import Loader from "../../UI/Loader";

const ManageTodoForm = ({
  onCreateNewTodo,
  onUpdateTodo,
  isEditing,
  todoToEdit,
  isSubmitting,
}) => {
  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
  });

  const [todoId, setTodoId] = useState(null);

  useEffect(() => {
    setTodoId(isEditing ? todoToEdit.TodoId : null);
    setInputValues({
      title: isEditing ? todoToEdit?.Title : "",
      description: isEditing ? todoToEdit.Description : "",
    });
  }, [isEditing, todoToEdit]);

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
    if (isEditing) {
      onUpdateTodo(todoId, inputValues.title, inputValues.description);
    } else {
      onCreateNewTodo(inputValues.title, inputValues.description);
    }
  };

  return (
    <View style={styles.formContainer}>
      {isSubmitting ? (
        <View style={styles.loader}>
          <Loader />
        </View>
      ) : (
        <>
          <Text style={styles.formTitle}>
            {!isEditing ? "Create Todo" : `Edit ${todoToEdit.Title} Todo`}
          </Text>
          <View style={styles.form}>
            <Input
              label="Title"
              otherProps={{
                keyboardType: "default",
                onChangeText: inputChangedHandler.bind(this, "title"),
                value: inputValues.title,
              }}
            />
            <Input
              label="Description"
              otherProps={{
                keyboardType: "default",
                numberOfLines: 3,
                multiline: true,
                onChangeText: inputChangedHandler.bind(this, "description"),
                value: inputValues.description,
              }}
            />
            <Button onPress={submitForm}>
              {!isEditing ? "Create Todo" : `Edit ${todoToEdit.Title} Todo`}
            </Button>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    gap: 16,
    flex: 1,
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
    alignItems: "center",
    flex: 1,
  },
});

export default ManageTodoForm;
