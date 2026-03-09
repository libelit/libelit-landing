import { ethers, parseUnits } from "ethers";
import { watch } from "fs";

const btknAbi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  { inputs: [], name: "InvalidShortString", type: "error" },
  {
    inputs: [{ internalType: "string", name: "str", type: "string" }],
    name: "StringTooLong",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  { anonymous: false, inputs: [], name: "EIP712DomainChanged", type: "event" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "id", type: "uint256" },
    ],
    name: "Snapshot",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SNAPSHOT_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "snapshotId", type: "uint256" },
    ],
    name: "balanceOfAt",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { internalType: "bytes1", name: "fields", type: "bytes1" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "version", type: "string" },
      { internalType: "uint256", name: "chainId", type: "uint256" },
      { internalType: "address", name: "verifyingContract", type: "address" },
      { internalType: "bytes32", name: "salt", type: "bytes32" },
      { internalType: "uint256[]", name: "extensions", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "hasRole",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "nonces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "snapshot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "snapshotId", type: "uint256" }],
    name: "totalSupplyAt",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const propertyOwnershipAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_eventForwarderAddress",
        type: "address",
      },
      { internalType: "string", name: "_tokenSymbol", type: "string" },
      { internalType: "string", name: "_tokenName", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "btknAmount",
        type: "uint256",
      },
    ],
    name: "BuyTokensFromSale",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "btknAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pptAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "equivalentBTKN",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "remainingBTKN",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "bytes", name: "reason", type: "bytes" },
    ],
    name: "ForwardingFailed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "priceBTKNPerToken",
        type: "uint256",
      },
    ],
    name: "ListTokensForSale",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "btknAmount",
        type: "uint256",
      },
    ],
    name: "sellTokensToPlatform",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "btkn",
    outputs: [{ internalType: "contract BTKN", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "seller", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "buyTokensFromSale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newAddress", type: "address" }],
    name: "changeEventForwarderAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_btkn", type: "uint256" }],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "eventForwarderAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllListedTokens",
    outputs: [
      { internalType: "address[]", name: "", type: "address[]" },
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      { internalType: "uint256[]", name: "", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPPTTokenBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_userAddress", type: "address" },
    ],
    name: "getPPTTokenBalanceByAddress",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalListedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "price", type: "uint256" },
    ],
    name: "listTokensForSale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "listedAddresses",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "listedTokenAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "listedTokenPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "listedTokens",
    outputs: [
      { internalType: "address", name: "seller", type: "address" },
      { internalType: "uint256", name: "tokenAmount", type: "uint256" },
      { internalType: "uint256", name: "price", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceBTKNPerPPT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "removeTokensFromSale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "pptTokenAmount", type: "uint256" },
    ],
    name: "resellTokensToOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_price", type: "uint256" }],
    name: "setPriceBTKNPerPPT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stakingBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "tokenSales",
    outputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "price", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalListedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const btknatokenAddress = "0x955224fF83244B0934a4f10741A060089188724f";
//"0x83339C11Fe487A1eC833A0AB71B3f418ebB6445b";
//"0xa0Ecc60687742981Ca28376E5079fD3828D93b19";
// const propertyOwnershipContractAddress =
//   "0x7fB0ad574479ABBc525A05bb7c5b9Be142bE4002";
// "0x856F0765fE3F10C578aDc7C97FE8F66D2dff2bA3";

export async function getPrice(propertyOwnershipContractAddress: string) {
  const provider = new ethers.BrowserProvider(window.ethereum as any);

  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    propertyOwnershipContractAddress,
    propertyOwnershipAbi,
    signer
  );
  let price = null;
  try {
    price = await contract.priceBTKNPerPPT();
  } catch (error) {
    console.log(error);
  }

  return price;
}
export async function getBalance(accountAddress: String) {
  const provider = new ethers.BrowserProvider(window.ethereum as any);
  const tokenContract = new ethers.Contract(
    btknatokenAddress,
    btknAbi,
    provider
  );

  try {
    const rawBalance = await tokenContract.balanceOf(accountAddress);

    const balance = Number(ethers.formatUnits(rawBalance, 18));

    return balance;
  } catch (error) {
    console.log(error);
  }
}

