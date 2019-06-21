window.addEventListener('load', () => {
    // https://metamask.github.io/metamask-docs/Advanced_Concepts/Provider_API#ethereum.enable()
    window.ethereum.enable()
        .then(function (accounts) {
            // You now have an array of accounts!
            account = accounts[0];
            add_log_entry("Using "+account);
            web3 = new Web3(ethereum);

            var message = "Some string";
            var hash = web3.sha3(message);

            var signature = web3.eth.sign(hash, account, function() {});

            add_log_entry("Signature: "+signature);
        })
        .catch(function (reason) {
            // Handle error. Likely the user rejected the login:
            add_log_entry(reason)
        })
});
