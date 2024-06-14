import React from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
const { width } = Dimensions.get("window");

const ImageOverlay = ({
  blurRadius,
  children,
  containerStyle,
  contentPosition = "center",
  height = 300,
  overlayAlpha = 0.5,
  overlayColor = "#000000",
  rounded,
  source,
  title,
  titleStyle,
}) => {
  let justifyContent = "center";
  let alignItems = "center";
  if (contentPosition === "top") {
    justifyContent = "flex-start";
  } else if (contentPosition === "bottom") {
    justifyContent = "flex-end";
  } else if (contentPosition === "bottom-left") {
    justifyContent = "flex-end";
    alignItems = "flex-start";
  }

  return (
    <ImageBackground
      source={source}
      style={[
        styles.image,
        {
          borderRadius: rounded ?? 0,
          height,
          justifyContent,
          alignItems,
        },
        containerStyle,
      ]}
      blurRadius={blurRadius}
    >
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity: overlayAlpha,
        }}
      />
      {!children && title && (
        <LinearGradient
          colors={["rgba(27, 30, 36, 0) 0%","rgb(27, 30, 36) 84.21%" ]}
          style={styles.titleContainer}
        >
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        </LinearGradient>
      )}
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width,
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: "none",
  },
  title: {
    margin: 5,
    color: "white",
    textAlign: "start",
    fontWeight: 800,
    fontSize: 20,
    lineHeight: 22,
    letterSpacing: -0.5,
    color: "#ffffffeb",
    overflowWrap: "break-word",
  },
  titleContainer: {
    width: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default ImageOverlay;
