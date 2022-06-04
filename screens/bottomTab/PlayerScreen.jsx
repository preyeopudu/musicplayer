import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image, Alert } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import MarqueeText from "react-native-marquee";
import ConvertTime from "../../utility/ConvertTime";
import {
  useCurrent,
  useCurrentUpdate,
  useMusicList,
  usePlaying,
  usePlayingUpdate,
} from "../../hooks/AppContext";
import {
  useIsplaying,
  useIsPlayingUpdate,
  useSound,
} from "../../hooks/MusicContext";
import { playerScreenStyles as styles } from "../styles/playerScreen";

export default function PlayerScreen({ route }) {
  const { item } = route.params;
  const [play, setPlay] = useState(false);
  const { goBack, navigate } = useNavigation();
  const isPlaying = useIsplaying();
  const music = usePlaying();
  const sound = useSound();
  const current = useCurrent();
  const setIsPlaying = useIsPlayingUpdate();
  const setPlaying = usePlayingUpdate();
  const setCurrent = useCurrentUpdate();
  const musicList = useMusicList();
  let position = 0;
  if (music && music.positionMillis) {
    position = (music.positionMillis / music.durationMillis) * 100;
  }

  const Skip = () => {
    let index = musicList.indexOf(item);
    if (index + 1 >= musicList.length) {
      index = -1;
    }
    const next = musicList[index + 1];

    navigate("player", { item: next });
  };

  const ResetPlayer = async () => {
    await sound.current.stopAsync();
    await sound.current.unloadAsync();
    setIsPlaying(false);
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
      setIsPlaying(false);
    }
  };

  const Play = async () => {
    let status = await sound.current.getStatusAsync();
    if (status.isLoaded == false) {
      await sound.current.loadAsync({ uri: item.uri });
    } else if (status.isLoaded == true) {
      if (current != item) {
        await sound.current.unloadAsync();
        await sound.current.loadAsync({ uri: item.uri });
      }
    }
    setCurrent(item);
    setIsPlaying(true);
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
    } catch (error) {}
  };

  useEffect(() => {
    console.log(item);
    position = 0;
    Play();
  }, [item]);

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
        <Text
          numberOfLines={1}
          style={styles.audioTitle}
          speed={0.8}
          marqueeOnStart={true}
          loop={true}
          delay={1000}
        >
          {item.filename}
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
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderText}>
            {music && music.positionMillis
              ? ConvertTime(music.positionMillis / 60000)
              : ConvertTime(0)}
          </Text>
          <Slider
            style={styles.slider}
            value={position}
            minimumValue={0}
            maximumValue={100}
            onSlidingComplete={(data) => SeekUpdate(data)}
            minimumTrackTintColor={"dodgerblue"}
            step={1}
          />
          <Text style={styles.sliderText}>
            {ConvertTime(item.duration / 60)}
          </Text>
        </View>

        <View style={styles.controller}>
          <View style={[styles.button]}>
            <AntDesign name="stepbackward" size={15} color="#808080" />
          </View>

          <TouchableOpacity style={[styles.button, { width: 45, height: 45 }]}>
            <AntDesign
              name={isPlaying == true ? "pause" : "caretright"}
              onPress={isPlaying == true ? Pause : Play}
              size={24}
              color="#808080"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={Skip} style={[styles.button]}>
            <AntDesign name="stepforward" size={15} color="#808080" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
