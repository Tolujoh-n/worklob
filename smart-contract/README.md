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

- Deploy a specific contract by selecting it's migration number `truffle migrate --f 3 --to 3`

##

- CONTRACT_ADDRESS:
- LOB_TOKEN_ADDRESS: 0x77950BA34F2EB2C3ce6cb0A0b73E894ba57B82b8
- STAKING_ADDRESS:

##

- Replace the Token contract address in the stacking migration file if you redeploy the token contract. as the contract address will change
