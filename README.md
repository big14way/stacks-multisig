# Stacks Multisig

Code for the [LearnWeb3](https://learnweb3.io) course about building a Multisig contract. Part of the [Stacks Developer Degree](https://learnweb3.io/degrees/stacks-developer-degree).

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
