import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

import Carousel from "../Components/Carousel";
import ProductIndex from "../Product/Index";
import MapIndex from "../maps/Index";
import SpecialCarousel from '../Components/SpecialCarousel'

const Home = ({ navigation }) => {
  return (
    <ScrollView style={styles.homeContainer}>
      {/* <MapIndex navigation={navigation}></MapIndex> */}
      <SpecialCarousel></SpecialCarousel>
      <Carousel>
        <Text style={styles.categoryHeader}>Vegetables</Text>
        <View style={styles.productContainer}>
          <ProductIndex mode="carousel" navigation={navigation}></ProductIndex>
        </View>
      </Carousel>
      <Carousel>
        <Text style={styles.categoryHeader}>Meat</Text>
        <View style={styles.productContainer}>
          <ProductIndex mode="carousel" navigation={navigation}></ProductIndex>
        </View>
      </Carousel>
      <Carousel>
        <Text style={styles.categoryHeader}>Milk</Text>
        <View style={styles.productContainer}>
          <ProductIndex mode="carousel" navigation={navigation}></ProductIndex>
        </View>
      </Carousel>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {},
  productContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryproductContainer: {
    marginVertical: 15,
  },
  categoryHeader: {
    textAlign: "left",
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Home;
