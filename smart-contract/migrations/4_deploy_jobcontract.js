// eslint-disable-next-line no-undef
const WorkLOB = artifacts.require("WorkLOB");

module.exports = function (deployer) {
  const LOBTokenAddress = "0xC677a1b3461B2417D7789331357606d8Bb17FD24"; // Replace with your LOB Token contract address
  deployer.deploy(WorkLOB, LOBTokenAddress);
};
