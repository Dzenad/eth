const Web3 = require("web3");

const web3 = new Web3('HTTP://127.0.0.1:7545');

web3.eth.getTransactionCount('0xF1b12DcE54b79E76BC48Be0b9795fece493C1c7F').then(console.log);
