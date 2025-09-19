import { checkLocationAccess } from "@/src/services/location";
import { getAccessToken, getIntroStatus } from "@/src/services/storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Layout() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleAccess = async (accessToke: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (!(accessToke == "testToken")) {
      setIsLoading(false);
      return router.replace("/(screens)/login");
    }

    return router.replace("/(screens)/(protected)/home");
  };

  const handleAuth = async () => {
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

    await handleAccess(accessToke);
  };

  useEffect(() => {
    handleAuth();
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
