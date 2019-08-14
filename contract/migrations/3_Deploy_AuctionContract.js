const AuctionContract = artifacts.require("AuctionContract");

module.exports = function(deployer) {
  deployer.deploy(AuctionContract);
};
