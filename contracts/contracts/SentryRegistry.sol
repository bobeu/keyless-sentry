// SPDX-License-Identifier: MIT
pragma solidity 0.8.34;

/// @title SentryRegistry
/// @notice Decentralized backend for Sentry user profiles (chat-first identity).
///         Key is keccak256 hash of external user id (e.g. Telegram/WhatsApp).
contract SentryRegistry {
    error NotAdmin();
    error AlreadyRegistered(bytes32 userIdHash);
    error NotRegistered(bytes32 userIdHash);
    error InvalidPersonality(uint8 personality);
    error ZeroAddress();

    event AdminTransferred(address indexed previousAdmin, address indexed newAdmin);
    event UserRegistered(bytes32 indexed userIdHash, address indexed owner, address indexed wallet, uint8 personality);
    event WalletLinked(bytes32 indexed userIdHash, address indexed wallet);
    event FundsReserved(bytes32 indexed userIdHash, bytes32 indexed taskIdHash, address indexed token, uint256 amount);
    event ReservationReleased(bytes32 indexed userIdHash, bytes32 indexed taskIdHash);
    event AgentAuthorizationStored(bytes32 indexed userIdHash, bytes32 indexed agentIdHash, bytes signature);

    struct UserProfile {
        address wallet;
        address owner;
        uint8 personality; // immutable once set at registration
        bool registered;
    }

    mapping(bytes32 => UserProfile) private profiles;
    struct Reservation {
        address token;
        uint256 amount;
        bool active;
    }
    mapping(bytes32 => mapping(bytes32 => Reservation)) private reservations; // userIdHash => taskIdHash => reservation
    // mapping(bytes32 => mapping(bytes32 => bytes)) private agentAuthSignatures; // userIdHash => agentIdHash => signature
    address public admin;

    constructor(address admin_) {
        if (admin_ == address(0)) revert ZeroAddress();
        admin = admin_;
        emit AdminTransferred(address(0), admin_);
    }

    modifier onlyAdmin() {
        if (msg.sender != admin) revert NotAdmin();
        _;
    }

    function transferAdmin(address newAdmin) external onlyAdmin {
        if (newAdmin == address(0)) revert ZeroAddress();
        emit AdminTransferred(admin, newAdmin);
        admin = newAdmin;
    }

    function isRegistered(bytes32 userIdHash) external view returns (bool) {
        return profiles[userIdHash].registered;
    }

    function getProfile(bytes32 userIdHash) external view returns (address wallet, address owner, uint8 personality, bool registered) {
        UserProfile memory p = profiles[userIdHash];
        return (p.wallet, p.owner, p.personality, p.registered);
    }

    /// @notice Register a new user profile (owner + personality; wallet can be set later).
    function registerUser(bytes32 userIdHash, address owner, uint8 personality) external onlyAdmin {
        if (profiles[userIdHash].registered) revert AlreadyRegistered(userIdHash);
        if (owner == address(0)) revert ZeroAddress();
        if (personality > 2) revert InvalidPersonality(personality);

        profiles[userIdHash] = UserProfile({
            wallet: address(0),
            owner: owner,
            personality: personality,
            registered: true
        });

        emit UserRegistered(userIdHash, owner, address(0), personality);
    }

    /// @notice Link the created Keyless Wallet to a registered user.
    function linkWallet(bytes32 userIdHash, address wallet) external onlyAdmin {
        if (!profiles[userIdHash].registered) revert NotRegistered(userIdHash);
        if (wallet == address(0)) revert ZeroAddress();

        profiles[userIdHash].wallet = wallet;
        emit WalletLinked(userIdHash, wallet);
    }

    /// @notice Record an escrow reservation for a task (funds remain in the Keyless Wallet).
    function reserveFunds(bytes32 userIdHash, bytes32 taskIdHash, address token, uint256 amount) external onlyAdmin {
        if (!profiles[userIdHash].registered) revert NotRegistered(userIdHash);
        if (token == address(0)) revert ZeroAddress();
        reservations[userIdHash][taskIdHash] = Reservation({ token: token, amount: amount, active: true });
        emit FundsReserved(userIdHash, taskIdHash, token, amount);
    }

    function releaseReservation(bytes32 userIdHash, bytes32 taskIdHash) external onlyAdmin {
        if (!profiles[userIdHash].registered) revert NotRegistered(userIdHash);
        reservations[userIdHash][taskIdHash].active = false;
        emit ReservationReleased(userIdHash, taskIdHash);
    }

    function getReservation(bytes32 userIdHash, bytes32 taskIdHash) external view returns (address token, uint256 amount, bool active) {
        Reservation memory r = reservations[userIdHash][taskIdHash];
        return (r.token, r.amount, r.active);
    }

    /// @notice Store an owner-signed AgentAuthorization signature for later sub-transactions.
    // function storeAgentAuthorization(bytes32 userIdHash, bytes32 agentIdHash, bytes calldata signature) external onlyAdmin {
    //     if (!profiles[userIdHash].registered) revert NotRegistered(userIdHash);
    //     agentAuthSignatures[userIdHash][agentIdHash] = signature;
    //     emit AgentAuthorizationStored(userIdHash, agentIdHash, signature);
    // }

    // function getAgentAuthorization(bytes32 userIdHash, bytes32 agentIdHash) external view returns (bytes memory) {
    //     return agentAuthSignatures[userIdHash][agentIdHash];
    // }
}

