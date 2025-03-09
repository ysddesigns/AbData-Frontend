import React, { useState } from "react";
import {
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const Text = ThemedText;
const View = ThemedView;

const Signup = () => {
  // const [user, setIslogged] = useContext() predefine
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    //  validation and sign-up logic here
    if (!fullName || !email || !phone || !password) {
      Alert.alert("Error", "Please fill in all fileds");
      return;
    }

    setIsLoading(true);

    try {
      const [firstName, lastName] = fullName.split(" ");
      const user = { name: firstName, email, password };

      console.log("Sending data:", user); // Log request data

      const res = await axios.post(
        "https://abdata-backend.onrender.com/api/auth/register",
        user,
        { timeout: 30000 }
      );
      router.replace("/(tabs)/home");
      console.log("user created successfully:", user);
      return res.data;
    } catch (error) {
      console.log(
        "Error creating user:",
        (error as any).response
          ? (error as any).response.data
          : (error as any).message
      );
      Alert.alert(
        "Signup Failed",
        error.response?.data?.error || "Something went wrong"
      );

      console.log("Error creating user: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>Sign Up</Text>

      {/* Full Name Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#007AFF" />
        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
      </View>
      {/* Email Input */}
      <View style={styles.inputContainer}>
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
      <View style={styles.inputContainer}>
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
      <View style={styles.inputContainer}>
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

      {/* Sign Up Button */}
      <TouchableOpacity
        style={[
          styles.signupButton,
          isLoading && { backgroundColor: "#9A9A9" },
        ]}
        onPress={handleSignup}
        disabled={isLoading} //prevent multple clicks
      >
        {isLoading ? (
          <ActivityIndicator size={20} color={"red"} />
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
    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
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
  // signupButton: {
  //   backgroundColor: "#007AFF",
  //   paddingVertical: 15,
  //   borderRadius: 8,
  //   alignItems: "center",
  //   marginVertical: 20,
  //   flexDirection: "row",
  //   justifyContent: "center",
  // },
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
