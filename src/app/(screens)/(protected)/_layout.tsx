import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

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
    outputRange: ["-10deg", "10deg"],
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

export default function ProtectedTabs() {
  return (
    <Tabs
      screenOptions={{
        headerRight: () => <BlinkingShakingIcon />,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => (
            <Feather name="map" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: "Contact",
          tabBarIcon: ({ color }) => (
            <Feather name="file-text" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
