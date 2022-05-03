import { createStackNavigator } from "@react-navigation/stack";
import AudioListScreen from "../screens/bottomTab/AudioListScreen";
import PlayerScreen from "../screens/bottomTab/PlayerScreen";
import PlaylistScreen from "../screens/bottomTab/PlaylistScreen";

const Stack = createStackNavigator();

function AudioStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="audiolists"
    >
      <Stack.Screen component={AudioListScreen} name="audiolists" />
      <Stack.Screen component={PlayerScreen} name="player" />
      <Stack.Screen component={PlaylistScreen} name="playlist" />
    </Stack.Navigator>
  );
}

export default AudioStack;
