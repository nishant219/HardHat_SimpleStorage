require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("solidity-coverage");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks :{
    goerli:{
      url: process.env.URL,
      accounts: [process.env.KEY],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY, 
  }
};
