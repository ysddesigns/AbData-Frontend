import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import TransactionButton from "@/components/Button/TransactionButton";
import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import formattedBalance from "@/util/functions";

const Assets: React.FC = () => {
  const [showAsset, setShowAsset] = useState(true);
  const { walletBalance } = useWallet();
  // format wallet balance with comma seoerators

  const iconName = showAsset ? "eye" : "eye-off-sharp";
  const toggleShowAsset = () => {
    setShowAsset((previouse) => !previouse);
  };

  const depositBtn = () => {
    router.push("/screen/Wallet/Funding/AddFunds");
  };
  const buyData = () => {
    router.push("/screen/Transactions/Data/BuyData");
  };
  const transfer = () => {};

  return (
    <ScrollView style={styles.container}>
      <View>
        {/* wallet icon  */}
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name="wallet-outline"
            color={"#fefefe"}
            size={20}
            onPress={() => {}}
          />
          <Text style={styles.text}> Balance</Text>
        </View>
        {/* Asset Balance */}
        <View style={styles.asset}>
          {showAsset ? (
            <Text style={[styles.text, styles.balanceText]}>
              <Text style={{ fontSize: 14 }}>₦ {""}</Text>
              {formattedBalance(walletBalance)}
            </Text>
          ) : (
            <Text style={styles.text}>*******</Text>
          )}
          <Ionicons
            name={iconName}
            color={"#fefefe"}
            size={20}
            onPress={toggleShowAsset}
          />
        </View>
        {/* Primary Transaction Buttons */}
        <View style={styles.transactionButton}>
          {/* Deposit Button */}
          <TransactionButton
            buttonName="Deposit"
            iconName="send"
            onpress={depositBtn}
          />
          {/* Withdraw Button */}
          <TransactionButton
            buttonName="Data"
            iconName="wifi"
            onpress={buyData}
          />
          {/* Transfer Button */}
          <TransactionButton
            buttonName="Airtime"
            iconName="phone-portrait"
            onpress={transfer}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#05161A",
    borderRadius: 7,
    margin: 5,
    padding: 9,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  asset: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  text: {
    color: "#fefefe",
  },
  balanceText: {
    fontSize: 25,
    fontWeight: "700",
  },
  transactionButton: {
    flexDirection: "row",
  },
});

export default Assets;
