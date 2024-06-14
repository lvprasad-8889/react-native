import React, { useState, useCallback } from 'react';
import { FlatList, Text, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components/native';
import Icon from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import debounce from 'lodash/debounce';

const GOOGLE_PLACES_API_KEY = 'AIzaSyAHSJ-TUYMhwJkWIMLgdBJ1uPXBh7Ro7FY';

const Container = styled.View`
  flex: 1;
  background-color: #f0f0f0;
  padding: 20px;
`;

const Header = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 0 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
`;

const Input = styled.TextInput`
  flex: 1;
  height: 40px;
  padding: 0 8px;
`;

const PlaceItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
`;

const PlaceTextContainer = styled.View`
  flex: 1;
  padding-left: 10px;
`;

const PlaceTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const PlaceDescription = styled.Text`
  font-size: 14px;
  color: #666;
`;

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);

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
          console.error('Error fetching place details:', error);
        }
      } else {
        setPlaces([]);
      }
    }, 500),
    []
  );

  const handleInputChange = (text) => {
    setQuery(text);
    fetchPlaces(text);
  };

  const handlePlacePress = (place) => {
    navigation.navigate('Map', { placeId: place.place_id });
  };

  return (
    <Container>
      <Header>Your Location</Header>
      <InputContainer>
        <Icon name="search" size={20} color="#666" />
        <Input
          value={query}
          onChangeText={handleInputChange}
          placeholder="Search places"
        />
      </InputContainer>
      {places.length > 0 && (
        <FlatList
          data={places}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <PlaceItem onPress={() => handlePlacePress(item)}>
              <Icon name="location-outline" size={20} color="#666" />
              <PlaceTextContainer>
                <PlaceTitle>{item.structured_formatting.main_text}</PlaceTitle>
                <PlaceDescription>{item.structured_formatting.secondary_text}</PlaceDescription>
              </PlaceTextContainer>
            </PlaceItem>
          )}
        />
      )}
    </Container>
  );
};

export default SearchScreen;
