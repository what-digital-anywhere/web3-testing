try {

    let account;

    let transporterPubKey = TRANSPORTER_ADDRESS;
    document.getElementById('transporter-pub-key').value = TRANSPORTER_ADDRESS;

    // let web3js = new Web3(new Web3.providers.HttpProvider(RCP_ADDRESS));
    let web3js_ws = window.web3js_ws = new Web3(new Web3.providers.WebsocketProvider(WS_ADDRESS));

    document.getElementById('private-key').value = WALLET_PRIVATE_KEY;

    // on ganache we already have 10 pre-filled accounts for testing
    // however on the real rpc a user wont have any accounts and for the import with the private key, an account will
    // have to be created like below:

    account = web3js_ws.eth.accounts.privateKeyToAccount(WALLET_PRIVATE_KEY);
    web3js_ws.eth.accounts.wallet.add(account);
    web3js_ws.eth.defaultAccount = account.address;

    add_log_entry('using account ' + JSON.stringify(account));

    let ticketing_contract = new web3js_ws.eth.Contract(SC_TICKETNG_ABI, SC_TICKETNG_ADDRESS);

    // Listenting to the TripCreated event
    // https://ethereum.stackexchange.com/questions/47362/how-to-listen-to-events-generated-by-an-existing-contract-in-web3-1-x-x
    ticketing_contract.events.TripCreated((err, events) => {
        add_log_entry('TripCreated EVENT received: ' + err + JSON.stringify(events));
    });

    ticketing_contract.events.CheckedOut((err, events) => {
        add_log_entry('CheckedOut EVENT received: ' + err + JSON.stringify(events));
    });

    // change private key
    document.getElementById('change-private-key-button').addEventListener("click", function () {
        account = web3js_ws.eth.accounts.privateKeyToAccount(document.getElementById('private-key').value);
        web3js_ws.eth.accounts.wallet.add(account);
        web3js_ws.eth.defaultAccount = account.address;
        add_log_entry('using account ' + JSON.stringify(account));
    });


    // change transporter pub key
    document.getElementById('change-transporter-pub-key-button').addEventListener("click", function () {
        transporterPubKey = document.getElementById('transporter-pub-key').value;
        add_log_entry('transporter pub key set to: ' + transporterPubKey);
    });

    // check in
    document.getElementById('checkin-button').addEventListener("click", function () {

        check_balance();

        ticketing_contract.methods.checkIn(transporterPubKey).send({
            'from': account.address,
            'gas': 3000000,
        }).then((data) => {
            add_log_entry('Checked in with hash ' + JSON.stringify(data))
        }).catch((err) => {
            add_log_entry('Error while checking in: ' + err.message)
        });

    });


    // check out
    document.getElementById('checkout-button').addEventListener("click", function () {

        check_balance();

        ticketing_contract.methods.checkOut().send({
            'from': account.address,
            'gas': 3000000,
        }).then(function (data) {
            add_log_entry('Checked out with hash ' + JSON.stringify(data))
        }).catch((err) => {
            add_log_entry('Error while checking out: ' + err.message)
        });
    });


    // list all trips for a user
    document.getElementById('list-all-trips-button').addEventListener("click", function () {
        ticketing_contract.methods.getTrips(
            // "0x6043bCCB598318da02663d01643030a9E255c198",
            account.address,
        ).call({
            'from': account.address,
        }).then((result) => {
            add_log_entry('Trips: ' + JSON.stringify(result))
        }).catch((err) => {
            add_log_entry('Error while listing trips: ' + err.message)
        });
    });

    document.getElementById('set-price-button').addEventListener("click", function () {

        let startTimestamp = document.getElementById('start-timestamp').value;

        // send price to SC
        ticketing_contract.methods.setPrice(
            document.getElementById('passenger-pub-key').value,
            String(4.5 * 100000000000000000),
            startTimestamp,
        ).send({
            'from': account.address,
            'gas': 3000000,
        }).then((data) => {
            add_log_entry('Setting price was a success: ' + JSON.stringify(data));
        }).catch((err) => {
            add_log_entry('Error while setting price: ' + err.message);
        });
    });


    // Sign and recover
    document.getElementById('sign-recover-button').addEventListener("click", function () {

        message = document.getElementById('message').value;

        add_log_entry('using private key ' + account.privateKey);
        add_log_entry('public key is ' + account.address);

        // sign
        let sig_obj = web3js_ws.eth.accounts.sign(message, account.privateKey);

        // QR code should consist of the message and the sig_obj.signature as json

        add_log_entry("signature object: " + JSON.stringify(sig_obj));

        add_log_entry("trying to get the public address from the signature...");

        let signature = sig_obj.signature;

        // the checking person receives the message and the signature via QR code from the passenger

        var pub_key = web3js_ws.eth.accounts.recover(message, signature);

        // now check the blockchain with the t

        add_log_entry(pub_key);

        if (pub_key === account.address) {
            add_log_entry("the calculated pub key matches the originally given one!")
        } else {
            add_log_entry("Something is not right, the calculated key doesnt match the one from the private key!")
        }
    });

    document.getElementById('clear-log-button').addEventListener("click", function () {
        document.getElementById("log").innerHTML = '';
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


// check balance...
function check_balance() {
    web3js_ws.eth.getBalance(WALLET_ADDRESS).then(function (balance) {
        add_log_entry('Sender wallet balance (WALLET_ADDRESS): ' + balance);
    });
}
