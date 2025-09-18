import { getLocationHandler } from "@/src/services/location";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
// --- Main App Component ---

export default function Map() {
  const { width, height } = Dimensions.get("window");
  const aspectRatio = width / height;
  const latitudeDelta = 0.0922;
  const longitudeDelta = latitudeDelta * aspectRatio;

  const [region, setRegion] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getLocationHandler()
      .then((location) => location?.coords)
      .then((coords) => {
        setRegion({
          latitude: coords!.latitude,
          longitude: coords!.longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        });
        setLoading(false);
      });
  }, []);

  return loading ? (
    <View
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size={100} color="#007fe7ff" />
    </View>
  ) : (
    <View style={{ flex: 1, height: "10%" }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={region} // Correct use of initialRegion
        // onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        rotateEnabled={true} //  Enable rotation gestures
        pitchEnabled={true} //  Enable tilt gestures
        zoomEnabled={true} //  Enable zoom gestures
        scrollEnabled={true} //  Enable panning gestures
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
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
            alignItems: "center",
            marginBottom: 90,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Map Example</Text>
          <Text>Latitude: {region.latitude.toFixed(6)}</Text>
          <Text>Longitude: {region.longitude.toFixed(6)}</Text>
        </View>
      </View>

      {/* <StatusBar /> */}
      {/* <BottomNavbar activeTab={""} onTabPress={function (): void {}} /> */}
    </View>
  );
}

// const styles = StyleSheet.create({
//   map: {
//     flex: 1,
//   },
// });
