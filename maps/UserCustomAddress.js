import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  BackHandler,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Modal from "react-native-modal";

const ConfirmDeliveryLocation = ({ isVisible, handleModalClose }) => {
  const [receiverName, setReceiverName] = useState("");
  const [receiverContact, setReceiverContact] = useState("");
  const [addressType, setAddressType] = useState("Home");
  const [area, setArea] = useState("");
  const [building, setBuilding] = useState("");
  const [landmark, setLandmark] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const backAction = () => {
      handleModalClose();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [handleModalClose]);

  const validateFields = () => {
    let valid = true;
    let errors = {};

    if (!receiverName) {
      errors.receiverName = "Receiver's name is required";
      valid = false;
    }
    if (!receiverContact) {
      errors.receiverContact = "Receiver's contact is required";
      valid = false;
    }
    if (!building) {
      errors.building = "Building details are required";
      valid = false;
    }
    if (!area) {
      errors.area = "Area details are required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSave = () => {
    if (validateFields()) {
      Alert.alert("Address saved successfully!");
      // Handle saving address logic here
    } else {
      Alert.alert("Please fill in all required fields");
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={handleModalClose}
      style={styles.modal}
      backdropColor="rgba(0,0,0,0.5)"
      avoidKeyboard={true}
      statusBarTranslucent
      onBackButtonPress={handleModalClose}
    >
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.formContainer}>
            <Text style={styles.subHeader}>Enter complete address</Text>
            <View style={styles.addressTypeContainer}>
              {["Home", "Work", "Hotel", "Other"].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.addressTypeButton,
                    addressType === type && styles.activeAddressTypeButton,
                  ]}
                  onPress={() => setAddressType(type)}
                >
                  <Text
                    style={[
                      styles.addressTypeText,
                      addressType === type && styles.activeAddressTypeText,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Receiver's name</Text>
              <TextInput
                style={styles.input}
                value={receiverName}
                onChangeText={setReceiverName}
                placeholder="Receiver's name"
              />
              {errors.receiverName && (
                <Text style={styles.errorText}>{errors.receiverName}</Text>
              )}
              {receiverName ? (
                <TouchableOpacity
                  style={styles.clearInputIcon}
                  onPress={() => setReceiverName("")}
                >
                  <Feather name="x" size={20} color="#999" />
                </TouchableOpacity>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Receiver's contact</Text>
              <TextInput
                style={styles.input}
                value={receiverContact}
                onChangeText={setReceiverContact}
                placeholder="Receiver's contact"
                keyboardType="numeric"
                maxLength={10}
              />
              {errors.receiverContact && (
                <Text style={styles.errorText}>{errors.receiverContact}</Text>
              )}
              {receiverContact ? (
                <TouchableOpacity
                  style={styles.clearInputIcon}
                  onPress={() => setReceiverContact("")}
                >
                  <Feather name="x" size={20} color="#999" />
                </TouchableOpacity>
              ) : null}
            </View>

            <Text style={styles.infoText}>May be used to assist delivery</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Flat / House no / Floor / Building
              </Text>
              <TextInput
                style={styles.input}
                value={building}
                onChangeText={setBuilding}
                placeholder="Flat / House no / Floor / Building"
              />
              {errors.building && (
                <Text style={styles.errorText}>{errors.building}</Text>
              )}
              {building ? (
                <TouchableOpacity
                  style={styles.clearInputIcon}
                  onPress={() => setBuilding("")}
                >
                  <Feather name="x" size={20} color="#999" />
                </TouchableOpacity>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nearby landmark (optional)</Text>
              <TextInput
                style={styles.input}
                value={landmark}
                onChangeText={setLandmark}
                placeholder="Nearby landmark (optional)"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Area / Sector / Locality</Text>
              <TextInput
                style={styles.input}
                value={area}
                onChangeText={setArea}
                placeholder="Area / Sector / Locality"
              />
              {errors.area && (
                <Text style={styles.errorText}>{errors.area}</Text>
              )}
              {area ? (
                <TouchableOpacity
                  style={styles.clearInputIcon}
                  onPress={() => setArea("")}
                >
                  <Feather name="x" size={20} color="#999" />
                </TouchableOpacity>
              ) : null}
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save address</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addressTypeContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  addressTypeButton: {
    flex: 1,
    padding: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    marginHorizontal: 5,
  },
  activeAddressTypeButton: {
    borderColor: "red",
    backgroundColor: "#fbe9e9",
  },
  addressTypeText: {
    fontSize: 16,
  },
  activeAddressTypeText: {
    color: "red",
  },
  inputContainer: {
    position: "relative",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  clearInputIcon: {
    position: "absolute",
    right: 10,
    top: 30,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  infoText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "red",
    borderRadius: 25,
    alignItems: "center",
    padding: 15,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ConfirmDeliveryLocation;
