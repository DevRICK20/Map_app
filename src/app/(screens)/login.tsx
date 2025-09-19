import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { ThemeContext } from "@/src/providers/theme";
import { setAccessToken } from "@/src/services/storage";
import { Link, useRouter } from "expo-router";
import React, { useContext, useRef, useState } from "react";
import { Text, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setemailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const theme = useContext(ThemeContext);

  const handleLogin = async () => {
    setIsLoading(true);
    setemailError("");
    setPasswordError("");

    const email = emailRef.current;
    const password = passwordRef.current;

    if (!email) {
      setIsLoading(false);
      setemailError("Blank Email");
      return;
    }

    if (!password) {
      setIsLoading(false);
      setPasswordError("Blank Password");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (email === "rig@email.com" && password === "rig1234") {
        await setAccessToken("testToken");
        router.replace("/(screens)/(protected)/home");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center bg-gray-100 min-h-full pt-[150px] px-6">
      <View className="mb-5 w-20 h-20 rounded-full bg-gray-200 justify-center items-center shadow-md">
        <Text className="text-4xl">🚀</Text>
      </View>

      <Text className="text-3xl font-bold text-gray-800 mb-5">
        Welcome Back!
      </Text>

      <Text className="text-red-500 text-sm h-5 w-full pl-0.5">
        {emailError}
      </Text>

      <Input
        placeholder="Email"
        onChangeText={(text) => (emailRef.current = text)}
      />

      <Text className="text-red-500 text-sm h-5 w-full pl-0.5">
        {passwordError}
      </Text>

      <Input
        placeholder="Password"
        disabledIcon={false}
        onChangeText={(text) => (passwordRef.current = text)}
      />

      <View className="w-full h-5" />

      <Button
        width={250}
        height={50}
        loading={isLoading}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text className="text-white text-lg font-bold">Log In</Text>
      </Button>

      <Link
        className="pt-5 text-center text-blue-600"
        href={"/(screens)/signup"}
      >
        Don't have an account ?
      </Link>
    </View>
  );
}
