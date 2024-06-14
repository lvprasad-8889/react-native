import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";

const AnimatedSearch = () => {
  const placeholderTexts = [
    'Search for "tomato"',
    'Search for "milk"',
    'Search for "meat"',
    'Search for "ice apples"',
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const navigation = useNavigation();
  const animatedValue1 = useRef(new Animated.Value(0)).current;
  const animatedValue2 = useRef(new Animated.Value(60)).current; // Adjusted for better height animation

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (placeholderIndex + 1) % placeholderTexts.length;
      Animated.parallel([
        Animated.timing(animatedValue1, {
          toValue: -60, // Adjusted to match the height of the search box
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue2, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Update index and reset animated values
        setPlaceholderIndex(nextIndex);
        animatedValue1.setValue(0);
        animatedValue2.setValue(60);
      });
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, [placeholderIndex]);

  const handlePress = () => {
    navigation.navigate("Search"); // Replace with your target screen
  };

  const nextIndex = (placeholderIndex + 1) % placeholderTexts.length;
  return (
    <Pressable
      style={styles.searchContainer}
      android_ripple={{ color: "rgba(0, 0, 0, 0.1)", borderless: false }}
      onPress={handlePress}
    >
      <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
      <View style={styles.inputWrapper}>
        <Animated.View
          style={[
            styles.animatedView,
            { transform: [{ translateY: animatedValue1 }] },
          ]}
        >
          <TextInput
            style={styles.searchInput}
            value={placeholderTexts[placeholderIndex]}
            editable={false}
            pointerEvents="none"
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.animatedView,
            { transform: [{ translateY: animatedValue2 }] },
          ]}
        >
          <TextInput
            style={styles.searchInput}
            value={placeholderTexts[nextIndex]}
            editable={false}
            pointerEvents="none"
          />
        </Animated.View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    overflow: "hidden",
    height: 50,
  },
  inputWrapper: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#000",
    padding: 10, // Ensuring the text color is visible
  },
  animatedView: {
    position: "absolute",
    width: "100%",
  },
});

export default AnimatedSearch;
