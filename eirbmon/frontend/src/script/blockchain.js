


async function addNftInMarket(_marketplaceContract, _tokenId, _price, _from, _to) {
    const CONTRACT_ADDRESS_NFT = "0xAbaf091fC64e10d54418A4A71e603882587fc84B";

    const transactionParameters = {
    // from: "0xa8a61e4D04cDde5349311b96213B14b8Da300197",//ethereum.selectedAddress, // must match user's active address.
    from: _from,
    // to: "0xD23945A0CFA6835554F8790da0f3de10658035Ad",
    to: _to,
    value: _price,
    data: _marketplaceContract.methods.addNftInMarketplace(CONTRACT_ADDRESS_NFT, _tokenId, _price).encodeABI()
  };
  provider.request({
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





module.exports = {addNftInMarket, fetchMarketItems, fetchMyItemsInSale, fetchMyNFTs, buyNftInMarket};