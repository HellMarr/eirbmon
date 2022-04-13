require("dotenv").config()
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;
const CONTRACT_ADDRESS_MARKETPLACE = process.env.CONTRACT_ADDRESS_MARKETPLACE;
const CONTRACT_ADDRESS_NFT = process.env.CONTRACT_ADDRESS;


// alchemy
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../build/contracts/NFTMarketplace")
// const marketplaceContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS_MARKETPLACE)



// add a nft to the marketplace
async function addNftInMarketplace(marketplaceContract, addr, tokenId, price){

    // return await marketplaceContract.methods.addNftInMarketplace(CONTRACT_ADDRESS_NFT, tokenId, price).send({from: addr, value: price, gas: 300000})

    const nonce = await web3.eth.getTransactionCount(addr, 'latest'); //get latest nonce

    //the transaction
    const tx = {
        'from': addr,
        'to': CONTRACT_ADDRESS_MARKETPLACE,
        // 'nonce': nonce,
        'gas': 500000,
        'data': marketplaceContract.methods.addNftInMarketplace(CONTRACT_ADDRESS_NFT, tokenId, price).encodeABI()
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
    .then((signedTx) => {
        web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            function (err, hash) {
                if (!err) {
                    console.log(
                    "The hash of your transaction is: ",
                    hash,
                    "\nCheck Alchemy's Mempool to view the status of your transaction!"
                    )
                } else {
                    console.log(
                    "Something went wrong when submitting your transaction:",
                    err
                    )
                }
            }
        )
        })
    .catch((err) => {
        console.log(" Promise failed:", err)
        })
}

// get all items on the market
async function fetchMarketItems(marketplaceContract, addr){
    const items =  await marketplaceContract.methods.fetchMarketItems().call({from: addr})
    // console.log('items:', items) 
    return items
}

// fetch the nft I put in sale
async function fetchMyItemsInSale(marketplaceContract, addr) {
    const mynfts = await marketplaceContract.methods.fetchItemsCreated().call({from: addr});
    // console.log('my nfts:', mynfts)
    return mynfts
}

// return nfts an account bought on the marketplace
async function fetchMyNFTs(marketplaceContract, addr){
    const items =  await marketplaceContract.methods.fetchMyNFTs().call({from: addr})
    // console.log('items:', items)
    return items; 
}

// buy an item on the marketplace
async function buyNftInMarketplace(marketplaceContract, buyerAddress, ownerAddr, tokenId, price) {

    // return await marketplaceContract.methods.buyNftInMarketplace(ownerAddr, tokenId).send({from:buyerAddress, value: price, gas: 300000});

     //the transaction
     const tx = {
        'from': buyerAddress,
        'gas': 500000,
        'value': price,
        'data': marketplaceContract.methods.buyNftInMarketplace(ownerAddr, tokenId).encodeABI()
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
    .then((signedTx) => {
        web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            function (err, hash) {
                if (!err) {
                    console.log(
                    "The hash of your transaction is: ",
                    hash,
                    "\nCheck Alchemy's Mempool to view the status of your transaction!"
                    )
                } else {
                    console.log(
                    "Something went wrong when submitting your transaction:",
                    err
                    )
                }
            }
        )
        })
    .catch((err) => {
        console.log(" Promise failed:", err)
        })
}

module.exports = {addNftInMarketplace, fetchMarketItems, fetchMyItemsInSale, fetchMyNFTs, buyNftInMarketplace};









