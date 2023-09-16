import { useState, useCallback, useLayoutEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "../../../constants/styles";

import { deleteTodoHelper, getTodosHelper } from "../../../helpers/todos";

import TodosList from "../../../components/user/todos/TodosList";
import Loader from "../../../components/UI/Loader";

const Todos = ({ navigation }) => {
  const [todosState, setTodosState] = useState({
    todos: [],
    isLoading: true,
  });

  const refreshHeaderOptions = () => {
    navigation.getParent().setOptions({
      headerRight: () => (
        <View style={{ marginRight: 4 }}>
          <Ionicons
            name="add"
            color="white"
            size={32}
            onPress={() => navigation.push("manageTodo")}
          />
        </View>
      ),
    });
  };

  useFocusEffect(
    useCallback(() => {
      refreshHeaderOptions();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      // Fetch user todos when the tab is focused
      const fetchTodos = async () => {
        try {
          const fetchedTodos = await getTodosHelper();
          setTodosState({
            isLoading: false,
            todos: fetchedTodos,
          });
        } catch (error) {
          Alert.alert("Error", error.message);
        }
      };

      fetchTodos();
    }, [])
  );

  // delete todo
  const deleteTodoHandler = async (todoId) => {
    try {
      setTodosState((prevState) => {
        return { ...prevState, isLoading: true };
      });
      await deleteTodoHelper(todoId);
      const filteredTodos = todosState.todos.filter(
        (todo) => todo.TodoId !== todoId
      );
      setTodosState({
        isLoading: false,
        todos: filteredTodos,
      });
      Alert.alert("Success", "Todo deleted successfully");
    } catch (error) {
      Alert.alert("Error", error.message);
      setTodosState({
        isLoading: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      {todosState.isLoading ? (
        <View style={styles.loader}>
          <Loader />
        </View>
      ) : (
        <TodosList todos={todosState.todos} onDeleteTodo={deleteTodoHandler} />
      )}
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

export default Todos;
