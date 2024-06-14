import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  Animated,
} from "react-native";

import AnimatedSearch from "./AnimatedSearch";
import LocationView from "./LocationView";

const Index = () => {
  return (
    <View style={styles.mapIndexContainer}>
      <LocationView></LocationView>
      <AnimatedSearch></AnimatedSearch>
    </View>
  );
};

const styles = StyleSheet.create({
  mapIndexContainer: {
    padding: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  selectedAddress: {
    width: "70%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileIconHeader: {
    width: "20%",
    alignItems: "flex-end",
  },
  profileIcon: {
    width: 44,
    height: 44,
    flex: 1,
    objectFit: "contain",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  timeText: {
    color: "#0E9DFA", // Use the color you prefer
  },
  subHeaderText: {
    marginVertical: 4,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Index;
