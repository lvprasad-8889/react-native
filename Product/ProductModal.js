import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  BackHandler
} from "react-native";
import Modal from "react-native-modal";
import RNPickerSelect from "react-native-picker-select";
import React, { useState, useEffect, useRef } from "react";

const ProductModal = ({
  isVisible,
  handleModalClose,
  product,
  minSize,
  maxSize,
  unitOptions,
}) => {
  let [quantity, setQuantity] = useState(minSize.toString());
  let [selectedUnit, setSelectedUnit] = useState(unitOptions[0].value);
  let [errorMessage, setErrorMessage] = useState("a");
  let inputRef = useRef(null);

  const handleAdd = () => {
    if (errorMessage.length === 1) {
      Keyboard.dismiss();
      handleModalClose();
      console.log(
        `Added ${quantity} ${selectedUnit} of ${product.title} to the cart.`
      );
    }
  };

  const handleQuantityChange = (e) => {
    let quantity = e;
    if (quantity.length === 0) {
      setErrorMessage("Quantity cannot be empty");
    } else if (!/^[+-]?\d+(\.\d+)?$/.test(quantity)) {
      return;
    } else if (parseInt(quantity) > maxSize) {
      setErrorMessage(`Maximum quantity is ${maxSize}`);
    } else if (parseInt(quantity) < minSize) {
      setErrorMessage(`Minimum quanity is ${minSize}`);
    } else {
      setErrorMessage("a");
    }
    setQuantity(quantity);
    console.log("change s handled am I right ?");
  };

  useEffect(() => {
    const backAction = () => {
      if (isVisible) {
        handleModalClose();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isVisible, handleModalClose]);

  // useEffect(() => {
  //   if (isVisible) {
  //     setTimeout(() => {
  //       inputRef.current?.focus();
  //     }, 100);
  //   }
  // }, [isVisible]);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={handleModalClose}
      style={styles.modal}
      backdropColor="rgba(0,0,0,0.5)"
      statusBarTranslucent
      onBackButtonPress={handleModalClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Customize {product.title}</Text>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedUnit(value)}
              items={unitOptions}
              style={pickerSelectStyles}
              value={selectedUnit}
            />
          </View>
          <TextInput
            ref={inputRef}
            style={styles.modalInput}
            placeholder={`Enter quantity in ${selectedUnit}`}
            value={quantity}
            onChangeText={(e) => handleQuantityChange(e)}
            keyboardType="numeric"
            maxLength={5}
            autoFocus
          />
          {errorMessage.length !== 1 && (
            <Text style={styles.limitText}>{errorMessage}</Text>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              gap: 16,
            }}
          >
            <TouchableOpacity
              style={[styles.addButton]}
              onPress={() => {
                Keyboard.dismiss();
                handleModalClose();
              }}
            >
              <Text style={styles.addButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.addButton,
                errorMessage.length !== 1 && styles.addButtonDisabled,
              ]}
              onPress={handleAdd}
              disabled={errorMessage.length !== 1}
            >
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    // Adjust this to control the height of the modal content
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  limitText: {
    color: "#dc3545",
  },
  addButton: {
    backgroundColor: "#0E9DFA",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    flex: 1,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "black",
    paddingRight: 30,
  },
});

export default ProductModal;
