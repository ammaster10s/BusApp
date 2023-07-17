import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const initialRegion = {
    latitude: 14.073580191499046, // Latitude of the location
    longitude:  100.60348190755522, // Longitude of the location
    latitudeDelta: 0.004, // Zoom level latitude
    longitudeDelta: 0.004, // Zoom level longitude
  };

  //14.073580191499046, 100.60348190755522
  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        <Marker coordinate={{ latitude: 37.7749, longitude: -122.4194 }} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;