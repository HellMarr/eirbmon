


const API_URL = "https://eth-ropsten.alchemyapi.io/v2/5GENn06x76Xi3K5y8sfOR7jtO9cLhsXU"
const mintcontract = "0x70DCf436b3F8B9b0B7507727b63fe0deaf257aFC";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("./build/contracts/mintNft.json")

const nftContract = new web3.eth.Contract(contract.abi, mintcontract)

async function getBalance(from) {
    const balance = await nftContract.methods.balanceOf(from).call({from: from})
    console.log(balance)
}

getBalance("0x23Ec543f995D80AD727Cf2284eC448E55BF769fB")