import React, { createContext, useState } from "react";

interface walletContextType {
  walletBalance: number;
  setWalletBalance: React.Dispatch<React.SetStateAction<number>>;
  isLoggedIn: boolean | null;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;

  username: string | undefined;
  setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;

  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

export const WalletContext = createContext<walletContextType | undefined>(
  undefined
);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [walletBalance, setWalletBalance] = useState(286478934);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState("");

  return (
    <WalletContext.Provider
      value={{
        walletBalance,
        setWalletBalance,
        isLoggedIn,
        setIsLoggedIn,
        username,
        setUsername,
        password,
        setPassword,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
