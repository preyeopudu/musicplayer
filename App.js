import { StyleSheet, Text, View, StatusBar } from "react-native";
import IndexStack from "./stacks/index";
import { Provider } from "react-redux";
import store from "./store/index";
import { MusicProvider } from "./hooks/MusicContext";

export default function App() {
  return (
    <MusicProvider>
      <Provider store={store}>
        <View style={styles.container}>
          <IndexStack />
        </View>
      </Provider>
    </MusicProvider>
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
