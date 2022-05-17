const DEDESTAKING = artifacts.require("DEDESTAKING");

module.exports = function (deployer) {
  deployer.deploy(DEDESTAKING);
};
