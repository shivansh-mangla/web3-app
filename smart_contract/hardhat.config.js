// https://eth-sepolia.g.alchemy.com/v2/qjogpJUC_KakTO5LdWXGB-Zi5ET_Cse_

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/qjogpJUC_KakTO5LdWXGB-Zi5ET_Cse_',
      accounts: ['a72a231cef9047831211217da59d20a7ac8accfa9d0d6526a2ab36be339224d6'],
    },
  },
};