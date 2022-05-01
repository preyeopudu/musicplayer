import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { useSelector } from "react-redux";
import ConvertTime from "../../utility/ConvertTime";
import { Audio } from "expo-av";
import { Entypo } from "@expo/vector-icons";
import BottomModal from "../../components/BottomModal";

export default function AudioListScreen() {
  const [visible, setVisible] = useState(false);
  const reduxData = useSelector((s) => s);
  const musicList = reduxData.music;

  const openModal = () => {
    setVisible(true);
  };

  const PlayAudio = async (audio) => {
    // const { sound: playbackObject } = await Audio.Sound.createAsync(
    //   { uri: audio },
    //   { shouldPlay: true }
    // );
  };

  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#fff" }}
        data={musicList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
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
              <View style={styles.textContainer}>
                <Text style={styles.audioTitle} numberOfLines={1}>
                  {item.filename.substring(0, 39)}
                </Text>
                <Text style={styles.audioLength}>
                  {ConvertTime(item.duration / 60)}
                </Text>
              </View>
              <TouchableOpacity onPress={() => openModal()}>
                <Entypo name="dots-three-vertical" size={20} color="#808080" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
      <BottomModal
        visible={visible}
        setVisible={setVisible}
        onPlay={PlayAudio}
      />
    </View>
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
    marginHorizontal: 2,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  audioStart: {
    padding: 30,
  },
  audioTitle: {
    marginVertical: 5,
  },
  imageContainer: {
    borderRadius: 100,
    backgroundColor: "#000",
    padding: 5,
    marginRight: "15@s",
  },
  audioLength: {
    fontSize: 10,
    color: "#808080",
  },
  textContainer: {
    width: "220@s",
  },
});
