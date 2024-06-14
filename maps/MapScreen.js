import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
  Easing,
  StatusBar,
  ScrollView,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import axios from "axios";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import debounce from "lodash/debounce";
import UserCustomeAddress from "./UserCustomAddress";

const { width, height } = Dimensions.get("window");

const GOOGLE_PLACES_API_KEY = "AIzaSyAHSJ-TUYMhwJkWIMLgdBJ1uPXBh7Ro7FY";

const MapScreen = ({ route }) => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const mapRef = useRef(null);

  const { placeId } = route.params;

  const [placeID, setPlaceID] = useState(placeId);

  const [isVisible, setIsVisible] = useState(false);

  const openModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  const rippleAnim = useRef(new Animated.Value(0)).current;
  let animation = useRef(null);

  // to animate bubble
  useEffect(() => {
    if (!isFetching) {
      rippleAnimationFn().start();
    } else {
      rippleAnimationFn().stop();
    }

    return () => {
      rippleAnimationFn().start();
    };
  }, [isFetching]);

  const rippleAnimationFn = () => {
    rippleAnim.setValue(0);
    animation = Animated.loop(
      Animated.timing(rippleAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    return animation;
  };

  const rippleInterpolation = rippleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2.5],
  });

  const opacityInterpolation = rippleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const fetchPlaceId = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1&key=${GOOGLE_PLACES_API_KEY}`;
    try {
      const response = await axios.get(url);
      if (response.data.results.length > 0) {
        setPlaceID(response.data.results[0].place_id);
      } else {
        setErrorMsg("No place found for the given coordinates.");
      }
    } catch (error) {
      setErrorMsg("Error fetching place ID.");
    }
  };

  const fetchPlaceDetails = async (placeID) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json`,
        {
          params: {
            place_id: placeID,
            key: GOOGLE_PLACES_API_KEY,
          },
        }
      );
      const location = response.data.result.geometry.location;
      const address = response.data.result.formatted_address;
      setSelectedPlace({
        name: response.data.result.name,
        address,
        location,
      });
      const newRegion = {
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      };
      setRegion(newRegion);
      mapRef.current.animateToRegion(newRegion, 1000);
    } catch (error) {
      //   console.error("Error fetching place details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      const address = reverseGeocode[0];
      setSelectedPlace({
        name: address.name,
        address: `${address.formattedAddress}`,
        location: {
          lat: latitude,
          lng: longitude,
        },
      });
    } catch (error) {
      //   console.error("Error fetching address:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const debouncedFetchAddressFromCoordinates = useCallback(
    debounce(fetchAddressFromCoordinates, 1000),
    []
  );

  const handleFetchCurrentLocation = async () => {
    setLoading(true);
    try {
      const location = await Location.getCurrentPositionAsync({});
      const address = await fetchAddressFromCoordinates(
        location.coords.latitude,
        location.coords.longitude
      );

      const place = await fetchPlaceId(
        location.coords.latitude,
        location.coords.longitude
      );

      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      };
      setRegion(newRegion);
      mapRef.current.animateToRegion(newRegion, 1000);
      console.log("address is", address);
      setSelectedPlace({
        name: address.name ? address.name : "Selected location",
        address,
        location: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
      });
    } catch (error) {
      //   console.error("Error fetching current location:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegionChangeComplete = (selectedRegion, gesture) => {
    if (!gesture.isGesture) {
      return;
    }
    setRegion(selectedRegion);
    if (!isFetching) {
      setIsFetching(true);
      debouncedFetchAddressFromCoordinates(
        selectedRegion.latitude,
        selectedRegion.longitude
      );
    }
  };

  useEffect(() => {
    if (!placeId.length) {
      handleFetchCurrentLocation();
    } else {
      fetchPlaceDetails(placeID);
    }
  }, [placeID]);

  return (
    <View style={styles.container}>
      {selectedPlace && (
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            region={region}
            onRegionChangeComplete={handleRegionChangeComplete}
          />

          <View style={styles.customMarker}>
            <View style={styles.markerIcon} />
            <View style={styles.markerLine}></View>
            <View>
              <Animated.View
                style={[
                  styles.ripple,
                  {
                    transform: [{ scale: rippleInterpolation }],
                    opacity: opacityInterpolation,
                  },
                ]}
              />
              <View style={styles.markerBottomIcon}></View>
            </View>
          </View>
          <View style={styles.addressContainer}>
            <TouchableOpacity
              style={styles.currentLocationButton}
              onPress={handleFetchCurrentLocation}
              disabled={loading || isFetching}
            >
              <Icon name="locate-outline" size={40} color="#0E9DFA" />
            </TouchableOpacity>
            <Text style={styles.addressText}>{selectedPlace.name}</Text>
            <Text style={styles.addressDetail}>{selectedPlace.address}</Text>
            <TouchableOpacity
              style={styles.buttonContainer}
              disabled={loading || isFetching}
              onPress={() => openModal()}
            >
              {loading || isFetching ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Confirm & Continue</Text>
              )}
            </TouchableOpacity>
          </View>
          {/* {isVisible && (
            <UserCustomeAddress
              isVisible={isVisible}
              handleModalClose={closeModal}
            />
          )} */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    borderRadius: 25,
    backgroundColor: "#0E9DFA",
    marginVertical: 10,
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

  mapContainer: {
    flex: 1,
    position: "relative",
  },
  addressContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  customMarker: {
    position: "absolute",
    top: height / 2 - 40,
    left: width / 2 - 20,
    alignItems: "center",
  },
  markerIcon: {
    width: 20,
    height: 20,
    backgroundColor: "#0E9DFA",
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerLine: {
    width: 0.5,
    height: 20,
    backgroundColor: "#0e9dfa",
    borderRadius: 10,
    borderWidth: 0.4,
    borderColor: "#0e9dfa",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ripple: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: "#0e9dfa",
    top: -10,
    right: -10,
  },
  markerBottomIcon: {
    position: "absolute",
    top: -10,
    right: -10,
    width: 20,
    height: 20,
    backgroundColor: "#0e9dfa",
    opacity: 0.5,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  currentLocationButton: {
    position: "absolute",
    top: -80,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addressText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addressDetail: {
    fontSize: 14,
    color: "#666",
  },
  confirmButton: {
    backgroundColor: "#0e9dfa",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MapScreen;
