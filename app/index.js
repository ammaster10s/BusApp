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

  const marker1 = {
    lat: 14.073580191499046,
    lng: 100.60348190755522,
    title: "Main Location",
    description: " ",
  };

  const additionalMarkers = [
    { lat: 14.066916, lng: 100.612880, title: "Start Blue line", description: "" },
    { lat: 14.067586, lng: 100.610038, title: "", description: "" },
    { lat: 14.067477, lng: 100.605404, title: "", description: "" },
    { lat: 14.069038, lng: 100.605457, title: "", description: "" },
    { lat: 14.069116, lng: 100.604331, title: "", description: "" },
    { lat: 14.070193, lng: 100.604266, title: "", description: "" },
    { lat: 14.070328, lng: 100.616118, title: "End Blue line", description: "" },
  ];

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
        {/* <Marker
          coordinate={{ latitude: marker1.lat, longitude: marker1.lng }}
          title={marker1.title}
          description={marker1.description}
        /> */}
        {additionalMarkers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.lat, longitude: marker.lng }}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
      {/* Moving Legend */}
      <View
        style={[
          styles.legendContainer,
          {
            top: 20 + mapRegion.latitudeDelta * 200, // Adjust the position based on zoom level
            left: 20 + mapRegion.longitudeDelta * 200, // Adjust the position based on zoom level
          },
        ]}
      >
        <Text style={styles.legendText}>Your Current Nearest Bus</Text>
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
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  legendText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MapScreen;
