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
- LOB_TOKEN_ADDRESS: 0x77042618A5712F52004359d6b507cc24c7Ef2276
- STAKING_ADDRESS: 0xa4D841AC2182665Fa2896e74fC978A0Bc7c36256

##

- Replace the Token contract address in the stacking migration file if you redeploy the token contract. as the contract address will change
