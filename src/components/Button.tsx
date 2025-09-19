import React from "react";
import { ActivityIndicator, Pressable, PressableProps } from "react-native";

interface ButtonProp extends PressableProps {
  onPress: () => void;
  height?: number;
  width?: number;
  disabled?: boolean;
  loading: boolean;
}
export default function Button({
  children,
  onPress,
  height = 40,
  width = 100,
  disabled = false,
  loading,
}: ButtonProp) {
  return (
    <Pressable
      className="flex items-center justify-center shadow-lg"
      style={{
        backgroundColor: "#5372faff",
        height: height,
        width: width,
        borderRadius: 20,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      {loading ? <ActivityIndicator color="#fff" /> : children}
    </Pressable>
  );
}
