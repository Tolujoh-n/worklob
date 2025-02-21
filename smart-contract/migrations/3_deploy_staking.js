// eslint-disable-next-line no-undef
const WorkLobStaking = artifacts.require("WorkLobStaking");
// Uncomment and configure the following if you want to deploy a test ERC20 token alongside the staking contract.
// const MyERC20Token = artifacts.require("MyERC20Token");

module.exports = async function (deployer, network, accounts) {
  // Option 1: Using an already deployed token address
  const deployedTokenAddress = "0x77042618A5712F52004359d6b507cc24c7Ef2276"; // Replace with your LOB token's address
  await deployer.deploy(WorkLobStaking, deployedTokenAddress);

  // Option 2: Deploy a test ERC20 token first and then deploy the staking contract.
  // Uncomment the following lines if you want to deploy the token from scratch.
  /*
  await deployer.deploy(MyERC20Token, "Test Token", "TTK", 18, web3.utils.toWei("1000000", "ether"));
  const tokenInstance = await MyERC20Token.deployed();
  await deployer.deploy(WorkLobStaking, tokenInstance.address);
  */
};
