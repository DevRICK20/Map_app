import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { HidePasswordIcon, ShowPasswordIcon } from "../const/icons";
import IconButton from "./IconButton";
interface InputProp {
  onChangeText: (text: string) => void;

  height?: number;
  width?: number | "100%";
  disabledIcon?: boolean;
  placeholder: string;
  isDarkTheme?: boolean;
}

export default function Input({
  onChangeText,
  placeholder,
  isDarkTheme,
  disabledIcon = true,
  height = 50,
  width = "100%",
}: InputProp) {
  const [secureText, setSecureText] = useState<boolean>(!disabledIcon);
  return (
    <View
      className="bg-white text-gray-800 shadow"
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        width: width,
        height: height,
        borderRadius: 5,
        borderColor: "#020202ff",
      }}
    >
      <View
        style={{
          width: disabledIcon ? "100%" : "85%",
          height: height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput
          style={{
            width: "100%",
            height: height,
            paddingHorizontal: 10,
          }}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          onChangeText={onChangeText}
          secureTextEntry={secureText}
        />
      </View>
      {!disabledIcon && (
        <View
          style={{
            position: "fixed",
            width: "15%",
            height: height,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            onPress={() => {
              setSecureText(!secureText);
            }}
            children={secureText ? <HidePasswordIcon /> : <ShowPasswordIcon />}
          />
        </View>
      )}
    </View>
  );
}
