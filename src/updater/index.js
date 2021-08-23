import EventFetcher from "../events/fetcher";
import bridgeABI from "../../ABIs/bridge";
import Sender from "../sender";
import GasCalculator from "../gas";

export default class Updater {
    constructor(web3) {
        this.web3 = web3;
        this.eventFetcher = new EventFetcher();
        this.sender = new Sender(web3);
        this.gasCalculator = new GasCalculator(web3);
    }
    formatAddress(topicAddress) {
        return `0x${topicAddress.substring(26)}`;
    }
    async update(from, to) {
        let nonce;
        const sender = this.web3.eth.defaultAccount;
        const amount = await this.gasCalculator.calculate();
        const bridge = new this.web3.eth.Contract(bridgeABI, process.env.BRIDGE);
        const events = await this.eventFetcher.fetch(bridge, 'ProposalEvent', from, to);
        nonce = await this.web3.eth.getTransactionCount(sender);
        for (const event of events) {
            if (event.returnValues.status === '3') {
                console.log(`Dispensing ${amount.toString()} gas to ${to}`);
                const txn = await this.web3.eth.getTransactionReceipt(event.transactionHash);
                const recipient = this.formatAddress(txn.logs[0].topics[2]);
                await this.sender.send(sender, recipient, amount, nonce);
                nonce += 1;
            }
        }
    }
}