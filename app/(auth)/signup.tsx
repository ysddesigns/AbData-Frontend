import React, { useState } from "react";
import {
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { sendOtp, sendEmailOtp, signupUser } from "@/util/api";
import { useMutation } from "@tanstack/react-query";

/*
Add a rollback endpoint whereby when a user created and failed to send otp it will rollback the account creation
*/
const Signup = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || "light"];
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: signupUser,
    onSuccess: async (data) => {
      console.log("register data", data);

      try {
        await Promise.all([sendOtp(phone), sendEmailOtp(email)]);
      } catch (error) {
        Alert.alert("Error", "Failed to send OTP, Please try again");
        console.log("OTP error", error);
      }
      router.replace({
        pathname: "/Verification",
        params: { phone, email },
      });
    },
    onError: (error) => {
      const errorMsg =
        (error as any).response?.data?.error || "Something went wrong";
      console.log("error", error);
      Alert.alert("Signup Failed", errorMsg);
    },
  });

  const handleSignup = async () => {
    //  validation and sign-up logic here
    if (!fullName || !email || !phone || !password) {
      Alert.alert("Error", "Please fill in all fileds");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be atleast ^ characters length");
    }
    if (password !== rePassword) {
      Alert.alert("Error"), "Password do not match";
    }

    const user = { name: fullName, email, phone, password };
    mutation.mutate(user);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header */}
        <Text style={styles.headerText}>Sign Up</Text>

        {/* Full Name Input */}
        <View
          style={[
            styles.inputContainer,
            { backgroundColor: theme.inputBackground },
          ]}
        >
          <Ionicons name="person-outline" size={20} color="#007AFF" />
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
        {/* Email Input */}
        <View
          style={[
            styles.inputContainer,
            { backgroundColor: theme.inputBackground },
          ]}
        >
          <Ionicons name="mail-outline" size={20} color="#007AFF" />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        {/* Phone Input */}
        <View
          style={[
            styles.inputContainer,
            { backgroundColor: theme.inputBackground },
          ]}
        >
          <Ionicons name="call-outline" size={20} color="#007AFF" />
          <TextInput
            placeholder="Phone Number"
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        {/* Password Input */}
        <View
          style={[
            styles.inputContainer,
            { backgroundColor: theme.inputBackground },
          ]}
        >
          <Ionicons name="lock-closed-outline" size={20} color="#007AFF" />
          <TextInput
            placeholder="Password"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#007AFF"
            />
          </Pressable>
        </View>
        {/* re enter password */}
        <View
          style={[
            styles.inputContainer,
            { backgroundColor: theme.inputBackground },
          ]}
        >
          <Ionicons name="lock-closed-outline" size={20} color="#007AFF" />
          <TextInput
            placeholder="Re-Enter Password"
            style={styles.input}
            value={rePassword}
            onChangeText={setRePassword}
            secureTextEntry={!showPassword}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#007AFF"
            />
          </Pressable>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={[
            styles.signupButton,
            mutation.status === "pending" && { backgroundColor: "#9A9A9" },
          ]}
          onPress={handleSignup}
          disabled={mutation.status === "pending"} //prevent multple clicks
        >
          {mutation.status === "pending" ? (
            <ActivityIndicator size={20} color={"#fff"} />
          ) : (
            <Text style={styles.signupButtonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        {/* Login Redirect */}
        <View style={styles.loginRedirect}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <Pressable onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.loginLink}>Log in</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    padding: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
    height: 50,
  },

  signupButtonText: {
    color: "#fefefe",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 12,
  },
  loginRedirect: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  loginText: {
    color: "#A9A9A9",
  },
  loginLink: {
    color: "#007AFF",
    marginLeft: 5,
    fontWeight: "600",
  },
});
