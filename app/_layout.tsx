import { Feather } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import "../global.css";

function BlinkingShakingIcon() {
  const opacity = useRef(new Animated.Value(1)).current;
  const shake = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Blink animation
    const blinkAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.2,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ])
    );

    // Shake animation
    const shakeAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(shake, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shake, {
          toValue: -1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shake, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ])
    );

    blinkAnim.start();
    shakeAnim.start();

    return () => {
      blinkAnim.stop();
      shakeAnim.stop();
    };
  }, [opacity, shake]);

  const shakeInterpolation = shake.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-10deg", "10deg"], // ✅ rotation degrees
  });

  return (
    <Animated.View
      style={{
        marginRight: 15,
        opacity: opacity,
        transform: [{ rotate: shakeInterpolation }],
      }}
    >
      <Feather name="phone-outgoing" size={24} color="red" />
    </Animated.View>
  );
}

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "TravelPluse",
          headerTitleAlign: "center",
          headerLeft: () => (
            <Feather
              name="info" // any Feather icon
              size={24}
              color="black"
              style={{ marginLeft: 15 }}
              onPress={() => {
                console.log("Menu pressed");
              }}
            />
          ),
          headerRight: () => <BlinkingShakingIcon />,
        }}
      />
      <Stack.Screen
        name="components/new_screen"
        options={{
          headerShown: true,
          title: "TravelPluse",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
