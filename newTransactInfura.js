/*##########################
CONFIGURATION
check -> https://github.com/ethereumjs/ethereumjs-tx/issues/160
##########################*/

// -- Step 1: Set up the appropriate configuration
const Web3 = require("web3");
const EthereumTransaction = require("ethereumjs-tx").Transaction;
const url = 'https://rinkeby.infura.io/v3/1f7d76ecde464da5959dbc1035989a19';
const web3 = new Web3(url);

// -- Step 2: Set the sending and receiving addresses for the transaction.
const sendingAddress = '0x8F65E69534e865A44c3905515C28417FE0233E90';
const receivingAddress = '0xda3260c33600339b9F6d199572153A8baCfc262A';

// -- Step 3: Check the balances of each address
web3.eth.getBalance(sendingAddress).then(console.log);
web3.eth.getBalance(receivingAddress).then(console.log);
web3.eth.getTransactionCount(sendingAddress).then(console.log);


/*##########################
CREATE A TRANSACTION
##########################*/

// -- Step 4: Set up the transaction using the transaction variables as shown

const rawTransaction = {
    nonce: web3.utils.toHex(6),
    to: receivingAddress,
    gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),
    gasLimit: web3.utils.toHex(30000),
    value: web3.utils.toHex(web3.utils.toWei('5','ether'))
    //data: "" // <- this field would be important if we were making transaction to a Contract Account
}

// -- Step 5: View the raw transaction rawTransaction
// -- nothing has changed here - transaction needs to be signed and submitted to the network

// -- Step 6: Check the new account balances (they should be the same)
web3.eth.getBalance(sendingAddress).then(console.log)
web3.eth.getBalance(receivingAddress).then(console.log)

// Note: They haven't changed because they need to be signed...

/*##########################

Sign the Transaction
##########################*/

// -- Step 7: Sign the transaction with the Hex value of the private key of the sender
const privateKeySender = 'c650155b7eb92fc8869f5d6d60171402996955b6a706b65d34034a3e1776d342';
const privateKeySenderHex = new Buffer.from(privateKeySender, 'hex');
const transaction = new EthereumTransaction(rawTransaction, {chain:'rinkeby'});
transaction.sign(privateKeySenderHex);

/*#########################################
Send the transaction to the network
#########################################*/

// -- Step 8: Send the serialized signed transaction to the Ethereum network.
const serializedTransaction = transaction.serialize();
const raw ='0x'+serializedTransaction.toString('hex')
web3.eth.sendSignedTransaction(raw, (err,txHash) => {
    console.log('txHash : ',txHash)
    if(err){
        console.log(err);
    }
})
