import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./BottomTab";

const IndexStack = () => {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
};

export default IndexStack;
