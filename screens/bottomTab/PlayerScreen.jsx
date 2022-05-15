import React, { useEffect, useState, useContext, useRef } from "react";
import { Text, View, TouchableOpacity, Image, BackHandler } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import MarqueeText from "react-native-marquee";
import ConvertTime from "../../utility/ConvertTime";
import store from "../../store";
import { SetCurrent } from "../../store/actions/SetCurrent";
import { OnScreen } from "../../store/actions/SetOnScreen";
import { SetPlaying } from "../../store/actions/SetPlaying";
import { useSelector, useDispatch } from "react-redux";
import { useMusic, useMusicUpate, useSound } from "../../hooks/MusicContext";
import { playerScreenStyles as styles } from "../styles/playerScreen";
import { Audio } from "expo-av";

export default function PlayerScreen({ route }) {
  const { item } = route.params;
  const [play, setPlay] = useState(false);
  const [Value, SetValue] = useState(0);
  const [onCurrent, SetOncurrent] = useState(false);
  const [isPlaying, SetIsPlaying] = useState(false);
  const { goBack } = useNavigation();
  const currentItem = store.getState().current;
  const dispatch = useDispatch();
  const sound = useSound();
  const music = useMusic();
  const setMusic = useMusicUpate();

  const Play = async () => {
    let status = await sound.getStatusAsync();
    if (item != currentItem) {
      await sound.unloadAsync();
      await sound.loadAsync({ uri: item.uri });
    }
    dispatch(SetCurrent(item));
    setPlay(true);
    await sound.playAsync();
  };

  // const Start = async () => {
  //   sound.unloadAsync(() => console.log("unloading"));
  //   await sound.loadAsync({ uri: item.uri });
  //   const status = await sound.getStatusAsync();
  //   console.log(status);
  //   if (status.isLoaded == true) {
  //     await sound.playAsync();
  //   }
  //   dispatch(SetCurrent(item));
  // };

  const Pause = async () => {
    try {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        if (status.isPlaying === true) {
          sound.pauseAsync();
          setPlay(false);
        }
      }
    } catch (error) {
      setPlay(true);
    }
  };
  useEffect(() => {
    // const UpdateStatus = async () => {
    //   try {
    //     let status = await sound.current.getStatusAsync();
    //     setMusic(status);
    //     if (status.positionMillis == status.durationMillis) {
    //       await sound.current.stopAsync();
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // const update = async () => {
    //   if ((await sound.current.getStatusAsync().isLoaded) !== false) {
    //     sound.current.setOnPlaybackStatusUpdate(() => UpdateStatus());
    //   }
    // };
    // if (play == true) {
    //   update().catch(console.error);
    // }
  }, [play]);

  useEffect(() => {
    if (item == currentItem) {
      SetOncurrent(true);
      if (music.isPlaying) {
      }
    }
  }, [play]);

  let progress = (music.positionMillis / music.durationMillis) * 100;

  if (currentItem != item || isNaN(progress)) {
    progress = 0;
  }

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
            {ConvertTime((Value * route.params.item.duration) / 6000)}
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

          {play == false ? (
            <TouchableOpacity
              style={[styles.button, { width: 45, height: 45 }]}
              onPress={Play}
            >
              <AntDesign name="caretright" size={24} color="#808080" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, { width: 45, height: 45 }]}
              onPress={Pause}
            >
              <AntDesign name="pause" size={24} color="#808080" />
            </TouchableOpacity>
          )}

          <View style={[styles.button]}>
            <AntDesign name="stepforward" size={15} color="#808080" />
          </View>
        </View>
      </View>
    </View>
  );
}
