// local ganache instance

WS_ADDRESS = 'ws://0.0.0.0:7545';
RCP_ADDRESS = 'http://0.0.0.0:7545';

// RCP_ADDRESS = 'http://159.100.249.117:8545';
// WS_ADDRESS = 'ws://159.100.249.117:8545';

SC_TICKETNG_ADDRESS = "0xC45657951eFbbeeA2da3131Df796c0088e34439A";

WALLET_ADDRESS = "0x70eD53133d3dddeC777D9E159C430cA7D3C9e1E3";
WALLET_PRIVATE_KEY = '0x43ad9808d861dd1dc0ae09da94c3af96f3217fc41f3afee2acfa6bfda1f8dbb5';

TRANSPORTER_ADDRESS = "0x7ED0e0b6DaF189af08a067852CcF45719f868203";

SC_TICKETNG_ABI = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "passengers",
        "outputs": [
            {
                "name": "isCheckedIn",
                "type": "bool"
            },
            {
                "name": "checkedInTspKey",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "startTimestamp",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "endTimestamp",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "transporter",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "passenger",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "isCheckedOut",
                "type": "bool"
            },
            {
                "indexed": false,
                "name": "isPaid",
                "type": "bool"
            },
            {
                "indexed": false,
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "TripCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "startTimestamp",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "endTimestamp",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "transporter",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "passenger",
                "type": "address"
            }
        ],
        "name": "CheckedOut",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "transporterAddress",
                "type": "address"
            }
        ],
        "name": "checkIn",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "passengerAddress",
                "type": "address"
            }
        ],
        "name": "getTrips",
        "outputs": [
            {
                "components": [
                    {
                        "name": "startTimestamp",
                        "type": "uint256"
                    },
                    {
                        "name": "endTimestamp",
                        "type": "uint256"
                    },
                    {
                        "name": "transporter",
                        "type": "address"
                    },
                    {
                        "name": "passenger",
                        "type": "address"
                    },
                    {
                        "name": "isCheckedOut",
                        "type": "bool"
                    },
                    {
                        "name": "isPaid",
                        "type": "bool"
                    },
                    {
                        "name": "price",
                        "type": "uint256"
                    }
                ],
                "name": "",
                "type": "tuple[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "checkOut",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
