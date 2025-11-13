"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { walletConnect, WalletConnectSession } from "@/lib/walletconnect";

interface WalletContextType {
  session: WalletConnectSession | null;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  error: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<WalletConnectSession | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session on mount
    const existingSession = walletConnect.getSession();
    if (existingSession) {
      setSession(existingSession);
    }
  }, []);

  const connect = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      const newSession = await walletConnect.connect();
      setSession(newSession);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to connect";
      setError(errorMessage);
      console.error("Connection error:", err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {
    try {
      await walletConnect.disconnect();
      setSession(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to disconnect";
      setError(errorMessage);
      console.error("Disconnect error:", err);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        session,
        isConnected: session !== null,
        isConnecting,
        connect,
        disconnect,
        error,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
