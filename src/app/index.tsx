import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { checkLocationAccess } from "../services/location";

export default function LocationRequestService() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    handleRequestLocation();
  }, []);

  const handleRequestLocation = () => {
    checkLocationAccess().then((hasLocationAccess) => {
      if (hasLocationAccess) {
        // setIsLoading(false);
        setTimeout(() => {
          router.replace("/(screens)/(protected)/home");
        }, 1000);
      } else {
        setIsLoading(false);
      }
    });
  };

  return isLoading ? (
    <View
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size={50} color="#007fe7ff" />
    </View>
  ) : (
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
          onPress={handleRequestLocation}
          disabled={isLoading}
        >
          <Text className="text-white text-lg font-semibold">
            {isLoading ? (
              <ActivityIndicator color={"white"} />
            ) : (
              "Get My Location"
            )}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
