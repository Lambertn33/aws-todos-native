import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const todosEndpoint =
  "https://13a6hexnsj.execute-api.eu-north-1.amazonaws.com/dev/todos";

const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

export async function getTodosHelper() {
  const token = await getToken();
  const response = await axios.get(todosEndpoint, {
    headers: {
      Authorization: token,
    },
  });
  return await response.data;
}

export async function deleteTodoHelper(todoId) {
  const token = await getToken();
  const response = await axios.delete(`${todosEndpoint}/${todoId}`, {
    headers: {
      Authorization: token,
    },
  });
  return await response.data;
}
