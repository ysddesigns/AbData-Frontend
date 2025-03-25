import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import React from "react";

import HomeHeader from "../screen/Home/HomeHeader";
import Assets from "../screen/Home/Assets";
import HomeMenu from "../screen/Home/HomeMenu";
import { Colors } from "@/constants/Colors";

const HomeScreen = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || "light"];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* User Profile Info */}
      <ScrollView>
        <HomeHeader />
        {/* user Assets Innfo */}
        <Assets />

        {/* Home Menu */}
        <HomeMenu />

        {/* Ads Info */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
