

require("dotenv").config()


const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const API_KEY = process.env.API_KEY;
// const API_URL = process.env.API_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const API_URL = "https://eth-ropsten.alchemyapi.io/v2/5GENn06x76Xi3K5y8sfOR7jtO9cLhsXU"
const mintcontract = "0x70DCf436b3F8B9b0B7507727b63fe0deaf257aFC";



// alchemy
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("./build/contracts/mintNft.json")
const nftContract = new web3.eth.Contract(contract.abi, mintcontract)


async function send(nftContract, _from, _to, tokenId) {
  const nonce = await web3.eth.getTransactionCount(_from, 'latest'); //get latest nonce

//the transaction
  const tx = {
    'from': _from,
    'to': mintcontract,
    'nonce': nonce,
    'gas': 500000,
    'value': 0x0,
    'data': nftContract.methods.transferFrom(_from, _to, tokenId).encodeABI()
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, "e8d642d8f0c52cd5e421afa3c09f00f9c7fe05aed1ced85d1bcf98f86b6c0c82")
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
// send(nftContract, "0x23Ec543f995D80AD727Cf2284eC448E55BF769fB", "0x155dBa421031e748B6814ee0086400698cfdAc85", 101)





//=============================================================$$$$$$$$$$$$$$$$$$$$$$$============================

// async function sendv2(_from, _to, _tokenId) {
//   try{
//     const send = await nftContract.methods.transferFrom(_from, _to, _tokenId).send({from:"0x23Ec543f995D80AD727Cf2284eC448E55BF769fB", value: "1"})
//     console.log(send)

//   }catch(err){
//     console.log("error:", err)
//   }
// }

async function ownerOf(_tokenId) {
  try{
    const owner = await nftContract.methods.ownerOf(_tokenId).call({from: "0x23Ec543f995D80AD727Cf2284eC448E55BF769fB"})
    console.log(owner)

  }catch(err){
    console.log("error:", err)
  }
}


ownerOf(101)

// sendv2("0x23Ec543f995D80AD727Cf2284eC448E55BF769fB", "0x1d93D32019D2747F0288c7Dcf2407440a09C892a", 100)

