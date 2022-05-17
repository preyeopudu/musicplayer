import React, { useEffect, useState, useContext, useRef } from "react";
import { Text, View, TouchableOpacity, Image, BackHandler } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import MarqueeText from "react-native-marquee";
import ConvertTime from "../../utility/ConvertTime";
import store from "../../store";
import { SetCurrent } from "../../store/actions/SetCurrent";
import { useDispatch } from "react-redux";
import { useMusic, useMusicUpate, useSound } from "../../hooks/MusicContext";
import { playerScreenStyles as styles } from "../styles/playerScreen";

export default function PlayerScreen({ route }) {
  const { item } = route.params;
  const [play, setPlay] = useState(false);
  const { goBack } = useNavigation();
  const currentItem = store.getState().current;
  const dispatch = useDispatch();
  const sound = useSound();
  const music = useMusic();
  const setMusic = useMusicUpate();

  const UpdateStatus = async () => {
    try {
      let status = await sound.getStatusAsync();
      setMusic(status);
      if (status.positionMillis == status.durationMillis) {
        await sound.stopAsync();
      }
    } catch (error) {
      console.log("error occurred");
    }
  };

  const LoadAudio = async () => {
    const status = await sound.getStatusAsync();
    if (status.isLoaded == true) {
      sound.setOnPlaybackStatusUpdate(UpdateStatus);
    }
  };

  const HandlePlayPause = async () => {
    let status = await sound.getStatusAsync();
    setPlay(!play);
    if (play == false) {
      dispatch(SetCurrent(item));
      if (status.isLoaded == true && currentItem != item) {
        console.log(1);
        await sound.unloadAsync();
        console.log(2);
        await sound.loadAsync({ uri: item.uri });
        console.log(3);
        await sound.playAsync();
        console.log(4);
        // LoadAudio(); //start music
      } else {
        if (status.isLoaded == false) {
          await sound.loadAsync({ uri: item.uri });
          console.log(5);
        }
        await sound.playAsync();
        // LoadAudio(); //play music
      }
    } else if (play == true) {
      sound.pauseAsync();
    }
  };

  let progress = (music.positionMillis / music.durationMillis) * 100;

  if (currentItem != item || isNaN(progress)) {
    progress = 0;
  }

  // useEffect(() => {
  //   const Run = async () => {
  //     const status = await sound.getStatusAsync();
  //     if (status.isLoaded == true) {
  //       sound.setOnPlaybackStatusUpdate(UpdateStatus);
  //     }
  //   };
  //   if (play == true) {
  //     Run();
  //   }
  // }, [play]);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            goBack();
          }}
        >
          <Entypo name="chevron-down" size={20} color="#808080" />
        </TouchableOpacity>
        <MarqueeText
          numberOfLines={1}
          style={styles.audioTitle}
          speed={0.8}
          marqueeOnStart={true}
          loop={true}
          delay={1000}
        >
          {route.params.item.filename}
        </MarqueeText>

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
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderText}>
            {ConvertTime(route.params.item.duration / 6000)}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            value={progress}
            onSlidingStart={() => {
              Pause();
              console.log(1);
            }}
            onSlidingComplete={(data) => SeekUpdate(data, duration)}
            minimumTrackTintColor={"dodgerblue"}
            step={1}
          />
          <Text style={styles.sliderText}>
            {ConvertTime(route.params.item.duration / 60)}
          </Text>
        </View>

        <View style={styles.controller}>
          <View style={[styles.button]}>
            <AntDesign name="stepbackward" size={15} color="#808080" />
          </View>

          <TouchableOpacity
            style={[styles.button, { width: 45, height: 45 }]}
            onPress={HandlePlayPause}
          >
            <AntDesign
              name={play == true ? "pause" : "caretright"}
              size={24}
              color="#808080"
            />
          </TouchableOpacity>

          <View style={[styles.button]}>
            <AntDesign name="stepforward" size={15} color="#808080" />
          </View>
        </View>
      </View>
    </View>
  );
}
