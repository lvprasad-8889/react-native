import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions, Image, Text } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const FullImageScreen = ({ route }) => {
  const { name, imageUrl } = route.params;
  const navigation = useNavigation();
  return (
    <ImageViewer
      enableSwipeDown
      onSwipeDown={() => navigation.goBack()}
      saveToLocalByLongPress={true}
      imageUrls={[{ url: imageUrl }]}
      enablePreload
      backgroundColor="white"
      style={styles.imageViewerContainer}
      renderHeader={(props) => (
        <View style={styles.renderContainer}>
          <Image {...props} style={styles.image} />
          <Text style={[styles.title]}>{name}</Text>
        </View>
      )}
    ></ImageViewer>
  );
};

const styles = StyleSheet.create({
  imageViewerContainer: {},
  renderContainer: {
    position: "relative",
  },
  image: {
    width: screenWidth,
  },
  title: {
    fontSize: 16,
    width: screenWidth,
    position: "absolute",
    textAlign: "center",
    fontWeight: "bold",
    top: screenHeight / 4 + 10,
    padding: 4,
    backgroundColor: "white",
  },
});

export default FullImageScreen;
