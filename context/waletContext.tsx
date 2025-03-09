import React, { createContext, useState } from "react";

interface walletContextType {
  walletBalance: number;
  setWalletBalance: React.Dispatch<React.SetStateAction<number>>;
}

export const WalletContext = createContext<walletContextType | undefined>(
  undefined
);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [walletBalance, setWalletBalance] = useState(0);

  return (
    <WalletContext.Provider value={{ walletBalance, setWalletBalance }}>
      {children}
    </WalletContext.Provider>
  );
};
