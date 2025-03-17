import { Alert, StyleSheet, View } from "react-native";
import React from "react";
import HomeCardItem from "./HomeCardsItem";

const HomeMenu = () => {
  const handlePress = () => {
    Alert.alert("Upcoming", "Coming Soon This Feature is coming Soon");
  };
  return (
    <View style={styles.container}>
      <View style={styles.itemsContainer}>
        <HomeCardItem
          iconName={"wallet"}
          buttonName="Bills"
          size={30}
          color="purple"
          // onpress={() => router.push("/(auth)/login")}
          onpress={handlePress}
        />
        <HomeCardItem
          iconName={"wallet"}
          buttonName="Savings"
          size={30}
          color="brown"
          // onpress={() => router.push("/screen/Wallet/Funding/PaymentSuccess")}
          onpress={handlePress}
        />
        <HomeCardItem
          iconName={"tv"}
          buttonName="TV"
          size={30}
          color="red"
          // onpress={() => router.push("/(auth)/login")}
          onpress={handlePress}
        />
        <HomeCardItem
          iconName={"wallet"}
          buttonName="Electricity"
          size={30}
          color="brown"
          // onpress={() => router.push("/(auth)/login")}
          onpress={handlePress}
        />
        <HomeCardItem
          iconName={"wallet"}
          buttonName="Sports"
          size={30}
          color="purple"
          onpress={handlePress}

          // onpress={() => router.push("/(auth)/login")}
        />
        <HomeCardItem
          iconName={"wallet"}
          buttonName="More"
          size={30}
          color="red"
          // onpress={() => router.push("/(tabs)/profile")}
          onpress={handlePress}
        />
      </View>
    </View>
  );
};

export default HomeMenu;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#05161A", // Dark background like the transaction history style
    borderRadius: 10,
    padding: 10,
    margin: 10,
    elevation: 5,
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
