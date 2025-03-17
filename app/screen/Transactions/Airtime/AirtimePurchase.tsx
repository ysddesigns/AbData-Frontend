import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";
import { useWallet } from "@/hooks/useWallet";
import formattedBalance from "@/util/functions";
import axios from "axios";
import { buyAirtime } from "@/util/buyAirtime";
import { router } from "expo-router";

interface PropsType {
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  network: string;
  setNetwork: React.Dispatch<React.SetStateAction<string>>;
}
const AirtimePurchase: React.FC = () => {
  const { walletBalance } = useWallet();
  const [amount, setAmount] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [network, setNetwork] = useState<string>("");

  const purchaseAirtime = async () => {
    const result = await buyAirtime(amount, phone, network);
    if (result.erro) {
      Alert.alert("Error", result.error);
    } else {
      Alert.alert("Success", "Airtime purchase successfully!");
      router.push("/screen/Transactions/Airtime/AirtimeSuccess");
    }
  };
  return (
    <View>
      {/* Show Wallet Balance */}
      <View style={styles.walletalanceContainer}>
        <Text style={styles.balanceText}>
          Wallet Balance:
          <Text style={styles.walletBalance}>
            {" "}
            ₦{formattedBalance(walletBalance)}
          </Text>
        </Text>
      </View>
      {/* List of Providers */}
      <Text style={styles.selectProvider}>Select Provider</Text>
      <View style={styles.networkProviderImageContainer}>
        <TouchableOpacity onPress={() => setNetwork("mtn")}>
          <Image
            source={require("@/assets/images/mtn.png")}
            style={styles.networkProviderImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setNetwork("airtel")}>
          <Image
            source={require("@/assets/images/airtel.png")}
            style={styles.networkProviderImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setNetwork("glo")}>
          <Image
            source={require("@/assets/images/glo.jpg")}
            style={styles.networkProviderImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setNetwork("9mobile")}>
          <Image
            source={require("@/assets/images/nineMobile.jpg")}
            style={styles.networkProviderImage}
          />
        </TouchableOpacity>
      </View>
      {/* Phone Number */}
      <Text style={styles.text}>Phone Number</Text>
      <TextInput
        placeholder="phone number"
        value={phone}
        onChangeText={setPhone}
        inputMode="numeric"
        autoFocus
        style={styles.inputPhoneNumber}
      />
      <Text style={styles.text}>Amount</Text>
      <TextInput
        placeholder="amount"
        value={amount}
        onChangeText={setAmount}
        inputMode="numeric"
        style={styles.inputPhoneNumber}
      />

      <TouchableOpacity style={styles.nextButton} onPress={purchaseAirtime}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AirtimePurchase;

const styles = StyleSheet.create({
  selectProvider: {
    textAlign: "center",
    margin: 7,
    fontWeight: "bold",
    fontSize: 23,
  },
  walletalanceContainer: {
    backgroundColor: "#05161A",
    margin: 12,
  },
  balanceText: {
    color: "#fefefe",
    padding: 12,
  },
  walletBalance: {
    fontWeight: "bold",
    color: "#fefefe",
    fontSize: 18,
  },
  networkProviderImageContainer: {
    margin: 9,

    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  networkProviderImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    borderRadius: 50,
  },
  inputPhoneNumber: {
    borderWidth: 1,
    borderRadius: 7,
    padding: 12,
    margin: 12,
  },
  text: {
    marginLeft: 12,
  },
  nextButton: {
    backgroundColor: "#05161A",
    margin: 12,
    padding: 12,
    borderRadius: 12,
  },
  nextText: {
    color: "#fefefe",
    textAlign: "center",
    fontWeight: "bold",
  },
});
