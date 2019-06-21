try {

    let account;

    // let web3js = new Web3(new Web3.providers.HttpProvider(RCP_ADDRESS));
    let web3js_ws = new Web3(new Web3.providers.WebsocketProvider(WS_ADDRESS));

    document.getElementById('private-key').value = WALLET_PRIVATE_KEY;
    // web3js_ws.eth.personal.newAccount(WALLET_PRIVATE_KEY, function(data) {
    web3js_ws.eth.getAccounts().then( function(accounts) {
        add_log_entry('Accounts available: ' + accounts);
        account = accounts[0];
        add_log_entry('Using first account as sender account: ' + account);
    });
    // });

    // var account = web3js_ws.eth.accounts.privateKeyToAccount(WALLET_PRIVATE_KEY);

    let ticketing_contract = new web3js_ws.eth.Contract(SC_TICKETNG_ABI, SC_TICKETNG_ADDRESS);

    // Listenting to the TripCreated event
    // https://ethereum.stackexchange.com/questions/47362/how-to-listen-to-events-generated-by-an-existing-contract-in-web3-1-x-x
    ticketing_contract.events.TripCreated((err, events) => {
        add_log_entry(err, events);
    });


    // create test event
    document.getElementById('create-test-event-button').addEventListener("click", function () {
        // check balance...
        web3js_ws.eth.getBalance(WALLET_ADDRESS).then(function(balance){
            add_log_entry('Sender wallet balance (WALLET_ADDRESS): ' + balance);
        });


        ticketing_contract.methods.checkIn(TRANSPORTER_ADDRESS).send({
            'from': WALLET_ADDRESS,
            'gas': 3000000,
        }).then(function(data) {
            add_log_entry('Checked in with hash '+ JSON.stringify(data))
        });


    });


    document.getElementById('sign-recover-button').addEventListener("click", function () {

        message = document.getElementById('message').value;

        add_log_entry('using private key ' + WALLET_PRIVATE_KEY);

        // sign
        var sig_obj = web3js_ws.eth.accounts.sign(message, WALLET_PRIVATE_KEY);

        add_log_entry("signature object: " + JSON.stringify(sig_obj));

        add_log_entry("trying to get the public address from the signature...");


        var pub_key = web3js_ws.eth.accounts.recover(message, sig_obj.signature);

        add_log_entry(pub_key);

        if (pub_key === account) {
            add_log_entry("the calculated pub key matches the originally given one!")
        } else {
            add_log_entry("Something is not right, the calculated key doesnt match the one from the private key!")
        }

    });


    document.getElementById('clear-log-button').addEventListener("click", function () {
        var log = document.getElementById("log");
        log.innerHTML = '';
    });


} catch (e) {
    add_log_entry(e);
}


function add_log_entry(text) {
    console.log(text)
    var p = document.createElement("p");
    p.textContent = text;
    document.getElementById('log').appendChild(p);

}
