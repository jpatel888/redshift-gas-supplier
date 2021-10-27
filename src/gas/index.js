import { GIGA_WEI } from "../constants";
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
            .times(new BN(GIGA_WEI))
            .times(new BN(process.env.GAS_TO_SEND))
            .times(new BN(process.env.GAS_SCALAR))
            .div(new BN(process.env.DIVIDE_BY || '1'));
        return total;
    }
}