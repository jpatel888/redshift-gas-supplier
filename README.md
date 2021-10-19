# redshift-gas-supplier

Redshift is an EVM inter-chain bridge protocol built on Chainsafe's ChainBridge.


Users transfer ERC20 tokens across chains by sending them to a bridge contract that deposits those ERC20 tokens to the user's address on the destination chain.

A problem most users have is then actually using the bridged ERC20 tokens when it's their first time on the destination chain and they don't have gas to unwrap or trade the token.

This gas supplier watches for bridge-in events on a chain, and dispenses enough gas to do either when they happen.


A gas supplier is preferable to a faucet for 2 reasons:
1. Faucets can be attacked
2. Gas is only dispensed when a bridge event occurs, which requires a few hundreds of times higher than the gas that'll be dispensed.


## Running Gas Supplier

1. Install dependencies
```npm i```

2. Copy the .env
```cp .env.example .env```

3. Run the app (you can use supervisor or pm2 or whatever to keep it up)
```npm run start```
