import { checkLocationAccess } from "@/src/services/location";
import { getAccessToken, getIntroStatus } from "@/src/services/storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Layout() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleVerification = async () => {
    const status = await getIntroStatus();

    if (!status) {
      setIsLoading(false);
      return router.replace("/(screens)/intro");
    }

    if (!(await checkLocationAccess())) {
      setIsLoading(false);
    }

    const accessToke = await getAccessToken();

    if (!accessToke) {
      setIsLoading(false);
      return router.replace("/(screens)/login");
    }

    setIsLoading(false);
    return router.replace("/(screens)/(protected)/home");
  };

  useEffect(() => {
    handleVerification();
  }, []);

  if (isLoading)
    return (
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
    );
}
