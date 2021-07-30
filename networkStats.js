const Web3 = require('web3');

const url = 'https://mainnet.infura.io/v3/1f7d76ecde464da5959dbc1035989a19';

const web3 = new Web3(url);

web3.eth.getGasPrice().then(console.log);

web3.eth.getBlockTransactionCount('12912329').then(console.log);

web3.eth.getUncle('500', 0 ).then(console.log);
