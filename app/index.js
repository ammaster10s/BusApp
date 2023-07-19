import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const initialRegion = {
    latitude: 14.073580191499046, // Latitude of the location
    longitude: 100.60348190755522, // Longitude of the location
    latitudeDelta: 0.004, // Zoom level latitude
    longitudeDelta: 0.004, // Zoom level longitude
  };

  const [mapRegion, setMapRegion] = useState(initialRegion);

  const onRegionChange = (region) => {
    // Update the map region when the user pans or zooms
    setMapRegion(region);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        onRegionChange={onRegionChange}
      >
        <Marker coordinate={{ latitude: 37.7749, longitude: -122.4194 }} />
      </MapView>
      {/* Moving Legend */}
      <View
        style={[
          styles.legendContainer,
          {
            top: 20 + (mapRegion.latitudeDelta * 200), // Adjust the position based on zoom level
            left: 20 + (mapRegion.longitudeDelta * 200), // Adjust the position based on zoom level
          },
        ]}
      >
        <Text style={styles.legendText}>Your Moving Legend Here</Text>
      </View>
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
  legendContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  legendText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MapScreen;
