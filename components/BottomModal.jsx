import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

const config = {
  velocityThreshold: 0.0,
  directionalOffsetThreshold: 80,
};

const BottomModal = ({ visible, setVisible }) => {
  return (
    <View>
      <StatusBar hidden />
      <GestureRecognizer
        onSwipeDown={() => setVisible(false)}
        config={config}
        style={{ bottom: 0, flex: 1 }}
      >
        <Modal transparent visible={visible} animationType="slide">
          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
            <View style={styles.container}>
              <View style={styles.modalContainer}>
                <Text style={styles.title}>music_title.mp3</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.buttonContainer}
                >
                  <Text style={styles.buttonText}>Play</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.buttonContainer}
                >
                  <Text style={styles.buttonText}>Add to Playlist</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </GestureRecognizer>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(1,1,1,0.2)",
  },
  modalContainer: {
    bottom: 0,
    position: "absolute",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 5,
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
  },
  title: {
    marginVertical: 10,
    fontSize: "18@s",
    color: "#686868",
  },
  buttonText: {
    fontSize: "18@s",
    marginVertical: 10,
  },
});

export default BottomModal;
