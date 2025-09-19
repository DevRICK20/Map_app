import IconButton from "@/src/components/IconButton";
import { getLocationHandler } from "@/src/services/location";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";

export default function MapScreen() {
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

  let [timeInterval, setTimeInterval] = useState<number | undefined>(undefined);

  const handleLocationTracking = () => {
    if (!timeInterval) {
      setTimeInterval(
        setInterval(async () => {
          await updateLocation();
        }, 1000)
      );
      console.log("Interval Created");
    } else {
      setTimeInterval(undefined);
      clearInterval(timeInterval);
      console.log("Interval Cleared");
    }
  };

  const updateLocation = async () => {
    await getLocationHandler()
      .then((location) => location?.coords)
      .then((coords) => {
        setRegion({
          latitude: coords!.latitude,
          longitude: coords!.longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        });
      });
  };

  useEffect(() => {
    updateLocation().then(() => setLoading(false));
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
      <ActivityIndicator size={30} color="#007fe7ff" />
    </View>
  ) : (
    <View style={{ flex: 1, height: "10%" }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={region}
        moveOnMarkerPress={true}
        rotateEnabled={true}
        pitchEnabled={true}
        zoomEnabled={true}
        scrollEnabled={true}
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
          <Text>Latitude: {region.latitude.toFixed(6)}</Text>
          <Text>Longitude: {region.longitude.toFixed(6)}</Text>
          <IconButton width={100} onPress={handleLocationTracking}>
            <Text className="border">
              {timeInterval ? "Remove Track" : "Track"}
            </Text>
          </IconButton>
        </View>
      </View>
    </View>
  );
}
