// eslint-disable-next-line no-undef
const WorkLOB = artifacts.require("WorkLOB");

module.exports = function (deployer) {
  const LOBTokenAddress = "0x77950BA34F2EB2C3ce6cb0A0b73E894ba57B82b8"; // Replace with your LOB Token contract address
  deployer.deploy(WorkLOB, LOBTokenAddress);
};
