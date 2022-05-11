


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





module.exports = {addNftInMarket, fetchMarketItems, fetchMyItemsInSale, fetchMyNFTs, buyNftInMarket, getBalance};