var MyContract = artifacts.require("Upload");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(MyContract);
};