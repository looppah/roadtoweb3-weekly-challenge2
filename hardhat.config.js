require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const { GOERLI_URL, GOERLI_PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: [`0x${GOERLI_PRIVATE_KEY}`]
    }
  }
};
