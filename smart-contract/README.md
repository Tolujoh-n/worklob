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
- STAKING_ADDRESS: 0x2c342f775Fbba851654915061b679015e8Bf3eC7

##

- Replace the Token contract address in the stacking migration file if you redeploy the token contract. as the contract address will change
