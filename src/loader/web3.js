import Web3 from "web3"

export default async () => {
    const web3 = new Web3(process.env.RPC_URL)
    web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY)
    web3.eth.defaultAccount = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY).address;
    return web3;
}