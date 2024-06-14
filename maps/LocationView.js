import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const LocationView = ({
  time = "10",
  address = "KPHB, Indis One City, kukatpally, a very long text",
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable style={styles.selectedLocationView} onPress={() => navigation.navigate("SelectLocation")}>
        <Icon
          name="location-outline"
          size={40}
          color="#0E9DFA"
          style={styles.locationIcon}
        />
        <View style={styles.selectedAddress}>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Delivery in <Text style={styles.timeText}>{time} mins</Text>
              </Text>
              <Icon
                name="chevron-down"
                size={20}
                color="#666"
                style={styles.downArrowIcon}
              />
            </View>
          </View>
          <Text style={styles.subHeaderText} numberOfLines={1}>
            {address}
          </Text>
        </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Settings")}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/15359/15359050.png",
          }}
          style={styles.profileIcon}
          resizeMode="cover"
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  locationIcon: {},
  selectedLocationView: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
  },
  selectedAddress: {},
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
    flexDirection: "row",
    alignItems: "center",
  },
  downArrowIcon: {
    alignSelf: "flex-end",
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

export default LocationView;
