require("dotenv").config()


const PUBLIC_KEY = "0x23Ec543f995D80AD727Cf2284eC448E55BF769fB";
const PRIVATE_KEY = "";
// const API_KEY = process.env.API_KEY;
const API_URL = "https://eth-ropsten.alchemyapi.io/v2/5GENn06x76Xi3K5y8sfOR7jtO9cLhsXU";
const CONTRACT_ADDRESS = "0x70DCf436b3F8B9b0B7507727b63fe0deaf257aFC";

// alchemy
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("./build/contracts/mintNft.json")

const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

//the transaction
  const tx = {
    'from': PUBLIC_KEY,
    'to': CONTRACT_ADDRESS,
    'nonce': nonce,
    'gas': 500000,
    'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
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
const num = process.argv[2];
mintNFT("https://ipfs.io/ipfs/QmVQDN1tp8dZswvHPPY3hV87Xwn8wMhmjcXvkxk9cf7HzF/"+num+".json")


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// async function mint4000Nfts() {
//   for(let i = 4; i <= 4000; i++){
//     await sleep(1000);
//     var str = "" + i
//     var pad = "0000"
//     var id = pad.substring(0, pad.length - str.length) + str
    
//     await mintNFT("https://ipfs.io/ipfs/QmVfMoyBitJoXKvjGSii15BiWfGUYADZvHqesoK77RSf4Z/"+id+".json")
//   }
// }
// mint4000Nfts();
// mintNFT("https://ipfs.io/ipfs/QmVfMoyBitJoXKvjGSii15BiWfGUYADZvHqesoK77RSf4Z/0005.json")
