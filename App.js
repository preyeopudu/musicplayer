import { StyleSheet, Text, View, StatusBar } from "react-native";
import IndexStack from "./stacks/index";
import { Provider } from "react-redux";
import store from "./store/index";
import { MusicProvider } from "./hooks/MusicContext";
import { AppProvider } from "./hooks/AppContext";

export default function App() {
  return (
    <AppProvider>
      <MusicProvider>
        <Provider store={store}>
          <View style={styles.container}>
            <IndexStack />
          </View>
        </Provider>
      </MusicProvider>
    </AppProvider>
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
