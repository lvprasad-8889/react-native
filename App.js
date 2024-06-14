import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FullImageScreen from "./Product/FullImageScreen";
import MainRoute from "./MainRoute";
import Profile from "./Profile/Profile";
import Search from "./Search/Search";
import Location from "./maps/Location";
import MapScreen from "./maps/MapScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  // Adjust this value based on your desired card width
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={MainRoute}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FullImage"
          component={FullImageScreen}
          options={{ title: "Full image view" }}
        />
        <Stack.Screen name="Settings" component={Profile} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen
          name="SelectLocation"
          component={Location}
          options={{ title: "Select a location" }}
        />
        <Stack.Screen
          name="Location"
          component={MapScreen}
          options={{ title: "In map view" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
