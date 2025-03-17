import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";
import { useWallet } from "@/hooks/useWallet";
import formattedBalance from "@/util/functions";
import { Colors } from "@/constants/Colors";
import { buyData } from "@/util/buyData";

interface PropsType {
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  network: string;
  setNetwork: React.Dispatch<React.SetStateAction<string>>;
}

const BuyData: React.FC<PropsType> = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || "light"];
  const { walletBalance } = useWallet();
  const [amount, setAmount] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [network, setNetwork] = useState<string>("");
  const [plan, setPlan] = useState("1GB");

  const purchaseData = async () => {
    if(!network){
      return Alert.alert("Error", "Please select a network")
    }
    if(!phone){
      return Alert.alert("Error", "Please enter a phone number")
    }
    const result = await buyData(phone, network, plan);

    if (result.error) {
      Alert.alert("Error", result.error);
    } else {
      Alert.alert("Success", "Dta purchase successfully");
    }
  };
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Show Wallet Balance */}
      <View style={styles.walletalanceContainer}>
        <Text style={styles.balanceText}>
          Wallet Balance:
          <Text style={styles.walletBalance}>
            {" "}
            ₦ {formattedBalance(walletBalance)}
          </Text>
        </Text>
      </View>
      {/* List of Providers */}
      <Text style={styles.selectProvider}>Select Provider</Text>
      <View style={styles.networkProviderImageContainer}>
        <TouchableOpacity onPress={() => setNetwork("mtn-data")}>
          <Image
            source={require("@/assets/images/mtn.png")}
            style={[styles.networkProviderImage, network === "mtn-data" && styles.selectedNetwork]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setNetwork("airtel-data")}>
                    <Image
            source={require("@/assets/images/airtel.png")}
            style={[styles.networkProviderImage, network === "airtel-data" && styles.selectedNetwork]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setNetwork("glo-data")}>
                    <Image
            source={require("@/assets/images/glo.jpg")}
            style={[styles.networkProviderImage, network === "glo-data" && styles.selectedNetwork]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setNetwork("9mpbile-data")}>
                    <Image
            source={require("@/assets/images/nineMobile.jpg")}
            style={[styles.networkProviderImage, network === "9mobile-data" && styles.selectedNetwork]}
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
        focusable
        autoFocus
        style={styles.inputPhoneNumber}
      />
      <Text style={styles.text}>Amount</Text>
      <TextInput
        placeholder="plan"
        value="1GB"
        onChangeText={() => {}}
        inputMode="numeric"
        style={styles.inputPhoneNumber}
      />

      <TouchableOpacity style={styles.nextButton} onPress={purchaseData}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BuyData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  selectedNetwork: {
    borderWidth: 2,
    borderColor: "#05161A", // Dark Blue Highlight
    borderRadius: 50,
    padding: 5,
  },
});
