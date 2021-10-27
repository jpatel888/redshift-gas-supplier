import cron from "node-cron";
import Sender from "../sender";
import Updater from "../updater";

export default class Cron {
    constructor(web3) {
        this.web3 = web3;
        this.lastBlock = null;
        this.sender = new Sender(web3);
        this.updater = new Updater(web3);
    }
    async start() {
        let isUpdating = false;
        const interval = process.env.POLLING_CRON_STRING;
        cron.schedule(interval, async () => {
            try {
                if (isUpdating) return;
                console.log(`Polling for new blocks...`)
                const block = await this.web3.eth.getBlockNumber();
                if (this.lastBlock && block > this.lastBlock) {
                    console.log(`New blocks found. Updating from ${this.lastBlock + 1} to ${block}`);
                    isUpdating = true;
                    await this.updater.update(this.lastBlock + 1, block);
                    isUpdating = false;
                }
                this.lastBlock = block;
            } catch (e) {
                console.error(e);
                isUpdating = false;
            }
        });
    }
}