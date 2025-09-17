import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

// --- Main App Component ---

interface MapProp {
  latitude: number;
  longitude: number;
}

export default function Map({ latitude, longitude }: MapProp) {
  const { width, height } = Dimensions.get("window");
  const aspectRatio = width / height;
  const latitudeDelta = 0.0922; // A common value for a city-level zoom
  const longitudeDelta = latitudeDelta * aspectRatio;
  const [region, setRegion] = useState<Region>({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
  });
  return (
    <ScrollView>
      <View className="flex-1">
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        >
          <Marker
            coordinate={{ latitude: latitude, longitude: longitude }}
            title="My Location"
            description="hello"
          />
        </MapView>

        <View className="absolute bottom-10 w-full items-center">
          <View className="bg-white p-4 rounded-lg shadow-lg">
            <Text className="text-black font-bold mb-1">Map Example</Text>
            <Text className="text-gray-600 text-sm">
              Latitude: {region.latitude.toFixed(6)}
            </Text>
            <Text className="text-gray-600 text-sm">
              Longitude: {region.longitude.toFixed(6)}
            </Text>
          </View>
        </View>

        <StatusBar />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
