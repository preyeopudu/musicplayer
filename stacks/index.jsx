import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./BottomTab";
import * as MediaLibrary from "expo-media-library";
import * as Linking from "expo-linking";
import { useMusicListUpdate } from "../hooks/AppContext";
const IndexStack = () => {
  const SetList = useMusicListUpdate();
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const getPermission = async () => {
    const permission = await requestPermission();

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
        getPermission();
        //   we are going to display alert that user must allow this permission to work this app
        // permissionAllert();
      }

      if (status === "granted") {
        //    we want to get all the audio files
        getAudioFiles();
      }

      if (status === "denied" && !canAskAgain) {
        Linking.openSettings();
        console.log("you can never ask again");
        //   we want to display some error to the user
      }
    }
  };

  const getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    // console.log(media);

    media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: media.totalCount,
    });
    SetList(media.assets);
  };

  useEffect(() => {
    getPermission();
  }, []);
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
};

export default IndexStack;
