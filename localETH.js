//LOCAL GANACHE INSTANCE

const Web3 = require('web3');

const url = 'HTTP://127.0.0.1:8545';

const web3 = new Web3(url);

let accounts = [];

web3.eth.getAccounts().then( accounts => {
        accounts.forEach(account => {
            web3.eth.getBalance(account)
                .then((balance) => console.log(`➜ ${account} balance:` + web3.utils.fromWei(balance)));
        });
});





