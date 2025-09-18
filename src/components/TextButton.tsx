import { Pressable, Text } from "react-native";

interface TextButtonProp {
  onPress: () => void;
  text: string;
  height?: number;
  width?: number;
  className: string;
}

export default function TextButton({
  onPress,
  height,
  width,
  text,
  className,
}: TextButtonProp) {
  return (
    <Pressable
      className={className}
      style={{ height: height, width: width }}
      onPress={onPress}
    >
      <Text>{text}</Text>
    </Pressable>
  );
}
