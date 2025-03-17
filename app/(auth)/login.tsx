import React, { useState } from "react";
import {
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useWallet } from "@/hooks/useWallet";
import { Colors } from "@/constants/Colors";

const Text = ThemedText;
const View = ThemedView;

const Login = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || "light"];
  const [emailOrPhone, setEmailOrPhone] = useState("");
  // const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");

  const { username, setUsername, password, setPassword } = useWallet();

  const [Error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!emailOrPhone || !password) {
      Alert.alert(
        "Missing Fields",
        "Please enter both email/phone and password."
      );
      return;
    }

    setIsLoading(true);
    // Placeholder for successful login
    try {
      const res = await axios.post(
        "https://auth-backend-8fxa.onrender.com/api/auth/login",
        { credential: emailOrPhone, password }
      );
      // successful login
      console.log("login successful");
      // store token in asyncstorage
      // await AsyncStorage.setItem("userToken", user.uid);
      router.replace("/(tabs)/home");
      return res.data;
    } catch (error) {
      const errorMsg = (error as any).response?.data?.message;
      Alert.alert("Error", errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>Login</Text>

      {/* Email or Phone Input */}
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: theme.inputBackground },
        ]}
      >
        <Ionicons name="mail-outline" size={20} color="#007AFF" />
        <TextInput
          placeholder="Email or Phone"
          style={styles.input}
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
          keyboardType="default"
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

      {/* Forgot Password */}
      <TouchableOpacity
        onPress={() =>
          router.push("/screen/Auth/ForgotPassword/forgotpassword")
        }
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.loginButton, isLoading && styles.isdisableButton]}
        // onPress={() => router.push("/home")}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Sign Up Redirect */}
      <View style={styles.signupRedirect}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    // marginTop: 100,
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
    borderColor: "#EDEDED",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  forgotPasswordText: {
    textAlign: "right",
    color: "#007AFF",
    marginVertical: 10,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
  },
  loginButtonText: {
    color: "#fefefe",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#A9A9A9",
  },
  signupRedirect: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  signupText: {
    color: "#A9A9A9",
  },
  signupLink: {
    color: "#007AFF",
    marginLeft: 5,
    fontWeight: "600",
  },
  isdisableButton: {},
});
