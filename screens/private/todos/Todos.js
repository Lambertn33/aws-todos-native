import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { GlobalStyles } from "../../../constants/styles";

import { getTodosHelper } from "../../../helpers/todos";

import Loader from "../../../components/UI/Loader";
import Todo from "../../../components/user/todos/Todo";

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
        <>
          <Text style={styles.title}>My Todos</Text>
          <FlatList
            data={todosState.todos}
            renderItem={({ item }) => <Todo todo={item} />}
            keyExtractor={(item) => item.TodoId}
          />
        </>
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
  title: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "700",
  },
  loader: {
    justifyContent: "center",
    flex: 1,
  },
});

export default Todos;
