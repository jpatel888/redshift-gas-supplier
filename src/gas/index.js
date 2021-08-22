import { UNWRAP_GAS_LIMIT } from "../constants";
import axios from 'axios';
import BN from 'bignumber.js';

export default class GasCalculator {
    constructor(web3) {
        this.web3 = web3;
    }
    async fetch() {
        const prices = (await axios.get(process.env.GAS_API))?.data;
        return prices?.fast;
    }
    async calculate() {
        const gasPrice = await this.fetch();
        if (!gasPrice) throw new Error('Error fetching gas price');
        const total = new BN(gasPrice)
            .times(new BN(UNWRAP_GAS_LIMIT))
            .times(new BN(process.env.GAS_SCALAR))
            .div(new BN('10'));
        return total;
    }
}