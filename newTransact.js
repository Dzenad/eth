/*##########################
CONFIGURATION
##########################*/

// -- Step 1: Set up the appropriate configuration
const Web3 = require("web3");
const EthereumTransaction = require("ethereumjs-tx").Transaction;
const web3 = new Web3('HTTP://127.0.0.1:7545');

// -- Step 2: Set the sending and receiving addresses for the transaction.
const sendingAddress = '0xF1b12DcE54b79E76BC48Be0b9795fece493C1c7F';
const receivingAddress = '0xd3B97DE8D51D129CB2C0c114511E7b1A53c65beF';


// -- Step 3: Check the balances of each address
web3.eth.getBalance(sendingAddress).then(console.log);
web3.eth.getBalance(receivingAddress).then(console.log);



/*##########################
CREATE A TRANSACTION
##########################*/

// -- Step 4: Set up the transaction using the transaction variables as shown
const rawTransaction = {
    nonce: web3.utils.toHex(0),
    to: receivingAddress,
    gasPrice: web3.utils.toHex(web3.utils.toWei('1000','gwei')),
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
const privateKeySender = 'bd6dd79d1df3216ea6f7f9107c5c60f3546f0d82a8d31ff9278c6663e1da9540';
const privateKeySenderHex = new Buffer.from(privateKeySender, 'hex');
const transaction = new EthereumTransaction(rawTransaction);
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
