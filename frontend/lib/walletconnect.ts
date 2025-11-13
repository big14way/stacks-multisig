import Client from "@walletconnect/sign-client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { PostConditionMode } from "@stacks/transactions";

// BigInt serialization fix
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "1eebe528ca0ce94a99ceaa2e915058d7";

export interface WalletConnectSession {
  topic: string;
  address: string;
  chainId: string;
}

export class StacksWalletConnect {
  private client: Client | null = null;
  private session: WalletConnectSession | null = null;

  async initialize() {
    if (this.client) return this.client;

    this.client = await Client.init({
      logger: "debug",
      relayUrl: "wss://relay.walletconnect.com",
      projectId: PROJECT_ID,
      metadata: {
        name: "Stacks Multisig",
        description: "Multisig wallet for Stacks blockchain",
        url: typeof window !== "undefined" ? window.location.origin : "https://stacks-multisig.vercel.app",
        icons: ["https://avatars.githubusercontent.com/u/37784886"],
      },
    });

    return this.client;
  }

  async connect(chain: string = "stacks:1") {
    if (!this.client) {
      await this.initialize();
    }

    if (!this.client) {
      throw new Error("Failed to initialize WalletConnect client");
    }

    const { uri, approval } = await this.client.connect({
      pairingTopic: undefined,
      requiredNamespaces: {
        stacks: {
          methods: [
            "stacks_signMessage",
            "stacks_stxTransfer",
            "stacks_contractCall",
            "stacks_contractDeploy",
          ],
          chains: [chain],
          events: [],
        },
      },
    });

    if (uri) {
      QRCodeModal.open(uri, () => {
        console.log("QR Code Modal closed");
      });
    }

    const session = await approval();
    QRCodeModal.close();

    const address = session.namespaces.stacks.accounts[0].split(":")[2];
    this.session = {
      topic: session.topic,
      address,
      chainId: chain,
    };

    return this.session;
  }

  async disconnect() {
    if (this.client && this.session) {
      await this.client.disconnect({
        topic: this.session.topic,
        reason: {
          code: 6000,
          message: "User disconnected",
        },
      });
      this.session = null;
    }
  }

  async signMessage(message: string) {
    if (!this.client || !this.session) {
      throw new Error("Not connected");
    }

    const result = await this.client.request({
      chainId: this.session.chainId,
      topic: this.session.topic,
      request: {
        method: "stacks_signMessage",
        params: {
          pubkey: this.session.address,
          message,
        },
      },
    });

    return result;
  }

  async stxTransfer(recipient: string, amount: bigint, memo?: string) {
    if (!this.client || !this.session) {
      throw new Error("Not connected");
    }

    const result = await this.client.request({
      chainId: this.session.chainId,
      topic: this.session.topic,
      request: {
        method: "stacks_stxTransfer",
        params: {
          pubkey: this.session.address,
          recipient,
          amount,
          memo,
        },
      },
    });

    return result;
  }

  async contractCall(
    contractAddress: string,
    contractName: string,
    functionName: string,
    functionArgs: any[],
    postConditionMode: PostConditionMode = PostConditionMode.Deny,
    postConditions: any[] = []
  ) {
    if (!this.client || !this.session) {
      throw new Error("Not connected");
    }

    const result = await this.client.request({
      chainId: this.session.chainId,
      topic: this.session.topic,
      request: {
        method: "stacks_contractCall",
        params: {
          pubkey: this.session.address,
          contractAddress,
          contractName,
          functionName,
          functionArgs,
          postConditionMode,
          postConditions,
        },
      },
    });

    return result;
  }

  async deployContract(contractName: string, codeBody: string) {
    if (!this.client || !this.session) {
      throw new Error("Not connected");
    }

    const result = await this.client.request({
      chainId: this.session.chainId,
      topic: this.session.topic,
      request: {
        method: "stacks_contractDeploy",
        params: {
          pubkey: this.session.address,
          contractName,
          codeBody,
          postConditionMode: PostConditionMode.Allow,
        },
      },
    });

    return result;
  }

  getSession() {
    return this.session;
  }

  isConnected() {
    return this.session !== null;
  }
}

export const walletConnect = new StacksWalletConnect();
