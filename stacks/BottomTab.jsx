import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AudioListScreen from "../screens/bottomTab/AudioListScreen";
import PlayerScreen from "../screens/bottomTab/PlayerScreen";
import PlaylistScreen from "../screens/bottomTab/PlaylistScreen";

import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      activeColor="#ff5f96"
      inactiveColor="#ff5f96"
      initialRouteName="player"
      screenOptions={{
        tabBarColor: "#ff5f96",
        headerShown: false,
        tabBarStyle: {
          height: 60,
        },
      }}
      barStyle={{ backgroundColor: "#ffff" }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "AudioList",
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-headset" size={24} color={color} />
          ),
        }}
        name="audiolist"
        component={AudioListScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Player",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="compact-disc" size={24} color={color} />
          ),
        }}
        name="player"
        component={PlayerScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Playlist",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="my-library-music" size={24} color={color} />
          ),
        }}
        name="playlist"
        component={PlaylistScreen}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
