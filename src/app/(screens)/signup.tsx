import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { setAccessToken } from "@/src/services/storage";
import { Link, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Text, View } from "react-native";

export default function SignupScreen() {
  const router = useRouter();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const handleSignup = async () => {
    setIsLoading(true);
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    const email = emailRef.current;
    const password = passwordRef.current;
    const confirmPassword = confirmPasswordRef.current;

    if (!email) {
      setIsLoading(false);
      setEmailError("Blank Email");
      return;
    }

    if (!password) {
      setIsLoading(false);
      setPasswordError("Blank Password");
      return;
    }

    if (!confirmPassword) {
      setIsLoading(false);
      setConfirmPasswordError("Please confirm your password");
      return;
    }

    if (password !== confirmPassword) {
      setIsLoading(false);
      setConfirmPasswordError("Passwords do not match");
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
    <View className="flex-1 items-center px-6 pt-[150px] min-h-full">
      <View className="mb-5 w-20 h-20 rounded-full bg-gray-200 justify-center items-center shadow-md">
        <Text className="text-4xl">📝</Text>
      </View>

      <Text className="text-3xl font-bold text-gray-800 mb-5">
        Create a New Account
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

      <Text className="text-red-500 text-sm h-5 w-full pl-0.5">
        {confirmPasswordError}
      </Text>

      <Input
        placeholder="Confirm Password"
        disabledIcon={false}
        onChangeText={(text) => (confirmPasswordRef.current = text)}
      />

      <View className="h-5 w-full" />

      <Button
        width={250}
        height={50}
        loading={isLoading}
        onPress={handleSignup}
        disabled={isLoading}
      >
        <Text className="text-white text-lg font-bold">Sign Up</Text>
      </Button>

      <Link
        className="pt-5 text-center text-blue-600"
        href={"/(screens)/login"}
      >
        Already have an account ?
      </Link>
    </View>
  );
}
