# Worklob Contract

## Install

- `cd smart-contract`

```
npm install --save @truffle/hdwallet-provider
npm install --save dotenv
npm install --save @openzeppelin/contracts
```

## Deploy

- `truffle migrate --network baseTestnet`

- Deploy a specific contract by selecting it's migration number `truffle migrate --network baseTestnet --f 3 --to 3`

##

- CONTRACT_ADDRESS:
- LOB_TOKEN_ADDRESS: 0xa28C8a6dC4Ba993CBb8a2C704c60347bdE2a53a4
- STAKING_ADDRESS: 0x444D88F88B1Aa5DC06bC625FD1123a6c3d257061

##

- Replace the Token contract address in the stacking migration file if you redeploy the token contract. as the contract address will change
