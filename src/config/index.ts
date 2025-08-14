import { ethers } from "ethers";

export const OWNER = ""

export const config = {
    appName: "Hermes Games",
    projectId: "8X1df9Wbcqj6A7LWG71Ra5yLYj-1eL7y",
    chains: ["sepolia"],
};

export const getGameData = async (gameId: string) => {
  try {
    const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_PROJECT_ID");
    // Example: Fetching block number
    const blockNumber = await provider.getBlockNumber();
    return { gameId, blockNumber };
  } catch (error) {
    console.error("Error fetching game data:", error);
    return null;
  }
};


export const RandomizerRouter = {
	address:"0x123121Df4cd41f3Bba2A229d5A898255EB21D6B8",
	abi:[
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "requestId",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "consumer",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "provider",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256[]",
					"name": "randoms",
					"type": "uint256[]"
				}
			],
			"name": "Fulfilled",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "requestId",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "consumer",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "provider",
					"type": "address"
				}
			],
			"name": "ReRequested",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "requestId",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "consumer",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "provider",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint32",
					"name": "count",
					"type": "uint32"
				}
			],
			"name": "RequestCreated",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "previousAdminRole",
					"type": "bytes32"
				},
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "newAdminRole",
					"type": "bytes32"
				}
			],
			"name": "RoleAdminChanged",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "sender",
					"type": "address"
				}
			],
			"name": "RoleGranted",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "sender",
					"type": "address"
				}
			],
			"name": "RoleRevoked",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "requestId",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "consumer",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "provider",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint32",
					"name": "count",
					"type": "uint32"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "originTargetTime",
					"type": "uint256"
				}
			],
			"name": "ScheduledRequestCreated",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "requestId",
					"type": "uint256"
				}
			],
			"name": "Triggered",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "vaultManager",
					"type": "address"
				}
			],
			"name": "VaultManagerChange",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "CONSUMER_ROLE",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "DEFAULT_ADMIN_ROLE",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "PROVIDER_ROLE",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "RANDOMIZER_ROLE",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "ROUTER_ROLE",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "TEAM_ROLE",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "defaultProviderId",
			"outputs": [
				{
					"internalType": "uint32",
					"name": "",
					"type": "uint32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				}
			],
			"name": "getRoleAdmin",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "grantRole",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "hasRole",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint32",
					"name": "",
					"type": "uint32"
				}
			],
			"name": "providers",
			"outputs": [
				{
					"internalType": "contract IRandomizerProvider",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_requestId",
					"type": "uint256"
				}
			],
			"name": "reRequest",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_requestId",
					"type": "uint256"
				},
				{
					"internalType": "uint32",
					"name": "_providerId",
					"type": "uint32"
				}
			],
			"name": "reRequest",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "renounceRole",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint32",
					"name": "_count",
					"type": "uint32"
				},
				{
					"internalType": "uint256",
					"name": "_minConfirmations",
					"type": "uint256"
				}
			],
			"name": "request",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "requestId_",
					"type": "uint256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "requestIds",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "requests",
			"outputs": [
				{
					"internalType": "uint32",
					"name": "count",
					"type": "uint32"
				},
				{
					"internalType": "contract IRandomizerConsumer",
					"name": "consumer",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "provider",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "minConfirmations",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "targetTime",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_requestId",
					"type": "uint256"
				},
				{
					"internalType": "uint256[]",
					"name": "_rngList",
					"type": "uint256[]"
				}
			],
			"name": "response",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "revokeRole",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint32",
					"name": "_count",
					"type": "uint32"
				},
				{
					"internalType": "uint256",
					"name": "_targetTime",
					"type": "uint256"
				}
			],
			"name": "scheduledRequest",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "requestId_",
					"type": "uint256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint32",
					"name": "_id",
					"type": "uint32"
				},
				{
					"internalType": "contract IRandomizerProvider",
					"name": "_provider",
					"type": "address"
				}
			],
			"name": "setProvider",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes4",
					"name": "interfaceId",
					"type": "bytes4"
				}
			],
			"name": "supportsInterface",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_requestId",
					"type": "uint256"
				}
			],
			"name": "trigger",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint32",
					"name": "_id",
					"type": "uint32"
				}
			],
			"name": "updateDefaultProvider",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	]
}

