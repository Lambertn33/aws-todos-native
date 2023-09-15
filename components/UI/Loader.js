import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Loader = () => {
  return <ActivityIndicator size={80} color={GlobalStyles.colors.primary} />;
};

const styles = StyleSheet.create({});
export default Loader;
