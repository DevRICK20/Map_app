import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

type LocationObject = Location.LocationObject;
// Defines the structure of the address object returned by reverse geocoding.
type GeocodedAddress = Location.LocationGeocodedAddress;

interface LocationRequestServiceProp {
  setLocationData: (locationData: LocationObject) => void;
}

export default function LocationRequestService({
  setLocationData,
}: LocationRequestServiceProp) {
  // State to hold location object, error messages, and address details with TypeScript types.
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [address, setAddress] = useState<GeocodedAddress | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // --- Permission Request on Initial Load ---
  // This effect runs once when the component mounts to request location permission.
  useEffect(() => {
    (async () => {
      // Request permission to access location in the foreground.
      let { status } = await Location.requestForegroundPermissionsAsync();

      // Handle permission denial.
      if (status !== "granted") {
        setErrorMsg(
          "Permission to access location was denied. Please enable it in your device settings."
        );
        return;
      }
    })();
  }, []);

  // --- Handler to Fetch Location ---
  const getLocationHandler = async () => {
    setIsLoading(true); // Show loading indicator
    setErrorMsg(null); // Clear previous errors
    setAddress(null); // Clear previous address
    setLocation(null); // Clear previous location

    try {
      // Fetch the current position with high accuracy.
      let currentLocation: LocationObject =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
      setLocation(currentLocation);
      setLocationData(currentLocation);

      // Perform reverse geocoding to get address from coordinates.
      let addressResponse: GeocodedAddress[] =
        await Location.reverseGeocodeAsync(currentLocation.coords);
      if (addressResponse && addressResponse.length > 0) {
        setAddress(addressResponse[0]);
      }
    } catch (error) {
      // Handle cases where location fetching fails.
      setErrorMsg(
        "Could not fetch location. Please ensure your GPS is enabled."
      );
      console.error("Location Error:", error);
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  return (
    <ScrollView
      className="bg-slate-100 w-full"
      contentContainerClassName="flex-1 justify-center items-center p-5"
    >
      <View className="w-full mt-8  max-w-md bg-white rounded-2xl p-6 items-center shadow-lg">
        <Text
          className="text-base text-gray-600 text-center mb-6 leading-snug"
          style={{ fontSize: 30, fontWeight: 800 }}
        >
          Welcome!
        </Text>
        <Text className="text-2xl font-bold text-gray-800 mb-2.5">
          📍 Location Finder
        </Text>
        <Text className="text-base text-gray-600 text-center mb-6 leading-snug">
          This app requires your permission to access location data to show your
          current position.
        </Text>
        <Pressable
          className="bg-blue-600 py-4 px-10 rounded-full shadow-md active:bg-blue-700 active:scale-95 transition-transform"
          onPress={getLocationHandler}
          disabled={isLoading}
        >
          <Text className="text-white text-lg font-semibold">
            {isLoading ? "Fetching..." : "Get My Location"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
