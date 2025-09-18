import { Pressable, PressableProps } from "react-native";

interface IconButtonProp extends PressableProps {
  onPress: () => void;
  height?: number;
  width?: number;
}

export default function IconButton({
  children,
  onPress,
  height = 40,
  width = 40,
}: IconButtonProp) {
  return (
    <Pressable
      style={{
        height: height,
        width: width,
        borderRadius: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}
