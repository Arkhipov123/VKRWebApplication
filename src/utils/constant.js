const NETWORK_LIST = {
    sepolia: {
        chainName: "Sepolia Test Network",
        chainIdHex: "0xaa36a7",
        chainId: 11155111,
        RPC: "https://sepolia.infura.io/v3/" + process.env.REACT_APP_INFURA_KEY,
        contracts: {
            ERC721URIStorage: "0xbfbba318107300e7433b91a6c5f6f09762e982f1",
            ERC721URIStorageABI: process.env.ERC721URIStorageABI
        }
    }
}

export const CHAIN_INFO = NETWORK_LIST[process.env.REACT_APP_NETWORK];