import * as SecureStore from "expo-secure-store";
import { useColorScheme } from "react-native";

type Theme = "dark" | "light" | "system";

export async function getAccessToken(): Promise<string | null> {
  return await SecureStore.getItemAsync("accessToken");
}

export async function setAccessToken(accessToken: string): Promise<boolean> {
  try {
    await SecureStore.setItemAsync("accessToken", accessToken);
    return true;
  } catch (err) {
    return false;
  }
}

export async function getTheme() {
  const ststemTheme = useColorScheme();
  const storageTheme = await SecureStore.getItemAsync("themeData");

  if (storageTheme === "dark") {
    return "dark";
  } else if (storageTheme === "light") {
    return "light";
  } else {
    return ststemTheme === "dark" ? "dark" : "light";
  }
}

export async function setTheme(theme: Theme): Promise<boolean> {
  const ststemTheme = useColorScheme();

  try {
    if (theme === "dark") {
      await SecureStore.setItemAsync("themeData", "dark");
      return true;
    } else if (theme === "light") {
      await SecureStore.setItemAsync("themeData", "light");
      return true;
    } else {
      await SecureStore.setItemAsync(
        "themeData",
        ststemTheme === "dark" ? "dark" : "light"
      );
      return true;
    }
  } catch (err) {
    return false;
  }
}

export async function getIntroStatus(): Promise<boolean> {
  const status = await SecureStore.getItemAsync("introData");

  if (!status || status == "false") {
    return false;
  }

  return true;
}

export async function setIntroStatus(
  introData: "false" | "true"
): Promise<boolean> {
  try {
    await SecureStore.setItemAsync("introData", introData);
    return true;
  } catch (err) {
    return false;
  }
}
