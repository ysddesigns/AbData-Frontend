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
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useWallet } from "@/hooks/useWallet";
import { Colors } from "@/constants/Colors";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/util/api";

const Text = ThemedText;
const View = ThemedView;

const Login = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || "light"];
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { username, setUsername, password, setPassword } = useWallet();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("login data", data);
      router.replace("/(tabs)/home");
    },
    onError: (error) => {
      const errorMsg =
        (error as any).response?.data?.error || "Something went wrong";
      console.log("error login", error);
      console.log("ErrorMsg", errorMsg);
    },
  });

  const handleLogin = async () => {
    if (!emailOrPhone || !password) {
      Alert.alert(
        "Missing Fields",
        "Please enter both email/phone and password."
      );
      return;
    }

    mutation.mutate({ credential: emailOrPhone, password });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
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
      {/* On Error */}
      {mutation.status === "error" && (
        <Text style={styles.errorText}>Invalid Credential</Text>
      )}

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
        style={[
          styles.loginButton,
          mutation.status === "pending" && styles.isdisableButton,
        ]}
        // onPress={() => router.push("/home")}
        onPress={handleLogin}
        disabled={mutation.status === "pending"}
      >
        {mutation.status === "pending" ? (
          <ActivityIndicator color={"#fff"} />
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
  errorText: {
    color: "red",
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
