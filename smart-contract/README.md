# Worklob Contract

## Install

- `cd smart-contract`

```
npm install --save @truffle/hdwallet-provider
npm install --save dotenv
npm install --save @openzeppelin/contracts
```

## Deploy

- `truffle migrate --network flameTestnet`

- Deploy a specific contract by selecting it's migration number `truffle migrate --network flameTestnet --f 3 --to 3`

##

- LOB_TOKEN_ADDRESS: 0x77950BA34F2EB2C3ce6cb0A0b73E894ba57B82b8
- STAKING_ADDRESS: 0xA0754eAFacf78b81839D7FD8D6Bf9FB777EC3576
- JOB_CONTRACT_ADDRESS: 0xcD370B6B14fEf75C88b68Ceb98b3dFfE2D6Feb8b

##

- Replace the Token contract address in the stacking and job_contract migration file if you redeploy the token contract. as the contract address will change
