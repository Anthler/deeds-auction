const DeedContract = artifacts.require("DeedContract");

module.exports = function(deployer) {
  deployer.deploy(DeedContract, "DeedToken", "DTK");
};
