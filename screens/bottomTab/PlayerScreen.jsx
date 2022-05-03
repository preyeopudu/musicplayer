import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function PlayerScreen() {
  const reduxData = useSelector((s) => s);
  const musicList = reduxData.music;

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  audioTitle: {
    paddingVertical: 20,
    backgroundColor: "pink",
  },
});
