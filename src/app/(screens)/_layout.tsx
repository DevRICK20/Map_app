import { Stack } from "expo-router";
import { useState } from "react";

export default function Layout() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return <Stack screenOptions={{ headerShown: false }} />;
}
