var TokenContract = artifacts.require("./ExampleToken.sol");
var ReapContract = artifacts.require("./ReapableERC20.sol");


module.exports = function(deployer) {
  deployer.deploy(TokenContract);
  deployer.deploy(ReapContract);
};
