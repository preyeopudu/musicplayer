import React, { useEffect, useState } from "react";
import { Modal, View, Text } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

const BottomModal = () => {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={StyleSheet.container}>
        <Text>music_title.mp3</Text>
      </View>
    </Modal>
  );
};
