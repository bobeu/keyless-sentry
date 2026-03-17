import { expect } from "chai";
import { ethers } from "hardhat";
import type { SentryRegistry } from "../typechain-types";
import "@nomicfoundation/hardhat-chai-matchers";

describe("SentryRegistry", function () {
  let sentry: SentryRegistry;
  let signers: any[];
  let owner: any;

  beforeEach(async function () {
    signers = await ethers.getSigners();
    owner = signers[0];

    // Deploy SentryRegistry
    const SentryFactory = await ethers.getContractFactory("SentryRegistry");
    sentry = (await SentryFactory.deploy(await owner.getAddress())) as SentryRegistry;
    await sentry.waitForDeployment();
  });

  describe("Deployment", function () {
    it("should set the correct owner", async function () {
      expect(await core.owner()).to.equal(await owner.getAddress());
    });

    it("should set the correct coordinator", async function () {
      expect(await core.coordinator()).to.equal(await coordinator.getAddress());
    });

    it("should set the correct policy registry", async function () {
      expect(await core.policyRegistry()).to.equal(await policy.getAddress());
    });

    it("should reject zero coordinator address", async function () {
      const CoreFactory = await ethers.getContractFactory("KeylessCore");
      await expect(
        CoreFactory.deploy(
          await owner.getAddress(),
          ethers.ZeroAddress,
          await treasury.getAddress(),
          await policy.getAddress()
        )
      ).to.be.revertedWith("Invalid coord");
    });

    it("should reject zero treasury address", async function () {
      const CoreFactory = await ethers.getContractFactory("KeylessCore");
      await expect(
        CoreFactory.deploy(
          await owner.getAddress(),
          await coordinator.getAddress(),
          ethers.ZeroAddress,
          await policy.getAddress()
        )
      ).to.be.revertedWith("Invalid Treasury");
    });
  });

  describe("setCoordinator", function () {
    it("should allow owner to set new coordinator", async function () {
      const newCoordinator = await signers[3].getAddress();
      await core.connect(owner).setCoordinator(newCoordinator);
      expect(await core.coordinator()).to.equal(newCoordinator);
    });

    it("should emit CoordinatorUpdated event", async function () {
      const newCoordinator = await signers[3].getAddress();
      await expect(core.connect(owner).setCoordinator(newCoordinator))
        .to.emit(core, "CoordinatorUpdated")
        .withArgs(await coordinator.getAddress(), newCoordinator);
    });

    it("should reject zero address", async function () {
      await expect(
        core.connect(owner).setCoordinator(ethers.ZeroAddress)
      ).to.be.revertedWith("Invalid");
    });

    it("should reject non-owner", async function () {
      await expect(
        core.connect(coordinator).setCoordinator(await signers[3].getAddress())
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("setPolicyRegistry", function () {
    it("should allow owner to set new policy registry", async function () {
      const PolicyFactory = await ethers.getContractFactory("PolicyRegistry");
      const newPolicy = (await PolicyFactory.deploy(
        await owner.getAddress(),
        await coordinator.getAddress()
      )) as PolicyRegistry;
      await newPolicy.waitForDeployment();

      await core.connect(owner).setPolicyRegistry(await newPolicy.getAddress());
      expect(await core.policyRegistry()).to.equal(await newPolicy.getAddress());
    });

    it("should reject zero address", async function () {
      await expect(
        core.connect(owner).setPolicyRegistry(ethers.ZeroAddress)
      ).to.be.revertedWith("Invalid policy");
    });
  });

  describe("getWallet and hasWallet", function () {
    it("should return zero address for user without wallet", async function () {
      const user = await signers[5].getAddress();
      expect(await core.getWallet(user)).to.equal(ethers.ZeroAddress);
      expect(await core.hasWallet(user)).to.equal(false);
    });
  });

  describe("computeWalletAddress", function () {
    it("should compute correct wallet address", async function () {
      const user = await signers[5].getAddress();
      const salt = ethers.id("test-salt");
      const computedAddr = await core.computeWalletAddress(user, salt);
      expect(computedAddr).to.not.equal(ethers.ZeroAddress);
    });
  });

  describe("createWallet - validation", function () {
    it("should reject invalid signature", async function () {
      const user = signers[5];
      const signersAddresses: [string, string, string] = [
        await signers[6].getAddress(),
        await signers[7].getAddress(),
        await signers[8].getAddress(),
      ];
      const salt = ethers.id("test-salt");

      const nonce = await core.nonces(user.getAddress());
      // Sign with wrong signer
      const signature = await createWalletSignature(
        core,
        await user.getAddress(),
        nonce,
        salt,
        signers[6]
      );

      await expect(
        core
          .connect(coordinator)
          .createWallet(await user.getAddress(), signersAddresses, signature, salt)
      ).to.be.revertedWith("Invalid signature");
    });

    it("should reject non-coordinator", async function () {
      const user = signers[5];
      const signersAddresses: [string, string, string] = [
        await signers[6].getAddress(),
        await signers[7].getAddress(),
        await signers[8].getAddress(),
      ];
      const salt = ethers.id("test-salt");

      const nonce = await core.nonces(user.getAddress());
      const signature = await createWalletSignature(
        core,
        await user.getAddress(),
        nonce,
        salt,
        user
      );

      await expect(
        core
          .connect(owner)
          .createWallet(
            await user.getAddress(),
            signersAddresses,
            signature,
            salt
          )
      ).to.be.revertedWith("Not coordinator");
    });
  });

  describe("domainSeparator", function () {
    it("should return valid domain separator", async function () {
      const domainSep = await core.domainSeparator();
      expect(domainSep).to.not.equal(ethers.ZeroHash);
    });
  });
});

describe("PolicyRegistry", function () {
  let policy: PolicyRegistry;
  let signers: any[];
  let owner: any;
  let coordinator: any;

  beforeEach(async function () {
    signers = await ethers.getSigners();
    owner = signers[0];
    coordinator = signers[1];

    const PolicyFactory = await ethers.getContractFactory("PolicyRegistry");
    policy = (await PolicyFactory.deploy(
      await owner.getAddress(),
      await coordinator.getAddress()
    )) as PolicyRegistry;
    await policy.waitForDeployment();
  });

  describe("Deployment", function () {
    it("should set the correct owner", async function () {
      expect(await policy.owner()).to.equal(await owner.getAddress());
    });

    it("should reject zero coordinator address", async function () {
      const PolicyFactory = await ethers.getContractFactory("PolicyRegistry");
      await expect(
        PolicyFactory.deploy(await owner.getAddress(), ethers.ZeroAddress)
      ).to.be.revertedWith("Coordinator is zero address");
    });
  });

  describe("setWallet", function () {
    it("should allow owner to set wallet address", async function () {
      const walletAddr = await signers[2].getAddress();
      await policy.connect(owner).setWallet(walletAddr);
      expect(await policy.wallet()).to.equal(walletAddr);
    });
  });

  describe("whitelistWallet", function () {
    it("should whitelist a wallet", async function () {
      const walletAddr = await signers[3].getAddress();
      await policy.connect(owner).whitelistWallet(walletAddr, true);
      expect(await policy.walletWhitelist(walletAddr)).to.equal(true);
    });

    it("should remove wallet from whitelist", async function () {
      const walletAddr = await signers[3].getAddress();
      await policy.connect(owner).whitelistWallet(walletAddr, true);
      await policy.connect(owner).whitelistWallet(walletAddr, false);
      expect(await policy.walletWhitelist(walletAddr)).to.equal(false);
    });

    it("should allow coordinator to whitelist wallet", async function () {
      const walletAddr = await signers[3].getAddress();
      await policy.connect(coordinator).whitelistWallet(walletAddr, true);
      expect(await policy.walletWhitelist(walletAddr)).to.equal(true);
    });

    it("should emit ContractWhitelisted event", async function () {
      const walletAddr = await signers[3].getAddress();
      await expect(policy.connect(owner).whitelistWallet(walletAddr, true))
        .to.emit(policy, "ContractWhitelisted")
        .withArgs(walletAddr, true);
    });
  });

  describe("whitelistToken", function () {
    it("should whitelist a token", async function () {
      const token = await signers[4].getAddress();
      const wallet = await signers[5].getAddress();
      await policy.connect(owner).setWallet(wallet);
      await policy.connect(owner).whitelistToken(token, true);
      expect(await policy.tokenWhitelist(wallet, token)).to.equal(true);
    });

    it("should remove token from whitelist", async function () {
      const token = await signers[4].getAddress();
      const wallet = await signers[5].getAddress();
      await policy.connect(owner).setWallet(wallet);
      await policy.connect(owner).whitelistToken(token, true);
      await policy.connect(owner).whitelistToken(token, false);
      expect(await policy.tokenWhitelist(wallet, token)).to.equal(false);
    });

    it("should emit TokenWhitelisted event", async function () {
      const token = await signers[4].getAddress();
      const wallet = await signers[5].getAddress();
      await policy.connect(owner).setWallet(wallet);
      await expect(policy.connect(owner).whitelistToken(token, true))
        .to.emit(policy, "TokenWhitelisted")
        .withArgs(token, true);
    });
  });

  describe("setTokenDailyLimit", function () {
    it("should set token daily limit", async function () {
      const token = await signers[4].getAddress();
      const wallet = await signers[5].getAddress();
      await policy.connect(owner).setWallet(wallet);
      const limit = ethers.parseEther("100");
      await policy.connect(owner).setTokenDailyLimit(token, limit);
      expect(await policy.tokenDailyLimit(wallet, token)).to.equal(limit);
    });

    it("should emit TokenDailyLimitUpdated event", async function () {
      const token = await signers[4].getAddress();
      const wallet = await signers[5].getAddress();
      await policy.connect(owner).setWallet(wallet);
      const limit = ethers.parseEther("100");
      await expect(policy.connect(owner).setTokenDailyLimit(token, limit))
        .to.emit(policy, "TokenDailyLimitUpdated")
        .withArgs(token, limit);
    });
  });

  describe("getDailySpent", function () {
    it("should return 0 for wallet with no spend", async function () {
      const wallet = await signers[5].getAddress();
      const result = await policy.getDailySpent(wallet);
      expect(result).to.equal(0);
    });
  });

  describe("getTokenDailySpent", function () {
    it("should return 0 for token with no spend", async function () {
      const wallet = await signers[5].getAddress();
      const token = await signers[6].getAddress();
      const result = await policy.getTokenDailySpent(wallet, token);
      expect(result).to.equal(0);
    });
  });
});
