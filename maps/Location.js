import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  StyleSheet,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import * as Location from "expo-location";
import debounce from "lodash/debounce";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const GOOGLE_PLACES_API_KEY = "AIzaSyAHSJ-TUYMhwJkWIMLgdBJ1uPXBh7Ro7FY";

const PlaceSearch = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);

  const clearSearch = () => {
    setSearchText("");
  };

  const handleInputChange = (text) => {
    setQuery(text);
    fetchPlaces(text);
    setSearchText(text);
  };

  const fetchPlaces = useCallback(
    debounce(async (text) => {
      if (text.length > 2) {
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
            {
              params: {
                input: text,
                key: GOOGLE_PLACES_API_KEY,
              },
            }
          );
          setPlaces(response.data.predictions);
        } catch (error) {
          //   console.error("Error fetching place details:", error);
        }
      } else {
        setPlaces([]);
      }
    }, 500),
    []
  );

  const handlePlacePress = (place) => {
    navigation.navigate("Location", {
      placeId: place.place_id,
    });
  };

  const handleFetchCurrentLocation = () => {
    navigation.navigate("Location", {
      placeId: "",
    });
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchBoxContainer}>
        <Icon name="search" size={20} color="#999" style={styles.icon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for area, street name..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={handleInputChange}
        />
        {searchText ? (
          <TouchableOpacity onPress={clearSearch} style={styles.clearIcon}>
            <Feather name="x" size={20} color="#999" />
          </TouchableOpacity>
        ) : null}
      </View>
      <Pressable
        onPress={handleFetchCurrentLocation}
        style={styles.buttonContainer}
      >
        <Icon name="locate-outline" size={30} color="#ffffff" />
        <Text style={styles.buttonText}>Use Current Location</Text>
      </Pressable>
      {places.length > 0 && (
        <FlatList
          data={places}
          keyboardShouldPersistTaps="always"
          keyExtractor={(item) => item.place_id}
          renderItem={({ item, index }) => (
            <Pressable
              style={[
                styles.placeItem,
                index === 0 && styles.placeItemBorderTop,
                index === places.length - 1 && styles.placeItemBorderBottom,
              ]}
              onPress={() => handlePlacePress(item)}
            >
              <Icon name="location-outline" size={35} color="#0E9DFA" />
              <View
                style={[
                  styles.placeTextContainer,
                  index !== places.length - 1 &&
                    styles.placeTextNotLastContainer,
                ]}
              >
                <Text style={styles.placeTitle}>
                  {item.structured_formatting.main_text}
                </Text>
                <Text style={styles.placeDescription} numberOfLines={2}>
                  {item.structured_formatting.secondary_text}
                </Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  searchBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    margin: 10,
  },
  icon: {
    marginLeft: 15,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 30,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  clearIcon: {
    marginLeft: 10,
    marginRight: 15,
  },
  currentLocationButton: {
    borderRadius: 20,
    height: 30,
    paddingHorizontal: 10,
    margin: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: "#0E9DFA",
    margin: 10,
    paddingHorizontal: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  placeItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    padding: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderColor: "gray",
    shadowColor: "#000",
  },
  placeItemBorderTop: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  placeItemBorderBottom: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  placeTextContainer: {
    width: "80%",
    borderBottomColor: "#767676",
    paddingBottom: 10,
  },
  placeTextNotLastContainer: {
    borderBottomWidth: 0.5,
  },
  placeTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  placeDescription: {
    fontSize: 14,
    color: "#767676",
  },
});

export default PlaceSearch;