export async function approveToSell(
  amount: number,
  propertyOwnershipContractAddress: String,
  setTransaction?: any
) {
  console.log(propertyOwnershipContractAddress);
  const ContractAbi = btknAbi;

  const provider = new ethers.BrowserProvider(window.ethereum as any);

  const signer = await provider.getSigner();

  const tokenContract = new ethers.Contract(
    btknatokenAddress,
    ContractAbi,
    signer
  );

  const adjustedAmount = ethers.parseUnits(amount.toString(), 18);

  //const amountInBaseUnits = ethers.parseUnits(amount.toString(), 18);
  try {
    // await tokenContract.transfer(
    //   "0x83339c11fe487a1ec833a0ab71b3f418ebb6445b",
    //   0
    // );
    const approvalTx = await tokenContract.approve(
      propertyOwnershipContractAddress,
      adjustedAmount
    );

    if (setTransaction) setTransaction(approvalTx);

    await approvalTx.wait();
    console.log("Transaction approved by default");

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function purchase(
  amountInBtkn: Number,
  propertyOwnershipContractAddress: string
) {
  const provider = new ethers.BrowserProvider(window.ethereum as any);

  const signer = await provider.getSigner();

  try {
    const contract = new ethers.Contract(
      propertyOwnershipContractAddress,
      propertyOwnershipAbi,
      signer
    );
    console.log(propertyOwnershipContractAddress);
    const tx = await contract.deposit(amountInBtkn);

    // const tx = await contract.transferFrom(
    //   "0x83339C11Fe487A1eC833A0AB71B3f418ebB6445b",
    //   propertyOwnershipContractAddress,
    //   0
    // );

    await tx.wait();

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function listTokensForSale(
  numberOfTokens: number,
  pricePerToken: number,
  propertyOwnershipContractAddress: string
) {
  const provider = new ethers.BrowserProvider(window.ethereum as any);

  const signer = await provider.getSigner();

  try {
    const contract = new ethers.Contract(
      propertyOwnershipContractAddress,
      propertyOwnershipAbi,
      signer
    );

    console.log(propertyOwnershipContractAddress);

    // const tokenAmount = ethers.parseUnits(numberOfTokens.toString(), 18);

    const tx = await contract.listTokensForSale(numberOfTokens, pricePerToken);

    await tx.wait();

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getListedTokens(
  propertyOwnershipContractAddress: string
) {
  const provider = new ethers.BrowserProvider(window.ethereum as any);
  let signer;
  try {
    signer = await provider.getSigner();
  } catch (error) {
    return;
  }

  try {
    const contract = new ethers.Contract(
      propertyOwnershipContractAddress,
      propertyOwnershipAbi,
      signer
    );
    console.log(propertyOwnershipContractAddress);
    const listedTokensRaw = await contract.getAllListedTokens();

    const listedTokens = [];
    for (let i in listedTokensRaw[0]) {
      listedTokens.push({
        seller: listedTokensRaw[0][i],
        numberOfTokens: listedTokensRaw[1][i],
        pricePerToken: listedTokensRaw[2][i],
      });
    }
    console.log(listedTokens);
    // const [tokenAmounts, sellers, prices, indices] = listedTokens;
    // console.log("Listed Tokens:");
    // for (let i = 0; i < tokenAmounts.length; i++) {
    //   console.log(
    //     `Index: ${indices[i].toString()}, Seller: ${
    //       sellers[i]
    //     }, Token Amount: ${tokenAmounts[i]}, Price: ${ethers.formatUnits(
    //       prices[i],
    //       18
    //     )}`
    //   );
    // }

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function buyTokensForSale(
  seller: string,
  numberOfTokens: number,
  price: number,
  propertyOwnershipContractAddress: string
) {
  const provider = new ethers.BrowserProvider(window.ethereum as any);

  const signer = await provider.getSigner();
  console.log(propertyOwnershipContractAddress);
  try {
    const contract = new ethers.Contract(
      propertyOwnershipContractAddress,
      propertyOwnershipAbi,
      signer
    );

    await approveToSell(
      numberOfTokens * price,
      propertyOwnershipContractAddress
    );
    console.log(seller, numberOfTokens);
    const txn = await contract.buyTokensFromSale(seller, numberOfTokens);

    txn.wait();

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function removeTokensFromSale(
  propertyOwnershipContractAddress: string
) {
  const provider = new ethers.BrowserProvider(window.ethereum as any);

  const signer = await provider.getSigner();

  try {
    const contract = new ethers.Contract(
      propertyOwnershipContractAddress,
      propertyOwnershipAbi,
      signer
    );

    console.log(propertyOwnershipContractAddress);

    // const tokenAmount = ethers.parseUnits(numberOfTokens.toString(), 18);

    const tx = await contract.removeTokensFromSale();

    await tx.wait();

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTokenBalance(
  propertyOwnershipContractAddress: string,
  address: string
) {
  const provider = new ethers.BrowserProvider(window.ethereum as any);

  const signer = await provider.getSigner();

  try {
    const contract = new ethers.Contract(
      propertyOwnershipContractAddress,
      propertyOwnershipAbi,
      signer
    );

    console.log(propertyOwnershipContractAddress);

    // const tokenAmount = ethers.parseUnits(numberOfTokens.toString(), 18);

    const rawBalance = await contract.getPPTTokenBalanceByAddress(address);
    const balance = Number(ethers.formatUnits(rawBalance, 18));
    return balance;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function resellBackTokens(
  tokenAmount: number,
  propertyOwnershipContractAddress: string
) {
  const provider = new ethers.BrowserProvider(window.ethereum as any);

  const signer = await provider.getSigner();

  try {
    const contract = new ethers.Contract(
      propertyOwnershipContractAddress,
      propertyOwnershipAbi,
      signer
    );

    const adjustedAmount = ethers.parseUnits(tokenAmount.toString(), 18);
    const response = await contract.approve(
      propertyOwnershipContractAddress,
      adjustedAmount
    );
    await response.wait();
    const tx = await contract.resellTokensToOwner(adjustedAmount);

    await tx.wait();

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
