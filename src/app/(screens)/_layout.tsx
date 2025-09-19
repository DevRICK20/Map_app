import { ThemeContext } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useContext } from "react";

export default function ScreenLayout() {
  const theme = useContext(ThemeContext);

  return (
    <ThemeContext.Provider value={theme}>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="auth" />
    </ThemeContext.Provider>
  );
}
