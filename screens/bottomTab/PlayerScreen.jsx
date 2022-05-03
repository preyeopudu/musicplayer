import { StatusBar } from "expo-status-bar";
import React, { useRef, useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";

export default function PlayerScreen() {
  const reduxData = useSelector((s) => s);
  const musicList = reduxData.music;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text numberOfLines={1} style={styles.audioTitle}>
          Someone you loved.mp3
        </Text>
        <TouchableOpacity onPress={() => {}}>
          <Entypo name="dots-three-vertical" size={18} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/images/dj.png")}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.controller}>
          <View style={[styles.button]}>
            <AntDesign name="stepbackward" size={18} color="#808080" />
          </View>
          <View style={[styles.button, { width: 55, height: 55 }]}>
            <AntDesign name="caretright" size={22} color="#808080" />
          </View>
          <View style={[styles.button]}>
            <AntDesign name="stepforward" size={18} color="#808080" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  audioTitle: {
    fontSize: "16@s",
    fontWeight: "900",
    width: "60%",
    color: "black",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "15@s",
    elevation: 4,
    backgroundColor: "#fff",
    paddingVertical: "15@s",
    alignItems: "center",
  },
  imageContainer: {
    height: "200@s",
    width: "200@s",
    backgroundColor: "#fff",
    elevation: 4,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  image: {
    height: "120@s",
    width: "120@s",
    alignSelf: "center",
  },
  body: {
    flex: 1,
    justifyContent: "center",
  },
  footer: {
    paddingBottom: "20@vs",
  },
  button: {
    borderRadius: 100,
    borderWidth: 0.5,
    width: "40@s",
    height: "40@s",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#808080",
  },
  controller: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
