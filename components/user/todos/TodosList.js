import { View, Text, FlatList, StyleSheet } from "react-native";
import Todo from "./Todo";

const TodosList = ({ todos, onDeleteTodo }) => {
  return (
    <View>
      <Text style={styles.title}>My Todos</Text>
      {todos.length > 0 ? (
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <Todo todo={item} onDeleteTodo={onDeleteTodo} />
          )}
          keyExtractor={(item) => item.TodoId}
        />
      ) : (
        <Text style={styles.emptyTodos}>
          You have no todo.. please create one
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "700",
  },
  emptyTodos: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default TodosList;
