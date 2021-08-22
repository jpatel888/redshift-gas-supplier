export default class Sender {
    constructor(web3) {
        this.web3 = web3;
    }
    async send(from, to, value, nonce, gas = 21000) {
        this.web3.eth.sendTransaction({
            from, to, value, gas, nonce
        }).then(console.log);
    }
}