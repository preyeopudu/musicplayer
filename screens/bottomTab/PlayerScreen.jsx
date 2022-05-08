import React, { useEffect, useState } from "react";
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

export default function PlayerScreen({ route }) {
  const [play, setPlay] = useState(false);
  const [duration, SetDuration] = useState(0);
  const [Value, SetValue] = useState(0);
  const { goBack } = useNavigation();
  const currentItem = store.getState().current;
  const musicInfo = store.getState().info;
  const { item } = route.params;
  BackHandler.addEventListener("hardwareBackPress", () => {
    store.dispatch(OffScreen());
  });

  const HandleGoBack = () => {
    store.dispatch(OffScreen());
    goBack();
  };

  useEffect(() => {
    store.dispatch(SetPlaying(false));
    store.dispatch(OnScreen());
    if (item == currentItem && musicInfo.isPlaying == true) {
      //checks if on new screen and a song is playing
      setPlay(true);
    }
  }, []);
  let progress = (duration / currentItem.duration) * 100;
  if (isNaN(progress)) {
    progress = 0;
  }

  const HandleAudio = () => {
    SetPlaying(!play);
    setPlay(!play);
    if (item != currentItem && musicInfo.isLoaded == true) {
      //check if a music was being played
      if (musicInfo.isPlaying == true && play == true) {
        setPlay(false);
        SetPlaying(false);
        Pause(item);
      } else if (play == false) {
        SetPlaying(true);
        setPlay(true);
        Start(item, SetValue, play, setPlay);
      } else if (play == true) {
        Pause(item);
      }
    } else {
      if (play == false) {
        Play(item, SetValue, play, setPlay);
      } else if (play == true) {
        Pause(item);
      }
    }
    LoadAudio();
  };

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
            value={Value}
            onValueChange={(data) => SeekUpdate(data, duration)}
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
            onPress={() => HandleAudio()}
          >
            {play ? (
              <AntDesign name="pause" size={22} color="#808080" />
            ) : (
              <AntDesign name="caretright" size={24} color="#808080" />
            )}
          </TouchableOpacity>
          <View style={[styles.button]}>
            <AntDesign name="stepforward" size={15} color="#808080" />
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
    width: "70%",
    color: "#808080",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "15@s",
    backgroundColor: "#fff",
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
    width: "35@s",
    height: "35@s",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#808080",
  },
  controller: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: "20@vs",
    paddingBottom: "5@vs",
  },
  sliderContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: "15@vs",
  },
  slider: {
    width: "200@s",
  },
  sliderText: {
    fontSize: "12@s",
    color: "#808080",
  },
});
