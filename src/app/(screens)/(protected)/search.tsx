import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function new_screen() {
  return (
    <View style={styles.container}>
      {/* Middle content */}
      <View style={styles.content}>
        <Text>Hello</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take full height of the screen
    justifyContent: "space-between", // Push top and bottom apart
  },
  content: {
    flex: 1, // Fill available space
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
});
