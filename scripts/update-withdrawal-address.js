// scripts/withdraw.js

const hre = require("hardhat");
const abi = require("../artifacts/contracts/Buymeacoffee.sol/BuyMeACoffee.json");
require("dotenv").config();

async function getBalance(provider, address) {
  const balanceBigInt = await provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function main() {
  // Get the contract that has been deployed to Goerli.
  const contractAddress = "0xCF60DE6e83647A2DdE1Bebd8bc442aabD05F37fD";
  //const account = await hre.ethers.getSigner();
  //const newAddress = await account.getAddress();

  const contractABI = abi.abi;

  // Get the node connection and wallet connection.
  const provider = new hre.ethers.providers.AlchemyProvider("goerli", process.env.GOERLI_API_KEY);

  // Ensure that signer is the SAME address as the original contract deployer,
  // or else this script will fail with an error.
  const signer = new hre.ethers.Wallet(process.env.GOERLI_PRIVATE_KEY, provider);
  // Instantiate connected contract.
  const buyMeACoffee = new hre.ethers.Contract(contractAddress, contractABI, signer);

  const newAddress = "0x4f607939A72dC2BcA182a0F660B82AaB503d9c3D";
  console.log ("Trying to set new withdraw address to: ", newAddress);
  const updateAddress = await buyMeACoffee.updateWithdrawalAddress(newAddress); 
  await updateAddress.wait();
  console.log("Withdrawal address updated...")
 

  // Get new address.
  
  console.log("New address is set to: ", await buyMeACoffee.getWithdrawalAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });