import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Loading Your Current Location...</Text>
    </View>
  );
};

const MapScreen = () => {
  // Initial map region
  const initialRegion = {
    latitude: 14.073580191499046,
    longitude: 100.60348190755522,
    latitudeDelta: 0.004,
    longitudeDelta: 0.004,
  };

  // Additional markers for the bus route
  const additionalMarkers = [
    { lat: 14.066813, lng: 100.612880, title: "Start Blue line", description: "" },
    { lat: 14.066883, lng: 100.609998, title: "", description: "" },
    { lat: 14.066946, lng: 100.609914, title: "", description: "" },
    { lat: 14.067411, lng: 100.609935, title: "", description: "" },
    { lat: 14.067477, lng: 100.605404, title: "", description: "" },
    { lat: 14.069038, lng: 100.605457, title: "", description: "" },
    { lat: 14.069116, lng: 100.604331, title: "", description: "" },
    { lat: 14.070193, lng: 100.604266, title: "", description: "" },
    { lat: 14.070328, lng: 100.616118, title: "End Blue line", description: "" },];

  // Convert additional markers to route coordinates
  const routeCoordinates = additionalMarkers.map((marker) => ({
    latitude: marker.lat,
    longitude: marker.lng,
  }));

  // Initialize the bus position with the starting marker
  const initialBusPosition = {
    latitude: additionalMarkers[0].lat,
    longitude: additionalMarkers[0].lng,
  };

  // State to store the current bus position
  const [busPosition, setBusPosition] = useState(initialBusPosition);

  // State for loading status
  const [isLoading, setIsLoading] = useState(true);

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('Location permission not granted');
        setIsLoading(false); // Set isLoading to false in case of an error
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setUserLocation({ latitude, longitude });
      setIsLoading(false);
    } catch (error) {
      console.log('Error getting location:', error.message);
      setIsLoading(false); // Set isLoading to false in case of an error
    }
  };


  // Function to update the bus position
  const updateBusPosition = () => {
    const nextMarkerIndex = (routeCoordinates.findIndex(
      (coord) => coord.latitude === busPosition.latitude && coord.longitude === busPosition.longitude
    ) + 1) % routeCoordinates.length;

    setBusPosition(routeCoordinates[nextMarkerIndex]);
  };

  // Interval time in milliseconds to update bus position (adjust as per your preference)
  const intervalTime = 3000; // 3 seconds

  useEffect(() => {
    // Start the interval to update the bus position
    const interval = setInterval(updateBusPosition, intervalTime);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [busPosition]); // Dependency array includes busPosition to trigger the effect whenever the position changes

  // Render loading screen while fetching user's location
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Render map once loading is completed and user's location is available
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={
          userLocation
            ? {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.004,
                longitudeDelta: 0.004,
              }
            : initialRegion
        }
      >
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Your Location"
            description="You are here!"
          />
        )}

        {/* Additional markers for bus route */}
        {additionalMarkers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.lat, longitude: marker.lng }}
            title={marker.title}
            description={marker.description}
          />
        ))}

        {/* Movable marker representing the bus */}
        {busPosition && (
          <Marker
            coordinate={{
              latitude: busPosition.latitude,
              longitude: busPosition.longitude,
            }}
            title="Bus"
            description="The bus is here!"
            pinColor="green" // Customize the marker color if needed
          />
        )}

        {/* Polyline for bus route */}
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="blue"
          strokeWidth={4}
        />
      </MapView>

      {/* Moving Legend */}
      <View style={styles.legendContainer}>
        {/* Add your legend components here */}
        <Text style={styles.legendText}>Legend</Text>
        {/* ... (your other legend components) */}
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
    bottom: 20, // Adjust this value to position the legend as per your requirements
    left: 10, // Adjust this value to position the legend as per your requirements
  },
  legendText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: '50%',
  },
});

export default MapScreen;
