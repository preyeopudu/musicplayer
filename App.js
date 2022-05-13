import { StyleSheet, Text, View, StatusBar } from "react-native";
import { useState } from "react";
import IndexStack from "./stacks/index";
import { Provider } from "react-redux";
import store from "./store/index";
import { PlayerContext } from "./hooks/PlayerReducer";

export default function App() {
  const [music, setMusic] = useState({});
  return (
    <PlayerContext.Provider value={{ music, setMusic }}>
      <Provider store={store}>
        <View style={styles.container}>
          <IndexStack />
        </View>
      </Provider>
    </PlayerContext.Provider>
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
