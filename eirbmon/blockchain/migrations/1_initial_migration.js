const mintNft = artifacts.require("mintNft");
const Marketplace = artifacts.require("NFTMarketplace")

module.exports = function (deployer) {
  deployer.deploy(Marketplace)
  .then(() => Marketplace.deployed()
    .then(_instance => deployer.deploy(mintNft,_instance.address)));
};