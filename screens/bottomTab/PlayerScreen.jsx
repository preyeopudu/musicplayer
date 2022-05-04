import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import Slider from "@react-native-community/slider";
import { Pause, Play, SeekUpdate, Start } from "../../utility/AudioController";
import { useNavigation } from "@react-navigation/native";
import MarqueeText from "react-native-marquee";
import { SetCurrent } from "../../store/actions/SetCurrent";
import { SetInfo } from "../../store/actions/SetInfo";

export default function PlayerScreen({ route }) {
  let reduxData = useSelector((s) => s);
  let currentItem = reduxData.current;
  let musicInfo = reduxData.info;

  const dispatch = useDispatch();
  const [play, setPlay] = useState(false);

  const HandlePlay = async (item) => {
    if (item == currentItem) {
      if (musicInfo.isPlaying == true) {
        setPlay(true);
        Pause();
      } else if (play == false) {
        setPlay(true);
        dispatch(SetInfo(await Play(item)));
        dispatch(SetCurrent(item));
      }
    } else {
      dispatch(SetInfo(await Start(item)));
      dispatch(SetCurrent(item));
    }
    if (play == true) {
      Pause();
      setPlay(false);
    } else if (play == false) {
      setPlay(true);
      dispatch(SetInfo(await Play(item)));
      dispatch(SetCurrent(item));
    }
  };

  useEffect(() => {
    console.log(musicInfo);
    console.log(currentItem);
    if (route.params.item == currentItem && musicInfo.isPlaying == true) {
      setPlay(true);
    }
  }, []);

  const { navigate, goBack } = useNavigation();
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
        <Slider
          style={{ width: "90%", alignSelf: "center" }}
          minimumValue={0}
          maximumValue={100}
          value={30}
          onSlidingComplete={(data) => SeekUpdate(data)}
          minimumTrackTintColor={"dodgerblue"}
        />
        <View style={styles.controller}>
          <View style={[styles.button]}>
            <AntDesign name="stepbackward" size={15} color="#808080" />
          </View>
          <TouchableOpacity
            style={[styles.button, { width: 45, height: 45 }]}
            onPress={() => HandlePlay(route.params.item)}
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
});
