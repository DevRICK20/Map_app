import React from "react";
import { Line, Path, Svg } from "react-native-svg";

export const HidePasswordIcon = ({ size = 24, color = "black" }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Eye shape */}
    <Path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3-11-8 1.07-3.06 3.35-5.5 6.06-6.88" />
    <Path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
    <Path d="M12 4c5 0 9.27 3 11 8a10.94 10.94 0 0 1-4.06 5.06" />
    {/* Slash through eye */}
    <Line x1="5" y1="1" x2="20" y2="21" />
  </Svg>
);

export const ShowPasswordIcon = ({ size = 24, color = "black" }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Eye shape */}
    <Path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3-11-8 1.07-3.06 3.35-5.5 6.06-6.88" />
    <Path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
    <Path d="M12 4c5 0 9.27 3 11 8a10.94 10.94 0 0 1-4.06 5.06" />
    {/* Slash through eye */}
  </Svg>
);
