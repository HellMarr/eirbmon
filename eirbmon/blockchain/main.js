const {addNftInMarketplace, fetchMarketItems, fetchMyItemsInSale, fetchMyNFTs, createMarketSale} = require('./modules/marketplace.js')

require("dotenv").config()
const API_URL = process.env.API_URL;
const CONTRACT_ADDRESS_MARKETPLACE = process.env.CONTRACT_ADDRESS_MARKETPLACE;
const CONTRACT_ADDRESS_NFT = process.env.CONTRACT_ADDRESS;

const account = "0xabaf091fc64e10d54418a4a71e603882587fc84b"


const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("./build/contracts/NFTMarketplace")
const marketplaceContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS_MARKETPLACE)

// async function add(addr, tokenId, price) {
//     await marketplaceContract.methods.addNftInMarketplace(CONTRACT_ADDRESS_NFT, tokenId, price).send({from: addr, value: price, gas: 300000})
// }



// ===== testing funcrtions ========
// addNftInMarketplace(marketplaceContract, "0xabaf091fc64e10d54418a4a71e603882587fc84b", 3, 100)
fetchMarketItems(marketplaceContract, "0xF7A5ade9e66223596a68C60054b8e181e16f151D").then((items) => {console.log(items)})
