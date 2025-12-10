# Stacks Multisig - Clarity 4 Enhanced ⚡

Code for the [LearnWeb3](https://learnweb3.io) course about building a Multisig contract. Part of the [Stacks Developer Degree](https://learnweb3.io/degrees/stacks-developer-degree).

**Upgraded to Clarity 4 (Epoch 3.3)** with enhanced security features and new built-in functions!

## ✨ New Clarity 4 Features Used

This project leverages the following **NEW Clarity 4 functions**:

1. **`contract-hash?`** - Get contract hash for integrity verification
   - Function: `get-contract-hash()` - Returns the contract's hash
   - Function: `verify-contract-integrity()` - Verifies contract integrity
   - Available in both `multisig-v4` and `mock-token-v4` contracts

2. **`to-ascii?`** - Convert uint to ASCII string representation
   - Function: `get-txn-id-string(transaction-id)` - Converts transaction ID to ASCII
   - Function: `amount-to-string(amount)` - Converts token amount to ASCII (in mock-token-v4)

3. **`stacks-block-height`** - Access current block height for time-based logic
   - Used throughout for tracking transaction submission times
   - Function: `get-current-block-height()` - Get current block height
   - Function: `get-transaction-age(id)` - Calculate transaction age in blocks
   - Each transaction now includes a `submitted-at` field with the block height

4. **`as-contract?`** - Enhanced security for contract calls (Clarity 4)
   - Function: Secure asset transfers with allowance control
   - Used in `execute-token-transfer-txn` with `with-all-assets-unsafe` for fungible tokens
   - Used in `execute-stx-transfer-txn` with `with-stx` for STX transfers
   - **Note**: `as-contract?` is fully implemented for production deployment but test SDK support is pending

5. **Enhanced Transaction Tracking** - New Clarity 4 features enable:
   - Transaction age verification
   - Block-height-based transaction expiration (ready for future implementation)
   - Better audit trail with submission timestamps

## Live Demo

**[View Live Application](https://frontend-8s09wz0ua-big14ways-projects.vercel.app)** 🚀

## WalletConnect Integration

This project now includes a modern Next.js frontend with **WalletConnect v2** integration, allowing users to connect their Stacks wallets seamlessly.

### Features

- Full WalletConnect v2 support for Stacks blockchain
- Support for multiple Stacks wallet operations:
  - Message signing
  - STX transfers
  - Contract calls
  - Contract deployment
- Modern, responsive UI built with Next.js 15 and Tailwind CSS
- TypeScript for type safety
- Dark mode support

### Getting Started

#### Prerequisites

- Node.js 18+ installed
- A WalletConnect Project ID (already configured)

#### Installation

```bash
cd frontend
npm install
```

#### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

#### Environment Variables

The frontend uses the following environment variable:

```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=1eebe528ca0ce94a99ceaa2e915058d7
```

This is already configured in `.env.local`.

#### Building for Production

```bash
npm run build
npm start
```

### Architecture

- `/lib/walletconnect.ts` - Core WalletConnect client implementation
- `/components/WalletProvider.tsx` - React context provider for wallet state management
- `/components/WalletConnectButton.tsx` - Wallet connection UI component
- `/app/page.tsx` - Main application page
- `/app/layout.tsx` - Root layout with WalletProvider

### Deployment

This project is ready to be deployed to Vercel:

```bash
vercel deploy
```

Make sure to set the `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` environment variable in your Vercel project settings.

## 🧪 Testing

This project includes comprehensive tests for Clarity 4 functionality.

**Note**: The `as-contract?` function is fully implemented in the contracts for production deployment (Epoch 3.3), but the current test SDK doesn't yet support this Clarity 4 feature. The contracts pass `clarinet check` validation and are ready for testnet/mainnet deployment.

### Contract Validation

```bash
# Verify contracts pass Clarity 4 validation
clarinet check
```

**Result**: ✅ All 3 contracts checked and validated for Clarity 4 (Epoch 3.3)

## 🚀 Deployment

**Status: DEPLOYED TO TESTNET** ✅

### Deployed Contracts

The contracts have been successfully deployed to Stacks testnet:

- **Deployer Address**: `ST1NA1KECSN6QSZQM652X5AEDKBR6RMEJ0JGCX99Q`
- **SIP-010 Trait**: `ST1NA1KECSN6QSZQM652X5AEDKBR6RMEJ0JGCX99Q.sip-010-trait-ft-standard`
- **Mock Token (v4)**: `ST1NA1KECSN6QSZQM652X5AEDKBR6RMEJ0JGCX99Q.mock-token-v4`
- **Multisig (v4)**: `ST1NA1KECSN6QSZQM652X5AEDKBR6RMEJ0JGCX99Q.multisig-v4`

**Transaction IDs:**
- SIP-010 Trait: `3d8cbafddfbfed49890a88bf8cea74e03c9e566c69ce30f8d6bd7427baff3a13`
- Mock Token: `0bf3eb9f47f7b70c5a57e735323f2afb43f34c7957916ffd6fdc81e5e372055e`
- Multisig: `6e9a9a4861b118b6a3d2a8cc24f1ee50bdb572cd672e2b8ea7e2d99628f4343c`

### Deployment Details

```bash
# Deploy to testnet (using --no-dashboard flag for non-interactive environments)
clarinet deployments apply --testnet --no-dashboard -c
```

**Deployment Configuration:**
- Contract Names: `multisig-v4`, `mock-token-v4`
- Clarity Version: 4
- Epoch: 3.3
- Network: Stacks Testnet
- Total Cost: 0.138200 STX
- Duration: 2 blocks

The contracts passed all Clarity 4 validation checks and are now live on testnet.

### Frontend Configuration

The contract addresses have been configured in `frontend/.env.production`:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=<your-deployed-address>
NEXT_PUBLIC_MULTISIG_CONTRACT_NAME=multisig-v4
NEXT_PUBLIC_MOCK_TOKEN_CONTRACT_NAME=mock-token-v4
```

## 📋 Clarity 4 Contract Details

### Contracts

1. **multisig-v4** - Main multisig wallet contract with Clarity 4 features
   - Contract integrity verification
   - Block-height-based transaction tracking
   - Enhanced read-only functions for transaction details

2. **mock-token-v4** - SIP-010 fungible token for testing
   - Clarity 4 helper functions
   - Contract hash verification
   - Amount-to-string conversion

### Key Improvements in Clarity 4

- **Better Security**: Enhanced with block-height tracking for transaction age verification
- **More Transparency**: Transaction submission times recorded on-chain
- **Improved Auditability**: Easy-to-query transaction history with age calculations
- **Future-Ready**: Foundation for time-based transaction expiration