export const PlinkoContract = {
	address:"0xED6A0D6b1D11Bd0387b0968411dd01fa1D7c91d2",
	abi:[
		{
			"inputs": [
				{
					"internalType": "contract IRandomizerRouter",
					"name": "_router",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "player",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "requestId",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "wager",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "address[2]",
					"name": "tokens",
					"type": "address[2]"
				}
			],
			"name": "Created",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "Paused",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "previousAdminRole",
					"type": "bytes32"
				},
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "newAdminRole",
					"type": "bytes32"
				}
			],
			"name": "RoleAdminChanged",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "sender",
					"type": "address"
				}
			],
			"name": "RoleGranted",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "sender",
					"type": "address"
				}
			],
			"name": "RoleRevoked",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "player",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "requestId",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "wager",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "bool",
					"name": "won",
					"type": "bool"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "payout",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint32",
					"name": "playedGameCount",
					"type": "uint32"
				},
				{
					"indexed": false,
					"internalType": "uint256[]",
					"name": "numbers",
					"type": "uint256[]"
				},
				{
					"indexed": false,
					"internalType": "uint256[]",
					"name": "payouts",
					"type": "uint256[]"
				}
			],
			"name": "Settled",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "Unpaused",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "vaultManager",
					"type": "address"
				}
			],
			"name": "VaultManagerChange",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "DEFAULT_ADMIN_ROLE",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "PRECISION",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "RANDOMIZER_ROLE",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "TEAM_ROLE",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_token",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_wager",
					"type": "uint256"
				}
			],
			"name": "_computeDollarValue",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "_wagerInDollar",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_wager",
					"type": "uint256"
				},
				{
					"internalType": "uint8",
					"name": "_count",
					"type": "uint8"
				},
				{
					"internalType": "uint256",
					"name": "_stopGain",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_stopLoss",
					"type": "uint256"
				},
				{
					"internalType": "bytes",
					"name": "_gameData",
					"type": "bytes"
				},
				{
					"internalType": "address[2]",
					"name": "_tokens",
					"type": "address[2]"
				}
			],
			"name": "bet",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint32",
					"name": "_rows",
					"type": "uint32"
				},
				{
					"internalType": "uint32",
					"name": "_index",
					"type": "uint32"
				},
				{
					"internalType": "uint256",
					"name": "_wager",
					"type": "uint256"
				}
			],
			"name": "calcReward",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "reward_",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_count",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_usedCount",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_wager",
					"type": "uint256"
				}
			],
			"name": "calcWager",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "usedWager_",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "unusedWager_",
					"type": "uint256"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "contract IRandomizerRouter",
					"name": "_randomizerRouter",
					"type": "address"
				}
			],
			"name": "changeRandomizerRouter",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "completedGames",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes",
					"name": "_gameData",
					"type": "bytes"
				}
			],
			"name": "decodeGameData",
			"outputs": [
				{
					"internalType": "uint32",
					"name": "",
					"type": "uint32"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint32",
					"name": "_rows",
					"type": "uint32"
				}
			],
			"name": "encodeGameData",
			"outputs": [
				{
					"internalType": "bytes",
					"name": "",
					"type": "bytes"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "games",
			"outputs": [
				{
					"internalType": "uint8",
					"name": "count",
					"type": "uint8"
				},
				{
					"internalType": "address",
					"name": "player",
					"type": "address"
				},
				{
					"internalType": "bytes",
					"name": "gameData",
					"type": "bytes"
				},
				{
					"internalType": "uint256",
					"name": "wager",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "startTime",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"components": [
						{
							"internalType": "uint8",
							"name": "count",
							"type": "uint8"
						},
						{
							"internalType": "address",
							"name": "player",
							"type": "address"
						},
						{
							"internalType": "bytes",
							"name": "gameData",
							"type": "bytes"
						},
						{
							"internalType": "uint256",
							"name": "wager",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "startTime",
							"type": "uint256"
						},
						{
							"internalType": "address[2]",
							"name": "tokens",
							"type": "address[2]"
						}
					],
					"internalType": "struct CommonSolo.Game",
					"name": "_game",
					"type": "tuple"
				}
			],
			"name": "getHouseEdge",
			"outputs": [
				{
					"internalType": "uint64",
					"name": "edge_",
					"type": "uint64"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint32",
					"name": "_rows",
					"type": "uint32"
				},
				{
					"internalType": "uint32",
					"name": "_index",
					"type": "uint32"
				}
			],
			"name": "getMultiplier",
			"outputs": [
				{
					"internalType": "uint32",
					"name": "multiplier_",
					"type": "uint32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint32",
					"name": "_rows",
					"type": "uint32"
				}
			],
			"name": "getMultipliers",
			"outputs": [
				{
					"internalType": "uint32[]",
					"name": "multipliers_",
					"type": "uint32[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				}
			],
			"name": "getRoleAdmin",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "grantRole",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "hasRole",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint32",
					"name": "",
					"type": "uint32"
				}
			],
			"name": "houseEdges",
			"outputs": [
				{
					"internalType": "uint64",
					"name": "",
					"type": "uint64"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "maxGameCount",
			"outputs": [
				{
					"internalType": "uint8",
					"name": "",
					"type": "uint8"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "minConfirmations",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint32",
					"name": "",
					"type": "uint32"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "multipliers",
			"outputs": [
				{
					"internalType": "uint32",
					"name": "",
					"type": "uint32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "options",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "stopGain",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "stopLoss",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "pause",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "paused",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"components": [
						{
							"internalType": "uint8",
							"name": "count",
							"type": "uint8"
						},
						{
							"internalType": "address",
							"name": "player",
							"type": "address"
						},
						{
							"internalType": "bytes",
							"name": "gameData",
							"type": "bytes"
						},
						{
							"internalType": "uint256",
							"name": "wager",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "startTime",
							"type": "uint256"
						},
						{
							"internalType": "address[2]",
							"name": "tokens",
							"type": "address[2]"
						}
					],
					"internalType": "struct CommonSolo.Game",
					"name": "_game",
					"type": "tuple"
				},
				{
					"internalType": "uint256[]",
					"name": "_resultNumbers",
					"type": "uint256[]"
				},
				{
					"internalType": "uint256",
					"name": "_stopGain",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_stopLoss",
					"type": "uint256"
				}
			],
			"name": "play",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "payout_",
					"type": "uint256"
				},
				{
					"internalType": "uint32",
					"name": "playedGameCount_",
					"type": "uint32"
				},
				{
					"internalType": "uint256[]",
					"name": "payouts_",
					"type": "uint256[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_requestId",
					"type": "uint256"
				},
				{
					"internalType": "uint256[]",
					"name": "_rngList",
					"type": "uint256[]"
				}
			],
			"name": "randomizerCallback",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "randomizerRouter",
			"outputs": [
				{
					"internalType": "contract IRandomizerRouter",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "refundCooldown",
			"outputs": [
				{
					"internalType": "uint32",
					"name": "",
					"type": "uint32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_requestId",
					"type": "uint256"
				}
			],
			"name": "refundGame",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "renounceRole",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "revokeRole",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "rowLimits",
			"outputs": [
				{
					"internalType": "uint32",
					"name": "min",
					"type": "uint32"
				},
				{
					"internalType": "uint32",
					"name": "max",
					"type": "uint32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint16",
					"name": "_minConfirmations",
					"type": "uint16"
				}
			],
			"name": "setMinConfirmations",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "contract IVaultManager",
					"name": "_vaultManager",
					"type": "address"
				}
			],
			"name": "setVaultManager",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_total",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_wager",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_stopGain",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_stopLoss",
					"type": "uint256"
				}
			],
			"name": "shouldStop",
			"outputs": [
				{
					"internalType": "bool",
					"name": "stop_",
					"type": "bool"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes4",
					"name": "interfaceId",
					"type": "bytes4"
				}
			],
			"name": "supportsInterface",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "unpause",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint8",
					"name": "_maxGameCount",
					"type": "uint8"
				}
			],
			"name": "updateMaxGameCount",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint32",
					"name": "_index",
					"type": "uint32"
				},
				{
					"internalType": "uint32[]",
					"name": "_multipliers",
					"type": "uint32[]"
				},
				{
					"internalType": "uint64",
					"name": "_houseEdge",
					"type": "uint64"
				}
			],
			"name": "updateMultipliers",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint32",
					"name": "_refundCooldown",
					"type": "uint32"
				}
			],
			"name": "updateRefundCooldown",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint32",
					"name": "_min",
					"type": "uint32"
				},
				{
					"internalType": "uint32",
					"name": "_max",
					"type": "uint32"
				}
			],
			"name": "updateRowLimits",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "vaultManager",
			"outputs": [
				{
					"internalType": "contract IVaultManager",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]
}
export const CoinFlipContract = {
	address:"0xf352f06e3e4462754744E136713C8cA0a4C7C199",
	abi:[
		{
			"inputs": [
				{
					"internalType": "contract IRandomizerRouter",
					"name": "_router",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "player",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "requestId",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "wager",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "address[2]",
					"name": "tokens",
					"type": "address[2]"
				}
			],
			"name": "Created",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "Paused",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "previousAdminRole",
					"type": "bytes32"
				},
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "newAdminRole",
					"type": "bytes32"
				}
			],
			"name": "RoleAdminChanged",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "sender",
					"type": "address"
				}
			],
			"name": "RoleGranted",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "sender",
					"type": "address"
				}
			],
			"name": "RoleRevoked",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "player",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "requestId",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "wager",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "bool",
					"name": "won",
					"type": "bool"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "payout",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint32",
					"name": "playedGameCount",
					"type": "uint32"
				},
				{
					"indexed": false,
					"internalType": "uint256[]",
					"name": "numbers",
					"type": "uint256[]"
				},
				{
					"indexed": false,
					"internalType": "uint256[]",
					"name": "payouts",
					"type": "uint256[]"
				}
			],
			"name": "Settled",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "Unpaused",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "multiplier",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint64",
					"name": "houseEdge",
					"type": "uint64"
				}
			],
			"name": "UpdateHouseEdge",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "vaultManager",
					"type": "address"
				}
			],
			"name": "VaultManagerChange",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "DEFAULT_ADMIN_ROLE",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "PRECISION",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "RANDOMIZER_ROLE",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "TEAM_ROLE",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_token",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_wager",
					"type": "uint256"
				}
			],
			"name": "_computeDollarValue",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "_wagerInDollar",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_wager",
					"type": "uint256"
				},
				{
					"internalType": "uint8",
					"name": "_count",
					"type": "uint8"
				},
				{
					"internalType": "uint256",
					"name": "_stopGain",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_stopLoss",
					"type": "uint256"
				},
				{
					"internalType": "bytes",
					"name": "_gameData",
					"type": "bytes"
				},
				{
					"internalType": "address[2]",
					"name": "_tokens",
					"type": "address[2]"
				}
			],
			"name": "bet",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_wager",
					"type": "uint256"
				}
			],
			"name": "calcReward",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "reward_",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_count",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_usedCount",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_wager",
					"type": "uint256"
				}
			],
			"name": "calcWager",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "usedWager_",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "unusedWager_",
					"type": "uint256"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "contract IRandomizerRouter",
					"name": "_randomizerRouter",
					"type": "address"
				}
			],
			"name": "changeRandomizerRouter",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "completedGames",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes",
					"name": "_gameData",
					"type": "bytes"
				}
			],
			"name": "decodeGameData",
			"outputs": [
				{
					"internalType": "uint8",
					"name": "",
					"type": "uint8"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint8",
					"name": "_choice",
					"type": "uint8"
				}
			],
			"name": "encodeGameData",
			"outputs": [
				{
					"internalType": "bytes",
					"name": "",
					"type": "bytes"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "games",
			"outputs": [
				{
					"internalType": "uint8",
					"name": "count",
					"type": "uint8"
				},
				{
					"internalType": "address",
					"name": "player",
					"type": "address"
				},
				{
					"internalType": "bytes",
					"name": "gameData",
					"type": "bytes"
				},
				{
					"internalType": "uint256",
					"name": "wager",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "startTime",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"components": [
						{
							"internalType": "uint8",
							"name": "count",
							"type": "uint8"
						},
						{
							"internalType": "address",
							"name": "player",
							"type": "address"
						},
						{
							"internalType": "bytes",
							"name": "gameData",
							"type": "bytes"
						},
						{
							"internalType": "uint256",
							"name": "wager",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "startTime",
							"type": "uint256"
						},
						{
							"internalType": "address[2]",
							"name": "tokens",
							"type": "address[2]"
						}
					],
					"internalType": "struct CommonSolo.Game",
					"name": "",
					"type": "tuple"
				}
			],
			"name": "getHouseEdge",
			"outputs": [
				{
					"internalType": "uint64",
					"name": "edge_",
					"type": "uint64"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				}
			],
			"name": "getRoleAdmin",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "grantRole",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "hasRole",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "houseEdge",
			"outputs": [
				{
					"internalType": "uint64",
					"name": "",
					"type": "uint64"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint8",
					"name": "_choice",
					"type": "uint8"
				},
				{
					"internalType": "uint256",
					"name": "_result",
					"type": "uint256"
				}
			],
			"name": "isWon",
			"outputs": [
				{
					"internalType": "bool",
					"name": "won_",
					"type": "bool"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "maxGameCount",
			"outputs": [
				{
					"internalType": "uint8",
					"name": "",
					"type": "uint8"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "minConfirmations",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "options",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "stopGain",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "stopLoss",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "pause",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "paused",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"components": [
						{
							"internalType": "uint8",
							"name": "count",
							"type": "uint8"
						},
						{
							"internalType": "address",
							"name": "player",
							"type": "address"
						},
						{
							"internalType": "bytes",
							"name": "gameData",
							"type": "bytes"
						},
						{
							"internalType": "uint256",
							"name": "wager",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "startTime",
							"type": "uint256"
						},
						{
							"internalType": "address[2]",
							"name": "tokens",
							"type": "address[2]"
						}
					],
					"internalType": "struct CommonSolo.Game",
					"name": "_game",
					"type": "tuple"
				},
				{
					"internalType": "uint256[]",
					"name": "_resultNumbers",
					"type": "uint256[]"
				},
				{
					"internalType": "uint256",
					"name": "_stopGain",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_stopLoss",
					"type": "uint256"
				}
			],
			"name": "play",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "payout_",
					"type": "uint256"
				},
				{
					"internalType": "uint32",
					"name": "playedGameCount_",
					"type": "uint32"
				},
				{
					"internalType": "uint256[]",
					"name": "payouts_",
					"type": "uint256[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_requestId",
					"type": "uint256"
				},
				{
					"internalType": "uint256[]",
					"name": "_rngList",
					"type": "uint256[]"
				}
			],
			"name": "randomizerCallback",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "randomizerRouter",
			"outputs": [
				{
					"internalType": "contract IRandomizerRouter",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "refundCooldown",
			"outputs": [
				{
					"internalType": "uint32",
					"name": "",
					"type": "uint32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_requestId",
					"type": "uint256"
				}
			],
			"name": "refundGame",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "renounceRole",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "revokeRole",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint16",
					"name": "_minConfirmations",
					"type": "uint16"
				}
			],
			"name": "setMinConfirmations",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "contract IVaultManager",
					"name": "_vaultManager",
					"type": "address"
				}
			],
			"name": "setVaultManager",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_total",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_wager",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_stopGain",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_stopLoss",
					"type": "uint256"
				}
			],
			"name": "shouldStop",
			"outputs": [
				{
					"internalType": "bool",
					"name": "stop_",
					"type": "bool"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes4",
					"name": "interfaceId",
					"type": "bytes4"
				}
			],
			"name": "supportsInterface",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "unpause",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint8",
					"name": "_maxGameCount",
					"type": "uint8"
				}
			],
			"name": "updateMaxGameCount",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint32",
					"name": "_refundCooldown",
					"type": "uint32"
				}
			],
			"name": "updateRefundCooldown",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_winMultiplier",
					"type": "uint256"
				},
				{
					"internalType": "uint64",
					"name": "_houseEdge",
					"type": "uint64"
				}
			],
			"name": "updateWinMultiplier",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "vaultManager",
			"outputs": [
				{
					"internalType": "contract IVaultManager",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "winMultiplier",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]
}
export const DiceContract = {
	address:"0xF7Bd2A9C7c3dF374d177586028D892778C444690",
	abi:[
		{
			"inputs": [
				{
					"internalType": "contract IRandomizerRouter",
					"name": "_router",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "player",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "requestId",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "wager",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "address[2]",
					"name": "tokens",
					"type": "address[2]"
				}
			],
			"name": "Created",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "Paused",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "previousAdminRole",
					"type": "bytes32"
				},
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "newAdminRole",
					"type": "bytes32"
				}
			],
			"name": "RoleAdminChanged",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "sender",
					"type": "address"
				}
			],
			"name": "RoleGranted",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "account",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "sender",
					"type": "address"
				}
			],
			"name": "RoleRevoked",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "player",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "requestId",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "wager",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "bool",
					"name": "won",
					"type": "bool"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "payout",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint32",
					"name": "playedGameCount",
					"type": "uint32"
				},
				{
					"indexed": false,
					"internalType": "uint256[]",
					"name": "numbers",
					"type": "uint256[]"
				},
				{
					"indexed": false,
					"internalType": "uint256[]",
					"name": "payouts",
					"type": "uint256[]"
				}
			],
			"name": "Settled",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "Unpaused",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint64",
					"name": "houseEdge",
					"type": "uint64"
				}
			],
			"name": "UpdateHouseEdge",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "vaultManager",
					"type": "address"
				}
			],
			"name": "VaultManagerChange",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "DEFAULT_ADMIN_ROLE",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "PRECISION",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "RANDOMIZER_ROLE",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "TEAM_ROLE",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_token",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_wager",
					"type": "uint256"
				}
			],
			"name": "_computeDollarValue",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "_wagerInDollar",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_wager",
					"type": "uint256"
				},
				{
					"internalType": "uint8",
					"name": "_count",
					"type": "uint8"
				},
				{
					"internalType": "uint256",
					"name": "_stopGain",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_stopLoss",
					"type": "uint256"
				},
				{
					"internalType": "bytes",
					"name": "_gameData",
					"type": "bytes"
				},
				{
					"internalType": "address[2]",
					"name": "_tokens",
					"type": "address[2]"
				}
			],
			"name": "bet",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint8",
					"name": "_sideCount",
					"type": "uint8"
				},
				{
					"internalType": "uint256",
					"name": "_wager",
					"type": "uint256"
				}
			],
			"name": "calcReward",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "reward_",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_count",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_usedCount",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_wager",
					"type": "uint256"
				}
			],
			"name": "calcWager",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "usedWager_",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "unusedWager_",
					"type": "uint256"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "contract IRandomizerRouter",
					"name": "_randomizerRouter",
					"type": "address"
				}
			],
			"name": "changeRandomizerRouter",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "completedGames",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes",
					"name": "_gameData",
					"type": "bytes"
				}
			],
			"name": "decodeGameData",
			"outputs": [
				{
					"internalType": "uint8[]",
					"name": "",
					"type": "uint8[]"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint8[]",
					"name": "_choices",
					"type": "uint8[]"
				}
			],
			"name": "encodeGameData",
			"outputs": [
				{
					"internalType": "bytes",
					"name": "",
					"type": "bytes"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "games",
			"outputs": [
				{
					"internalType": "uint8",
					"name": "count",
					"type": "uint8"
				},
				{
					"internalType": "address",
					"name": "player",
					"type": "address"
				},
				{
					"internalType": "bytes",
					"name": "gameData",
					"type": "bytes"
				},
				{
					"internalType": "uint256",
					"name": "wager",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "startTime",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"components": [
						{
							"internalType": "uint8",
							"name": "count",
							"type": "uint8"
						},
						{
							"internalType": "address",
							"name": "player",
							"type": "address"
						},
						{
							"internalType": "bytes",
							"name": "gameData",
							"type": "bytes"
						},
						{
							"internalType": "uint256",
							"name": "wager",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "startTime",
							"type": "uint256"
						},
						{
							"internalType": "address[2]",
							"name": "tokens",
							"type": "address[2]"
						}
					],
					"internalType": "struct CommonSolo.Game",
					"name": "",
					"type": "tuple"
				}
			],
			"name": "getHouseEdge",
			"outputs": [
				{
					"internalType": "uint64",
					"name": "edge_",
					"type": "uint64"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				}
			],
			"name": "getRoleAdmin",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "grantRole",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "hasRole",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "houseEdge",
			"outputs": [
				{
					"internalType": "uint64",
					"name": "",
					"type": "uint64"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint8[]",
					"name": "_choices",
					"type": "uint8[]"
				},
				{
					"internalType": "uint256",
					"name": "_result",
					"type": "uint256"
				}
			],
			"name": "isWon",
			"outputs": [
				{
					"internalType": "bool",
					"name": "result_",
					"type": "bool"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "maxGameCount",
			"outputs": [
				{
					"internalType": "uint8",
					"name": "",
					"type": "uint8"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "minConfirmations",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint8",
					"name": "",
					"type": "uint8"
				}
			],
			"name": "multipliers",
			"outputs": [
				{
					"internalType": "uint24",
					"name": "",
					"type": "uint24"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "options",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "stopGain",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "stopLoss",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "pause",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "paused",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"components": [
						{
							"internalType": "uint8",
							"name": "count",
							"type": "uint8"
						},
						{
							"internalType": "address",
							"name": "player",
							"type": "address"
						},
						{
							"internalType": "bytes",
							"name": "gameData",
							"type": "bytes"
						},
						{
							"internalType": "uint256",
							"name": "wager",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "startTime",
							"type": "uint256"
						},
						{
							"internalType": "address[2]",
							"name": "tokens",
							"type": "address[2]"
						}
					],
					"internalType": "struct CommonSolo.Game",
					"name": "_game",
					"type": "tuple"
				},
				{
					"internalType": "uint256[]",
					"name": "_resultNumbers",
					"type": "uint256[]"
				},
				{
					"internalType": "uint256",
					"name": "_stopGain",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_stopLoss",
					"type": "uint256"
				}
			],
			"name": "play",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "payout_",
					"type": "uint256"
				},
				{
					"internalType": "uint32",
					"name": "playedGameCount_",
					"type": "uint32"
				},
				{
					"internalType": "uint256[]",
					"name": "payouts_",
					"type": "uint256[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_requestId",
					"type": "uint256"
				},
				{
					"internalType": "uint256[]",
					"name": "_rngList",
					"type": "uint256[]"
				}
			],
			"name": "randomizerCallback",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "randomizerRouter",
			"outputs": [
				{
					"internalType": "contract IRandomizerRouter",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "refundCooldown",
			"outputs": [
				{
					"internalType": "uint32",
					"name": "",
					"type": "uint32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_requestId",
					"type": "uint256"
				}
			],
			"name": "refundGame",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "renounceRole",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				},
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "revokeRole",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint16",
					"name": "_minConfirmations",
					"type": "uint16"
				}
			],
			"name": "setMinConfirmations",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "contract IVaultManager",
					"name": "_vaultManager",
					"type": "address"
				}
			],
			"name": "setVaultManager",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_total",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_wager",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_stopGain",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_stopLoss",
					"type": "uint256"
				}
			],
			"name": "shouldStop",
			"outputs": [
				{
					"internalType": "bool",
					"name": "stop_",
					"type": "bool"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes4",
					"name": "interfaceId",
					"type": "bytes4"
				}
			],
			"name": "supportsInterface",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "unpause",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint64",
					"name": "_houseEdge",
					"type": "uint64"
				}
			],
			"name": "updateHouseEdge",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint8",
					"name": "_maxGameCount",
					"type": "uint8"
				}
			],
			"name": "updateMaxGameCount",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint32",
					"name": "_refundCooldown",
					"type": "uint32"
				}
			],
			"name": "updateRefundCooldown",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint8",
					"name": "_sideCount",
					"type": "uint8"
				},
				{
					"internalType": "uint24",
					"name": "_multiplier",
					"type": "uint24"
				}
			],
			"name": "updateWinMultiplier",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "vaultManager",
			"outputs": [
				{
					"internalType": "contract IVaultManager",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]
}

