//LOCAL GANACHE INSTANCE

const Web3 = require('web3');

const url = 'HTTP://127.0.0.1:7545';

const web3 = new Web3(url);

let accounts = [];

web3.eth.getAccounts().then( acc => {
    accounts = acc;
});

console.log(accounts[0]);

// web3.eth.getBalance(accounts[0])
//     .then((balance) => console.log('balance:' + web3.utils.fromWei(balance)));

