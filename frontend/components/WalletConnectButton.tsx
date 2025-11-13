"use client";

import React from "react";
import { useWallet } from "./WalletProvider";

export function WalletConnectButton() {
  const { session, isConnected, isConnecting, connect, disconnect, error } = useWallet();

  return (
    <div className="flex flex-col items-center gap-4">
      {!isConnected ? (
        <button
          onClick={connect}
          disabled={isConnecting}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </button>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
              Connected: {session?.address.slice(0, 8)}...{session?.address.slice(-8)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Chain: {session?.chainId}
            </p>
          </div>
          <button
            onClick={disconnect}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
          >
            Disconnect
          </button>
        </div>
      )}
      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg max-w-md">
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
