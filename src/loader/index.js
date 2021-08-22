import loadWeb3 from './web3';

import dotenv from 'dotenv';

dotenv.config();


export default async () => {
    const web3 = await loadWeb3();
    return { web3 };
}