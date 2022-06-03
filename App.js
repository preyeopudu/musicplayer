import { StyleSheet, Text, View, StatusBar } from "react-native";
import IndexStack from "./stacks/index";

import { MusicProvider } from "./hooks/MusicContext";
import { AppProvider } from "./hooks/AppContext";

export default function App() {
  return (
    <AppProvider>
      <MusicProvider>
        <View style={styles.container}>
          <IndexStack />
        </View>
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
