import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { GlobalStyles } from "../../../constants/styles";

import { getTodosHelper } from "../../../helpers/todos";

import Loader from "../../../components/UI/Loader";
import TodosList from "../../../components/user/todos/TodosList";

const Todos = () => {
  const [todosState, setTodosState] = useState({
    todos: [],
    isLoading: false,
  });

  useEffect(() => {
    // fetch user todos
    const fetchTodos = async () => {
      setTodosState((prevState) => {
        return { ...prevState, isLoading: true };
      });
      const fetchedTodos = await getTodosHelper();
      setTodosState({
        isLoading: false,
        todos: fetchedTodos,
      });
    };
    fetchTodos();
  }, []);

  return (
    <View style={styles.container}>
      {todosState.isLoading ? (
        <View style={styles.loader}>
          <Loader />
        </View>
      ) : (
        <TodosList todos={todosState.todos} />
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
