import { WalletContext } from "@/context/waletContext";
import { useContext } from "react";

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("use wallet must be within  a walletProvider");
  }

  return context;
};
