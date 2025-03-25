import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface PropsType {
  title?: string;
}

const CustomModal: React.FC<PropsType> = ({ title }) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({});
