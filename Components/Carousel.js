import React from "react";
import { View, StyleSheet } from "react-native";

const Carousel = ({ children }) => {
  return <View style={styles.categoryContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  categoryContainer: {
    marginVertical: 15,
  },
});

export default Carousel;
