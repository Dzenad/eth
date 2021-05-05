//EXTERNALLY OWNED ACCOUNT on RINKEBY

const Web3 = require('web3');
// console.log(Web3);
// console.log(Web3.modules);
const url = 'https://rinkeby.infura.io/v3/1f7d76ecde464da5959dbc1035989a19';

const web3 = new Web3(url);
//console.log(web3);

const address = '0x8F65E69534e865A44c3905515C28417FE0233E90';

web3.eth.getBalance(address)
    .then((balance) => console.log('balance:' + web3.utils.fromWei(balance)));

web3.eth.getTransactionCount(address).then(console.log);

// const transactionHash = '0x2aac4583fa100aec3aff02b8bfefda3909480c0f601af1359d22e1880c8506ed';
// web3.eth.getTransaction(transactionHash)
//     .then(console.log);


