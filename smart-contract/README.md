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
- LOB_TOKEN_ADDRESS: 0x51dA94735189ef7B2cb0c333BdACB1425d6f2943
- STAKING_ADDRESS: 0x1c425205DB98F9dd3Ff59Ab804d9793eA6705862

##

- Replace the Token contract address in the stacking migration file if you redeploy the token contract. as the contract address will change
