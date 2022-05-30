
require("dotenv").config()


const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const API_URL = process.env.API_URL;

const mintcontract = process.env.MintContract;



// alchemy
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../blockchain/build/contracts/mintNft.json")
const nftContract = new web3.eth.Contract(contract.abi, mintcontract)


async function sendNft(_from, _to, tokenId) {
  const nonce = await web3.eth.getTransactionCount(_from, 'latest'); //get latest nonce

//the transaction
  const tx = {
    'from': PUBLIC_KEY,
    'to': mintcontract,
    'nonce': nonce,
    'gas': 500000,
    'value': 0x0,
    'data': nftContract.methods.transferFrom(_from, _to, tokenId).encodeABI()
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise.then((signedTx) => {
      web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (err, hash) {
          if (!err) {
            console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!")
          } else {
            console.log("Something went wrong when submitting your transaction:", err)
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}

module.exports = sendNft

