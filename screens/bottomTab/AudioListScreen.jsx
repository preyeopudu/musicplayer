import React, { useEffect, useState } from "react";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import ConvertTime from "../../utility/ConvertTime";
import { Entypo } from "@expo/vector-icons";
import BottomModal from "../../components/BottomModal";
import { useNavigation } from "@react-navigation/native";
import { useCurrentUpdate, useMusicList } from "../../hooks/AppContext";
import { useSound } from "../../hooks/MusicContext";

export default function AudioListScreen() {
  const musicList = useMusicList();
  const [visible, setVisible] = useState(false);
  const { navigate } = useNavigation();
  const setCurrent = useCurrentUpdate();
  const sound = useSound();

  const openModal = async (val) => {
    setVisible(true);
  };

  const HandleClick = async (item) => {
    let status = await sound.current.getStatusAsync();
    if (status.isLoaded == true) {
      await sound.current.unloadAsync();
    }
    navigate("player", { item: item });
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
            onPress={() => HandleClick(item)}
            activeOpacity={0.9}
            // onPress={() => {
            //   PlayAudio(item.uri);
            // }}
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
              <TouchableOpacity onPress={() => openModal(item)}>
                <Entypo name="dots-three-vertical" size={20} color="#808080" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
      <BottomModal
        item={null}
        visible={visible}
        setVisible={setVisible}
        onPlay={() => PlaySong(currentItem)}
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
