import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const PlaylistScreen = () => {
  return (
    <View style={styles.container}>
      <Text>PlayList</Text>
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

export default PlaylistScreen;
