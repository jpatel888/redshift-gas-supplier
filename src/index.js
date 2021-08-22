import load from './loader';
import Cron from './cron';

async function start() {
    const { web3 } = await load();
    const cron = new Cron(web3);
    cron.start();
}

start();