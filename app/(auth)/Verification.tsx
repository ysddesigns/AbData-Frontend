import { sendEmailOtp, sendOtp, verifyEmailOtp, verifyOtp } from "@/util/api";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
const Verification = () => {
  const [otp, setOtp] = useState(["", "", "", "", ""]); // To store each digit of the OTP
  const { phone, email } = useLocalSearchParams();
  const otpInputs = useRef<Array<TextInput | null>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Auto focus next field
    if (value && index < otp.length - 1) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleBackSpace = (index: number) => {
    if (otp[index] === "" && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
    const updatedOtp = [...otp];
    updatedOtp[index] = "";
    setOtp(updatedOtp);
  };

  const handleSubmitOtp = async (enteredOtp = otp.join("")) => {
    if (otp.some((digit) => digit === "")) {
      Alert.alert("Invalid OTP", "Please enter a valid 5-digit OTP.");
      return;
    }
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); //simulate netwrork delay
      console.log(email, enteredOtp);
      if (email) {
        await verifyEmailOtp(email, enteredOtp);
      }
      // alerting the user for better user experience
      Alert.alert(
        "OTP Verified",
        "You have successfully verified your account."
      );

      // navigate to password reset page after successfully validating the OTP
      router.replace("/(tabs)/home");
    } catch (error) {
      const errorMsg = (error as any).response?.data?.message;
      Alert.alert("Error", errorMsg);
      console.log("error submitting OTP", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      //   if (phone) {
      //     await sendOtp(phone);
      //     console.log("OTP resent to phone", phone);
      //   }
      if (email) {
        await sendEmailOtp(email);
        console.log("OTP resent to email", email);
      }
      Alert.alert("OTP Sent", "A new OTP has been sent to your email.");
    } catch (error) {
      const errorMsg =
        (error as any).response?.data?.message || "Something went wrong";
      Alert.alert("Error", errorMsg);
      console.log("error resending OTP", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }} />
      <Text style={styles.headerText}>Enter OTP</Text>

      <Text style={styles.instructionText}>
        We have sent a 5-digit OTP to your registered email or phone number.
      </Text>
      <Text style={styles.subtitle}>
        Check Your Email Spam folder if you did'nt see your OTP
      </Text>

      {/* OTP Input Fields */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => {
              if (el) otpInputs.current[index] = el;
            }}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            autoFocus={index === 0}
            onChangeText={(value) => handleOtpChange(value, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") handleBackSpace(index);
            }}
          />
        ))}
      </View>

      {/* Submit Button */}
      <Pressable
        style={[
          styles.submitButton,
          isLoading && { backgroundColor: "#9A9A9A" },
        ]}
        onPress={() => handleSubmitOtp()}
        disabled={isLoading}
        android_ripple={{ color: "#fff" }}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Verify OTP</Text>
        )}
      </Pressable>

      {/* Resend OTP */}
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive the OTP?</Text>
        <Pressable onPress={handleResendOtp} disabled={isLoading}>
          <Text style={styles.resendLink}>Resend OTP</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    padding: 20,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#05161A",
    marginBottom: 20,
    textAlign: "center",
  },
  instructionText: {
    fontSize: 14,
    color: "#A9A9A9",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    color: "#A9A9A9",
    marginBottom: 14,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  otpInput: {
    borderColor: "#EDEDED",
    borderWidth: 1,
    borderRadius: 8,
    width: 50,
    height: 50,
    textAlign: "center",
    fontSize: 18,
    color: "#05161A",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
  },
  submitButtonText: {
    color: "#fefefe",
    fontSize: 16,
    fontWeight: "600",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  resendText: {
    color: "#A9A9A9",
  },
  resendLink: {
    color: "#007AFF",
    marginLeft: 5,
    fontWeight: "600",
  },
});
