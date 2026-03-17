import type { HardhatUserConfig } from "hardhat/config";
import { config as dotconfig } from "dotenv";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "@nomicfoundation/hardhat-viem";

dotconfig();

const config: HardhatUserConfig = {
  
  networks: {
    celoSepolia: {
      url: process.env.CELO_SEPOLIA_RPC || "https://forno.celo-sepolia.celo-testnet.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11142220,
    },
    celo: {
      url: process.env.CELO_MAINNET_RPC || "https://forno.celo.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 42220,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    }
  },
  etherscan: {
    // apiKey: {
    //   celo: process.env.CELOSCAN_API_KEY ?? '',
    //   celoSepolia: process.env.CELOSCAN_API_KEY ?? '',
    // },
    apiKey: process.env.CELOSCAN_API_KEY ?? '',
    customChains: [
      {
        chainId: 11142220,
        network: 'celoSepolia',
        urls: {
          // apiURL: 'https://api-sepolia.celoscan.io/api',
          apiURL: 'https://api.etherscan.io/v2/api',
          // apiURL: 'https://api.polygonscan.com/api?&action=balance&apikey=YourPolygonscanApiKey',
          browserURL: 'https://sepolia.celoscan.io',
        },
      },
      {
        chainId: 42220,
        network: 'celo',
        urls: {
          // apiURL: 'https://api.celoscan.io/api',
          apiURL: 'https://api.etherscan.io/v2/api',
          browserURL: 'https://celoscan.io/',
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
  namedAccounts: {
    deployer: {
      default: 0,
      11142220: `privatekey://${process.env.PRIVATE_KEY as string}`,
      42220: `privatekey://${process.env.PRIVATE_KEY as string}`,
    }
  },

  solidity: {
    version: "0.8.34",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: 'prague',
    }
  },
};

export default config;
