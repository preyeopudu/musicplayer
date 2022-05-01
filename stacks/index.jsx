import React, { useEffect } from "react";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./BottomTab";
import * as MediaLibrary from "expo-media-library";

const IndexStack = () => {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
};

export default IndexStack;
