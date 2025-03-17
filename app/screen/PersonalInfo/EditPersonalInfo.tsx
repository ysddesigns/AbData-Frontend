import { StyleSheet, useColorScheme } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";
const EditPersonalInfo = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || "light"];
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text>EditPersonalInfo</Text>
    </View>
  );
};

export default EditPersonalInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
