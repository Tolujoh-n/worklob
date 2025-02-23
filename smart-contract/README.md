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
- LOB_TOKEN_ADDRESS: 0xC677a1b3461B2417D7789331357606d8Bb17FD24
- STAKING_ADDRESS: 0x5B4fB44257c4CC1c178B4a2f63B99d03528b5eFD

##

- Replace the Token contract address in the stacking migration file if you redeploy the token contract. as the contract address will change
