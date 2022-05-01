import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import * as Linking from "expo-linking";
import * as MediaLibrary from "expo-media-library";

export default function PlayerScreen() {
  const [audioFiles, setAudioFiles] = useState([]);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const getPermission = async () => {
    const permission = await requestPermission();
    console.log(permission);

    if (permission.granted) {
      // we want to get all the audio files
      getAudioFiles();
    }

    if (!permission.canAskAgain && !permission.granted) {
      Linking.openSettings();
      console.log("user denied and we can't ask again");
    }

    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();

      if (status === "denied" && canAskAgain) {
        console.log("you can ask again");
        //   we are going to display alert that user must allow this permission to work this app
        // permissionAllert();
      }

      if (status === "granted") {
        //    we want to get all the audio files
        getAudioFiles();
      }

      if (status === "denied" && !canAskAgain) {
        console.log("you can never ask again");
        //   we want to display some error to the user
      }
    }
  };

  const getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    console.log(media);

    media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: media.totalCount,
    });

    setAudioFiles(media.assets);
  };

  useEffect(() => {
    getPermission();
  }, []);

  return (
    <FlatList
      data={audioFiles}
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
