import React, { useEffect, useState } from "react";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { useSelector } from "react-redux";
import ConvertTime from "../../utility/ConvertTime";
import { Audio } from "expo-av";

export default function AudioListScreen() {
  const reduxData = useSelector((s) => s);
  const musicList = reduxData.music;

  const PlayAudio = async (audio) => {
    const { sound: playbackObject } = await Audio.Sound.createAsync(
      { uri: audio },
      { shouldPlay: true }
    );
  };

  return (
    <FlatList
      style={{ backgroundColor: "#fff" }}
      data={musicList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            PlayAudio(item.uri);
          }}
          style={{
            backgroundColor: "#fff",
            elevation: 10,
            marginVertical: 5,
            borderRadius: 10,
            paddingVertical: 10,
            marginHorizontal: 10,
          }}
        >
          <View style={styles.audioContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/images/music.png")}
                style={{ width: 25, height: 25 }}
              />
            </View>
            <View>
              <Text style={styles.audioTitle} numberOfLines={1}>
                {item.filename.substring(0, 39)}
              </Text>
            </View>
          </View>
          <Text style={styles.audioLength}>
            {ConvertTime(item.duration / 60)}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  audioContainer: {
    flexDirection: "row",
    marginHorizontal: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  audioStart: {
    padding: 30,
  },
  audioTitle: {
    marginVertical: 5,
    width: "240@s",
  },
  imageContainer: {
    borderRadius: 100,
    backgroundColor: "#000",
    padding: 5,
    marginHorizontal: 10,
  },
  audioLength: {
    fontSize: 10,
    textAlign: "right",
    right: 15,
  },
});
