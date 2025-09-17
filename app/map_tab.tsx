import React, { useState } from "react";
import { Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

// --- Main App Component ---

interface MapProp {
  latitude: number;
  longitude: number;
}

export default function Map({ latitude, longitude }: MapProp) {
  const { width, height } = Dimensions.get("window");
  const aspectRatio = width / height;
  const latitudeDelta = 0.0922;
  const longitudeDelta = latitudeDelta * aspectRatio;

  const [region, setRegion] = useState<Region>({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
  });
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title="My Location"
          description="You are here"
        />
      </MapView>

      <View
        style={{
          position: "absolute",
          bottom: 10,
          width: "100%",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOpacity: 0.3,
            shadowRadius: 5,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Map Example</Text>
          <Text>Latitude: {region.latitude.toFixed(6)}</Text>
          <Text>Longitude: {region.longitude.toFixed(6)}</Text>
        </View>
      </View>

      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
