import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

const addresses = [
  {
    id: '1',
    label: 'Home',
    address: 'Eblock, 1307, 13 Floor, Tower E, Indis Onecity, Malaysian Township',
    phoneNumber: '+91-8688131158',
    distance: '1.5 km'
  },
  {
    id: '2',
    label: 'Home',
    address: '4th floor, kuro gaming, rebellion gaming, Mega Hills, Madhapur',
    phoneNumber: '+91-8688131158',
    distance: '4.9 km'
  },
  {
    id: '3',
    label: 'Home',
    address: 'Flat 101 yashodabhai jaideep residency behind Westley church',
    phoneNumber: '+91-6300067580',
    distance: '14 km'
  },
];

const App = () => {
  const [searchText, setSearchText] = useState('');

  const clearSearch = () => {
    setSearchText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a location</Text>
      <View style={styles.searchBoxContainer}>
        <Icon name="search" size={20} color="#999" style={styles.icon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for area, street name..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText ? (
          <TouchableOpacity onPress={clearSearch} style={styles.clearIcon}>
            <Feather name="x" size={20} color="#999" />
          </TouchableOpacity>
        ) : null}
      </View>
      <TouchableOpacity style={styles.currentLocation}>
        <MaterialIcons name="my-location" size={24} color="red" style={styles.locationIcon} />
        <View style={styles.currentLocationTextContainer}>
          <Text style={styles.currentLocationText}>Use current location</Text>
          <Text style={styles.addressText}>Manjeera Trinity Corporate, E Seva Lane, K P H B Phase 3</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addAddress}>
        <Icon name="plus" size={20} color="red" style={styles.addIcon} />
        <Text style={styles.addAddressText}>Add Address</Text>
      </TouchableOpacity>
      <Text style={styles.savedAddresses}>SAVED ADDRESSES</Text>
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.addressContainer}>
            <View style={styles.addressHeader}>
              <Icon name="home" size={24} color="#999" />
              <Text style={styles.addressLabel}>{item.label}</Text>
              <Text style={styles.distance}>{item.distance}</Text>
            </View>
            <Text style={styles.addressText}>{item.address}</Text>
            <Text style={styles.phoneNumber}>Phone number: {item.phoneNumber}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  icon: {
    marginLeft: 15,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  clearIcon: {
    marginLeft: 10,
    marginRight: 15,
  },
  currentLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  currentLocationTextContainer: {
    marginLeft: 10,
  },
  currentLocationText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  addIcon: {
    marginRight: 10,
  },
  addAddressText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  savedAddresses: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addressContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
  },
  distance: {
    fontSize: 14,
    color: '#999',
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  phoneNumber: {
    fontSize: 14,
    color: '#666',
  },
});

export default App;
