import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const PlayerScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Player</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlayerScreen;
