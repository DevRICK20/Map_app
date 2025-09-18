import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { Link } from "expo-router";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const SignupScreen = () => {
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

      // Simulate a successful signup
      console.log("Signup successful!");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Container for the logo/icon */}
      <View style={styles.logoContainer}>
        {/* You can replace this with an actual logo or icon */}
        <Text style={styles.logoText}>📝</Text>
      </View>

      <Text style={styles.title}>Create a New Account</Text>

      <Text style={styles.error} className="text-red-500 text-sm">
        {emailError}
      </Text>

      {/* Email Input */}
      <Input
        placeholder="Email"
        onChangeText={(text) => (emailRef.current = text)}
      />

      <Text style={styles.error} className="text-red-500 text-sm">
        {passwordError}
      </Text>

      {/* Password Input */}
      <Input
        placeholder="Password"
        disabledIcon={false}
        onChangeText={(text) => (passwordRef.current = text)}
      />

      <Text style={styles.error} className="text-red-500 text-sm">
        {confirmPasswordError}
      </Text>

      {/* Confirm Password Input */}
      <Input
        placeholder="Confirm Password"
        disabledIcon={false}
        onChangeText={(text) => (confirmPasswordRef.current = text)}
      />

      <View style={styles.error} />

      {/* Signup Button */}
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
        style={{
          // height: 25,
          display: "flex",
          // backgroundColor: "red",
          paddingTop: 20,
          alignContent: "center",
          justifyContent: "center",
          color: "#0404f1ff",
        }}
        href={"/(screens)/login"}
      >
        Already have an account ?
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    alignItems: "center",
    paddingHorizontal: 25,
    minHeight: "100%",
  },
  logoContainer: {
    marginBottom: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoText: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 20,
  },
  error: {
    width: "100%",
    height: 20,
    display: "flex",
    alignItems: "center",
    paddingLeft: 3,
  },
});

export default SignupScreen;
