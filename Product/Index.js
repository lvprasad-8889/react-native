import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  View,
  StatusBar,
} from "react-native";
import ProductCard from "./ProductCard";

const Main = ({ navigation, mode = "default" }) => {
  const products = [
    {
      id: "1",
      image:
        "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "ITC Master Chef Crunchy Chicken Nuggets Super Saver",
      weight: "1 kg",
      price: "498",
      discountText: "20% OFF",
      originalPrice: "625",
    },
    {
      id: "2",
      image:
        "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Product 2",
      weight: "500 g",
      price: "250",
      discountText: "20% OFF",
      originalPrice: "300",
    },
    {
      id: "3",
      image:
        "https://images.pexels.com/photos/1493792/pexels-photo-1493792.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      title: "Product 3",
      weight: "2 kg",
      price: "700",
      discountText: "20% OFF",
      originalPrice: "800",
    },
    {
      id: "4",
      image:
        "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Product 4",
      weight: "1.5 kg",
      price: "600",
      discountText: "20% OFF",
      originalPrice: "700",
    },
    {
      id: "5",
      image:
        "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Product 5",
      weight: "1.5 kg",
      price: "600",
      discountText: "20% OFF",
      originalPrice: "700",
    },

    {
      id: "6",
      image:
        "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Product 6",
      weight: "2 kg",
      price: "700",
      discountText: "20% OFF",
      originalPrice: "800",
    },
    {
      id: "7",
      image:
        "https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Product 7",
      weight: "1.5 kg",
      price: "600",
      discountText: "20% OFF",
      originalPrice: "700",
    },
    {
      id: "8",
      image:
        "https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Product 8",
      weight: "1.5 kg",
      price: "600",
      discountText: "20% OFF",
      originalPrice: "700",
    },
    // Add more products here
  ];

  const unitOptions = [
    { label: "kg", value: "kg" },
    { label: "grams", value: "grams" },
    { label: "dozens", value: "dozens" },
    { label: "litres", value: "litres" },
  ];

  const calculateColumns = (screenWidth) => {
    if (screenWidth <= 600) {
      return {
        columns: 2,
        cardWidth: screenWidth / 2,
      };
    }
    if (screenWidth > 600 && screenWidth <= 1000) {
      return {
        columns: 4,
        cardWidth: screenWidth / 4 - 8,
      };
    }
    if (screenWidth > 1000 && screenWidth <= 1200) {
      return {
        columns: 5,
        cardWidth: screenWidth / 5 - 8,
      };
    }
    if (screenWidth > 1200 && screenWidth <= 1366) {
      return {
        columns: 6,
        cardWidth: screenWidth / 6 - 8,
      };
    }
    return {
      columns: 8,
      cardWidth: screenWidth / 8 - 8,
    };
  };

  const screenWidth = Dimensions.get("window").width;
  const numColumns = calculateColumns(screenWidth).columns;

  const cardWidth = calculateColumns(screenWidth).cardWidth;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="rgba(0,0,0,0.5)"></StatusBar>
      {mode === "default" && (
        <FlatList
          data={products}
          keyboardShouldPersistTaps="always"
          style={[{ flexWrap: "wrap" }]}
          renderItem={({ item }) => (
            <View style={[styles.cardContainer, { width: cardWidth }]}>
              <ProductCard
                product={item}
                unitOptions={unitOptions}
                minSize={1}
                maxSize={100}
                navigation={navigation}
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}
      {mode === "carousel" && (
        <FlatList
          data={products}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          renderItem={({ item }) => (
            <View style={[styles.cardContainer, { width: cardWidth - 20 }]}>
              <ProductCard
                product={item}
                unitOptions={unitOptions}
                minSize={1}
                maxSize={100}
                padding={10}
                mode={mode}
                navigation={navigation}
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[styles.listContainer]}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffff",
  },
  listContainer: {
    justifyContent: "space-between",
  },
  columnWrapper: {
    flexDirection: "row",
  },
  cardContainer: {},
});

export default Main;
