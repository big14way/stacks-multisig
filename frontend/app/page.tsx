import { WalletConnectButton } from "@/components/WalletConnectButton";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex w-full max-w-4xl flex-col items-center gap-12 px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Stacks Multisig
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Secure multisignature wallet for Stacks blockchain
          </p>
          <div className="mt-4 px-4 py-2 bg-green-100 dark:bg-green-900 rounded-lg inline-block">
            <p className="text-sm font-semibold text-green-800 dark:text-green-200">
              WalletConnect Integrated
            </p>
          </div>
        </div>

        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Connect Your Wallet
          </h2>
          <WalletConnectButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Multisig Security
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Require multiple signatures for transaction approval
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              WalletConnect
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Connect with any WalletConnect-compatible wallet
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Stacks Ready
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Full support for Stacks blockchain operations
            </p>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Powered by WalletConnect v2 and Stacks.js</p>
        </div>
      </main>
    </div>
  );
}
