import { View, StyleSheet, Alert } from "react-native";
import { createTodoHelper } from "../../../helpers/todos";

import ManageTodoForm from "../../../components/user/todos/ManageTodoForm";
import { GlobalStyles } from "../../../constants/styles";
import { useState } from "react";

const ManageTodo = ({ navigation }) => {
  const [newTodo, setNewTodo] = useState({
    isSubmitting: false,
    error: "",
    success: false,
  });

  const navigatetoTodosHandler = () => {
    navigation.navigate("todos");
  };

  const createNewTodoHandler = async (title, description) => {
    setNewTodo((prevState) => {
      return { ...prevState, isSubmitting: true };
    });
    try {
      await createTodoHelper(title, description);
      setNewTodo((prevState) => {
        return { ...prevState, isSubmitting: false };
      });
      Alert.alert("Success", "todo created successfully", [
        {
          text: "OK",
          onPress: navigatetoTodosHandler,
        },
      ]);
    } catch (err) {
      setNewTodo((prevState) => {
        return { ...prevState, isSubmitting: false };
      });
      Alert.alert("Error", err.message);
    }
    console.log(title);
  };

  return (
    <View style={styles.container}>
      <ManageTodoForm
        hasError={newTodo.error.trim().length > 0}
        isSubmitting={newTodo.isSubmitting}
        onCreateNewTodo={createNewTodoHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.secondary,
    padding: 24,
  },
  loader: {
    justifyContent: "center",
    flex: 1,
  },
});

export default ManageTodo;
