const Web3 = require("web3");
const EthereumTransaction = require("ethereumjs-tx").Transaction;
const url = 'https://rinkeby.infura.io/v3/1f7d76ecde464da5959dbc1035989a19';
const web3 = new Web3(url);

const sendingAddress = '0x8F65E69534e865A44c3905515C28417FE0233E90';
const receivingAddress = '0xda3260c33600339b9F6d199572153A8baCfc262A';

web3.eth.getTransactionCount(sendingAddress).then( txCount => {
    const rawTransaction = {
        nonce: web3.utils.toHex(txCount),
        to: receivingAddress,
        gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),
        gasLimit: web3.utils.toHex(30000),
        value: web3.utils.toHex(web3.utils.toWei('1','ether'))
    }

    const privateKeySender = 'c650155b7eb92fc8869f5d6d60171402996955b6a706b65d34034a3e1776d342';
    const privateKeySenderHex = new Buffer.from(privateKeySender, 'hex');
    const transaction = new EthereumTransaction(rawTransaction, {chain:'rinkeby'});
    transaction.sign(privateKeySenderHex);

    const serializedTransaction = transaction.serialize();
    const raw ='0x'+serializedTransaction.toString('hex')
    web3.eth.sendSignedTransaction(raw, (err,txHash) => {
        console.log('txHash : ',txHash)
        if(err){
            console.log(err);
        }
    })
});
