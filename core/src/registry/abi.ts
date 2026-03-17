export const SentryRegistryAbi = [
  {
    type: "function",
    name: "admin",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
  {
    type: "function",
    name: "isRegistered",
    stateMutability: "view",
    inputs: [{ name: "userIdHash", type: "bytes32" }],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    type: "function",
    name: "getProfile",
    stateMutability: "view",
    inputs: [{ name: "userIdHash", type: "bytes32" }],
    outputs: [
      { name: "wallet", type: "address" },
      { name: "owner", type: "address" },
      { name: "personality", type: "uint8" },
      { name: "registered", type: "bool" },
    ],
  },
  {
    type: "function",
    name: "registerUser",
    stateMutability: "nonpayable",
    inputs: [
      { name: "userIdHash", type: "bytes32" },
      { name: "owner", type: "address" },
      { name: "personality", type: "uint8" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "linkWallet",
    stateMutability: "nonpayable",
    inputs: [
      { name: "userIdHash", type: "bytes32" },
      { name: "wallet", type: "address" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "reserveFunds",
    stateMutability: "nonpayable",
    inputs: [
      { name: "userIdHash", type: "bytes32" },
      { name: "taskIdHash", type: "bytes32" },
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "releaseReservation",
    stateMutability: "nonpayable",
    inputs: [
      { name: "userIdHash", type: "bytes32" },
      { name: "taskIdHash", type: "bytes32" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "getReservation",
    stateMutability: "view",
    inputs: [
      { name: "userIdHash", type: "bytes32" },
      { name: "taskIdHash", type: "bytes32" },
    ],
    outputs: [
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "active", type: "bool" },
    ],
  },
  {
    type: "function",
    name: "storeAgentAuthorization",
    stateMutability: "nonpayable",
    inputs: [
      { name: "userIdHash", type: "bytes32" },
      { name: "agentIdHash", type: "bytes32" },
      { name: "signature", type: "bytes" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "getAgentAuthorization",
    stateMutability: "view",
    inputs: [
      { name: "userIdHash", type: "bytes32" },
      { name: "agentIdHash", type: "bytes32" },
    ],
    outputs: [{ name: "", type: "bytes" }],
  },
] as const;

