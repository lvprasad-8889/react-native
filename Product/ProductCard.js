import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  StatusBar,
  Touchable,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ImageOverlay from "./ImageOverlay";
import ProductModal from "./ProductModal";

const { height, width } = Dimensions.get("window");

const ProductCard = ({
  product,
  unitOptions,
  minSize,
  maxSize,
  padding = 15,
  mode,
  navigation,
}) => {
  const [isVisible, setModalVisible] = useState(false);

  const handleCustomize = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <Pressable
      style={[styles.card, { padding: padding }]}
      onPress={() => {
        console.log(product);
        navigation.navigate("FullImage", {
          name: `${product.title}`,
          imageUrl: product.image,
        });
      }}
    >
      <ImageOverlay
        title={product.discountText}
        contentPosition="bottom-left"
        source={{ uri: product.image }}
        containerStyle={styles.productImage}
      ></ImageOverlay>
      <View style={styles.productDetails}>
        <Text
          style={[
            styles.productTitle,
            mode === "carousel" && styles.productCarouselTitle,
          ]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {product.title}
        </Text>
        <Text style={styles.productWeight}>{product.weight}</Text>
        <View style={styles.priceContainer}>
          <Icon
            name="currency-inr"
            size={20}
            color="#000"
            style={styles.rupeeIcon}
          />
          <Text style={styles.productPrice}>{product.price}</Text>
          <Text style={styles.originalPrice}>{product.originalPrice}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.customizeButton}
        onPress={handleCustomize}
      >
        <Text style={styles.customizeButtonText}>Customize</Text>
      </TouchableOpacity>
      <ProductModal
        isVisible={isVisible}
        handleModalClose={handleModalClose}
        product={product}
        minSize={minSize}
        maxSize={maxSize}
        unitOptions={unitOptions}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    flex: 1,
  },
  discountContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#8a2be2",
    paddingHorizontal: 8,
    paddingVertical: 0,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    zIndex: 1,
  },
  addButtonDisabled: {
    opacity: 0.2,
  },
  discountText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  productDetails: {
    alignItems: "center",
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    height: 45, // Fixed height for title
  },
  productCarouselTitle: {
    fontSize: 12,
    height: 30,
  },
  productWeight: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  rupeeIcon: {
    marginRight: 2,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "bold",
  },
  originalPrice: {
    fontSize: 16,
    color: "#888",
    textDecorationLine: "line-through",
    marginLeft: 10,
  },
  customizeButton: {
    backgroundColor: "#0E9DFA",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 5, // Reduced space between price and customize button
  },
  customizeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductCard;
