import Button from "@/src/components/Button";
import { checkLocationAccess } from "@/src/services/location";
import { setIntroStatus } from "@/src/services/storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function LocationRequestService() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleRequestLocation = () => {
    checkLocationAccess().then((hasLocationAccess) => {
      if (hasLocationAccess) {
        setTimeout(async () => {
          await setIntroStatus("true");
          router.replace("/(screens)/auth");
        }, 1000);
      } else {
        setIsLoading(false);
      }
    });
  };

  return (
    <View className="bg-slate-100 w-full flex-1 justify-center items-center p-5">
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
        <Button onPress={handleRequestLocation} loading={isLoading}>
          <Text>Location</Text>
        </Button>
      </View>
    </View>
  );
}
