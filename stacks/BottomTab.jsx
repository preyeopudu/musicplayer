import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AudioListScreen from "../screens/bottomTab/AudioListScreen";
import PlayerScreen from "../screens/bottomTab/PlayerScreen";
import PlaylistScreen from "../screens/bottomTab/PlaylistScreen";

import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      activeColor="black"
      inactiveColor="gray"
      screenOptions={{ tabBarColor: "black" }}
      barStyle={{ backgroundColor: "#ffff" }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "AudioList",
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-headset" size={24} color="black" />
          ),
        }}
        name="audiolist"
        component={AudioListScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "AudioList",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="compact-disc" size={24} color="black" />
          ),
        }}
        name="player"
        component={PlayerScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "AudioList",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="my-library-music" size={24} color="black" />
          ),
        }}
        name="playlist"
        component={PlaylistScreen}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
