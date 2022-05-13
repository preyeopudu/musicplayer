import React, { useEffect, useState, useContext } from "react";
import { Text, View, TouchableOpacity, Image, BackHandler } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import MarqueeText from "react-native-marquee";
import ConvertTime from "../../utility/ConvertTime";
import {
  LoadAudio,
  Pause,
  Play,
  SeekUpdate,
  Start,
} from "../../utility/AudioController";
import store from "../../store";
import { OffScreen, OnScreen } from "../../store/actions/SetOnScreen";
import { SetPlaying } from "../../store/actions/SetPlaying";
import { useSelector } from "react-redux";
import { PlayerContext } from "../../hooks/PlayerReducer";
import { playerScreenStyles as styles } from "../styles/playerScreen";

export default function PlayerScreen({ route }) {
  const data = useSelector((s) => s);
  // const { info, music, current } = data;
  const [play, setPlay] = useState(false);
  const [duration, SetDuration] = useState(0);
  const [Value, SetValue] = useState(0);
  const { goBack } = useNavigation();
  const currentItem = store.getState().current;
  // const { durationMillis, positionMillis } = info;
  const { item } = route.params;

  const { music, setMusic } = useContext(PlayerContext);
  console.log(music.positionMillis);

  useEffect(() => {
    store.dispatch(SetPlaying(false));
    store.dispatch(OnScreen());
    if (item == currentItem && musicInfo.isPlaying == true) {
      //checks if on new screen and a song is playing
      setPlay(true);
    }
  }, []);

  let progress = 0;
  if (isNaN(progress)) {
    progress = 0;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            HandleGoBack();
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
          {play ? (
            <TouchableOpacity
              style={[styles.button, { width: 45, height: 45 }]}
              // onPress={() => HandleAudio()}
            >
              <AntDesign name="pause" size={22} color="#808080" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, { width: 45, height: 45 }]}
              onPress={() => {
                Play(item, setMusic);
              }}
            >
              <AntDesign name="caretright" size={24} color="#808080" />
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
