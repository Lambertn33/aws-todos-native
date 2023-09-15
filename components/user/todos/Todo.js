import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Todo = ({ todo }) => {
  return (
    <View style={styles.todo}>
      <View>
        <Text style={styles.title}>{todo.Title}</Text>
        <Text style={styles.description}>{todo.Description}</Text>
      </View>
      <View style={styles.todoActions}>
        <Ionicons name="pencil" size={24} color="black" />
        <Ionicons name="trash" size={24} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todo: {
    backgroundColor: "white",
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
    elevation: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  description: {
    fontSize: 15,
    fontWeight: "400",
  },
  todoActions: {
    flexDirection: "row",
    gap: 4,
  },
});
export default Todo;
