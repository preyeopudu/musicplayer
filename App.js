import { StyleSheet, Text, View, StatusBar } from "react-native";
import IndexStack from "./stacks/index";
import { Provider } from "react-redux";
import store from "./store/index";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <IndexStack />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
  },
});
