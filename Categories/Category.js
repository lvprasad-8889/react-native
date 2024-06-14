import * as React from "react";
import {
  Dimensions,
  Text,
  View,
  Image,
  Pressable,
  Alert,
  TouchableNativeFeedback,
  ScrollView,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Main from "../Product/Index";

let data = [
  "https://cdn.pixabay.com/photo/2015/03/11/19/19/violet-669046_1280.jpg",
  "https://cdn.pixabay.com/photo/2022/08/05/20/23/hydrangeas-7367535_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/06/09/21/37/summer-thunder-storm-3465247_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/12/07/09/30/milky-way-559641_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/08/01/08/07/sea-2563389_1280.jpg",
];
const Home = ({ navigation }) => {
  const width = Dimensions.get("window").width;
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}>
        Vegetables
      </Text>
      <Carousel
        loop={false}
        width={width}
        autoPlay
        autoPlayInterval={8000}
        data={data}
        scrollAnimationDuration={1000}
        onSnapToItem={(item) => console.log("current index:", item)}
        renderItem={(item) => <Main navigation={navigation}></Main>}
      />
    </View>
  );
};

export default Home;
