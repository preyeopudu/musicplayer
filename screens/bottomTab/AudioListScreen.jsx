import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function AudioListScreen() {
  const reduxData = useSelector((s) => s);
  const musicList = reduxData.music;

  return (
    <FlatList
      data={musicList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Text style={styles.audioTitle}>{item.filename}</Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  audioTitle: {
    textAlign: "center",
    paddingVertical: 20,
    backgroundColor: "pink",
  },
});
