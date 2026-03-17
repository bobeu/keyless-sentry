import fs from "fs";
import path from "path";
import type { HardhatRuntimeEnvironment } from "hardhat/types";

module.exports = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log(`\nDeploying contracts to ${network.name}...`);
  console.log(`Deployer: ${deployer}`);

  // Deploy SentryRegistry
  const sentryRegistry = await deploy("SentryRegistry", {
    from: deployer,
    args: [deployer],
    log: true,
    waitConfirmations: network.name === "localhost" ? 1 : 2,
  });

  console.log(`PolicyRegistry deployed to: ${sentryRegistry.address}`);

  // Persist addresses to packages/config/addresses.json
  const chainId = hre.network.config.chainId;
  if (chainId) {
    const addressesPath = path.join(__dirname, "..", "..", "config", "addresses.json");
    const dir = path.dirname(addressesPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let addresses: Record<string, any> = {};
    if (fs.existsSync(addressesPath)) {
      try {
        const raw = fs.readFileSync(addressesPath, "utf8");
        if (raw.trim().length > 0) {
          addresses = JSON.parse(raw);
        }
      } catch {
        addresses = {};
      }
    }

    const key = String(chainId);
    if (!addresses[key]) {
      addresses[key] = {};
    }

    addresses[key].SentryRegistry = sentryRegistry.address;

    fs.writeFileSync(addressesPath, JSON.stringify(addresses, null, 2));
    console.log(`\nSaved addresses for chain ${key} to ${addressesPath}`);
  }
  
  // Verify on block explorer if not localhost
  if (network.name !== "localhost" && network.name !== "hardhat") {
    console.log(`\nTo verify on ${network.name}:`);
    console.log(
      `  npx hardhat verify --network ${network.name} ${sentryRegistry.address} ${deployer}`,
    );
  }
};

module.exports.tags = ["SentryRegistry"];
module.exports.dependencies = [];
