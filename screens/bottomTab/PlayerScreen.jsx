import React, { useEffect, useState, useContext, useRef } from "react";
import { Text, View, TouchableOpacity, Image, BackHandler } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import MarqueeText from "react-native-marquee";
import ConvertTime from "../../utility/ConvertTime";
import {
  useCurrent,
  usePlaying,
  usePlayingUpdate,
} from "../../hooks/AppContext";
import { useIsplaying, usePlayPause, useSound } from "../../hooks/MusicContext";
import { playerScreenStyles as styles } from "../styles/playerScreen";

export default function PlayerScreen({ route }) {
  const { item } = route.params;
  const [play, setPlay] = useState(false);
  const { goBack } = useNavigation();
  const isPlaying = useIsplaying();
  const music = usePlaying();
  const sound = useSound();
  const current = useCurrent();
  const HandlePlayPause = usePlayPause();
  const setPlaying = usePlayingUpdate();
  let position = 0;
  if (music && music.positionMillis) {
    position = (music.positionMillis / music.durationMillis) * 100;
  }

  const ResetPlayer = async () => {
    await sound.current.stopAsync();
    await sound.current.unloadAsync();
  };

  const SeekUpdate = async (data) => {
    const status = await sound.current.getStatusAsync();
    if (status.isLoaded == false) {
      return null;
    } else {
      try {
        const checkLoading = await sound.current.getStatusAsync();
        if (checkLoading.isLoaded === true) {
          const result = (data / 100) * music.durationMillis;
          await sound.current.setPositionAsync(Math.round(result));
          await sound.current.playAsync();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const Pause = async () => {
    const status = await sound.current.getStatusAsync();
    if (status.isLoaded == false) {
      return null;
    } else {
      sound.current.pauseAsync();
    }
  };

  const Play = async () => {
    let status = await sound.current.getStatusAsync();
    if (status.isLoaded == false) {
      await sound.current.loadAsync({ uri: item.uri });
    } else if (status.isLoaded == true) {
      await sound.current.unloadAsync();
      await sound.current.loadAsync({ uri: item.uri });
    }
    await sound.current.playAsync();
    sound.current.setOnPlaybackStatusUpdate(UpdateStatus);
  };

  const UpdateStatus = async (data) => {
    try {
      setPlaying(data);
      if (data.didJustFinish) {
        ResetPlayer();
      } else if (data.positionMillis) {
        if (data.durationMillis) {
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    position = 0;
    Play();
  }, []);

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
          {current.filename}
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
            {music && music.positionMillis
              ? ConvertTime(music.positionMillis / 60000)
              : ConvertTime(0)}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            value={position}
            onSlidingStart={() => {
              Pause();
            }}
            onSlidingComplete={(data) => SeekUpdate(data)}
            minimumTrackTintColor={"dodgerblue"}
            step={1}
          />
          <Text style={styles.sliderText}>
            {ConvertTime(current.duration / 60)}
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
              name={isPlaying == true ? "pause" : "caretright"}
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
