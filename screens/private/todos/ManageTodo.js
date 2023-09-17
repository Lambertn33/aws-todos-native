import { View, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createTodoHelper, updateTodoHelper } from "../../../helpers/todos";

import ManageTodoForm from "../../../components/user/todos/ManageTodoForm";
import { GlobalStyles } from "../../../constants/styles";
import { useLayoutEffect, useState, useEffect } from "react";

const ManageTodo = ({ navigation, route }) => {
  const [newTodo, setNewTodo] = useState({
    isSubmitting: false,
    error: "",
    success: false,
  });

  const [todoToEdit, setTodoToEdit] = useState(null);

  const [updateTodo, setUpdateTodo] = useState({
    isSubmitting: false,
    error: "",
    success: false,
  });

  useEffect(() => {
    if (route.params && route.params.todoToEdit) {
      setTodoToEdit(route.params.todoToEdit);
    }
  }, [route]);

  useLayoutEffect(() => {
    navigation.getParent().setOptions({
      headerRight: () => (
        <View style={{ marginRight: 4 }}>
          <Ionicons
            name="list"
            color="white"
            size={32}
            onPress={() => navigation.push("todosList")}
          />
        </View>
      ),
    });
  }, [navigation]);

  const navigatetoTodosHandler = () => {
    navigation.navigate("todosList");
  };

  // update todo
  const updateTodoHandler = async (id, title, description) => {
    setUpdateTodo((prevState) => {
      return { ...prevState, isSubmitting: true };
    });

    try {
      await updateTodoHelper(id, title, description);
      setUpdateTodo((prevState) => {
        return { ...prevState, isSubmitting: false };
      });
      Alert.alert("Success", "todo updated successfully", [
        {
          text: "OK",
          onPress: navigatetoTodosHandler,
        },
      ]);
    } catch (err) {
      setUpdateTodo((prevState) => {
        return { ...prevState, isSubmitting: false };
      });
      Alert.alert("Error", err.message);
    }
  };

  //create todo
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
  };

  return (
    <View style={styles.container}>
      <ManageTodoForm
        hasError={newTodo.error.trim().length > 0}
        isSubmitting={newTodo.isSubmitting}
        onCreateNewTodo={createNewTodoHandler}
        onUpdateTodo={updateTodoHandler}
        isEditing={todoToEdit !== null}
        todoToEdit={todoToEdit}
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
