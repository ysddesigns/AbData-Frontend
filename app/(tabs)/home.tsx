import {
  Alert,
  Button,
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
import { Pressable } from "react-native-gesture-handler";
import { sendEmailOtp, sendOtp, verifyEmailOtp } from "@/util/api";

const HomeScreen = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || "light"];

  const onSendOTP = async () => {
    try {
      await sendOtp({ phone: "+2347068000713" });
      console.log("sent");
    } catch (error) {
      const errorMsg = (error as any).response?.data?.message;
      // Alert.alert("Error", errorMsg);
      console.log("error sending OTP", errorMsg);
      console.log("error:", error);
    }
  };
  const onVerifyOtp = async () => {
    try {
      await verifyEmailOtp({
        email: "yusufbyusufgwarmai@gmail.com",
        otp: "85753",
      });
      console.log("sent");
    } catch (error) {
      const errorMsg = (error as any).response?.data?.message;
      // Alert.alert("Error", errorMsg);
      console.log("error sending OTP", errorMsg);
      console.log("error:", error);
    }
  };
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
        <Button title="send OTP" onPress={onSendOTP} />
        <Button title="verify OTP" onPress={onVerifyOtp} />
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
