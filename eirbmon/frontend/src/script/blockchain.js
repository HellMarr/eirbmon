


async function addNftInMarket(_provider, _marketplaceContract, _tokenId, _price, _from) {
    const CONTRACT_ADDRESS_NFT = "0x70DCf436b3F8B9b0B7507727b63fe0deaf257aFC";
    const CONTRACT_ADDRESS_MARKETPLACE = "0x1568aA48477086083237153BbD6Faf38A1697182"

    const transactionParameters = {
    from: _from,
    to: CONTRACT_ADDRESS_MARKETPLACE,
    // value: _price,
    data: _marketplaceContract.methods.addNftInMarketplace(CONTRACT_ADDRESS_NFT, _tokenId, _price).encodeABI()
  };
  _provider.request({
    method: 'eth_sendTransaction',
    params: [transactionParameters],
  })
  .then((result) => {
    console.log(result)
    });
}

// get all items on the market
async function fetchMarketItems(_marketplaceContract, _addr){
    const items =  await _marketplaceContract.methods.fetchMarketItems().call({from: _addr})
    return items
}

// fetch the nft I put in sale
async function fetchMyItemsInSale(_marketplaceContract, _addr) {
    const mynfts = await _marketplaceContract.methods.fetchItemsCreated().call({from: _addr});
    return mynfts
}

// return nfts an account bought on the marketplace
async function fetchMyNFTs(_marketplaceContract, _addr){
    const items =  await _marketplaceContract.methods.fetchMyNFTs().call({from: _addr})
    return items; 
}

async function buyNftInMarket(_provider, _marketplaceContract, _buyerAddress, _ownerAddr, _tokenId, _price) {

    const transactionParameters = {
        from: _buyerAddress,
        value: _price,
        data: _marketplaceContract.methods.buyNftInMarketplace(_ownerAddr, _tokenId).encodeABI()
    };
    _provider.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
    })
    .then((result) => {
        console.log(result)
        return 
    });
}

async function getBalance(_mintContract, from) {
    const balance = await _mintContract.methods.balanceOf(from).call({from: from})
    return balance
}

async function sendFirstNft(nftContract, web3, _to, tokenId) {
    const owner = "0x23Ec543f995D80AD727Cf2284eC448E55BF769fB";
    const mintAddr = "0x70DCf436b3F8B9b0B7507727b63fe0deaf257aFC";
    const nonce = await web3.eth.getTransactionCount(owner, 'latest'); //get latest nonce
  
  //the transaction
    const tx = {
      'from': owner,
      'to': mintAddr,
      'nonce': nonce,
      'gas': 500000,
      'value': 0x0,
      'data': nftContract.methods.transferFrom(owner, _to, tokenId).encodeABI()
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

  async function ownerOf(nftContract, _tokenId) {
    try{
      const owner = await nftContract.methods.ownerOf(_tokenId).call({from: "0x23Ec543f995D80AD727Cf2284eC448E55BF769fB"})
      return owner
  
    }catch(err){
      console.log("error:", err)
    }
  }





module.exports = {addNftInMarket, fetchMarketItems, fetchMyItemsInSale, fetchMyNFTs, buyNftInMarket, getBalance, sendFirstNft, ownerOf};