File `hardhat-changes` contains all changes made to hardhat repository made locally to overcome invalid response for`eth_getBlockByHash` and `eth_getTransactionByHash`

Godwoken RPC call `eth_getBlockByHash` returns some fields with value equal to zero like for this call for block `0x9207b685f981f6bdd1a191de60db31557bafc4774cb2093b395a6c4407b0e6f3`:
```javascript
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "number": "0x2d9e2",
    "hash": "0x9207b685f981f6bdd1a191de60db31557bafc4774cb2093b395a6c4407b0e6f3",
    "parentHash": "0xa249cedb8db0df188435d5062c028379b2aaa554c2e64e9b3c8860b621978893",
    "gasLimit": "0x1589ba",
    "gasUsed": "0x126c1f",
    "miner": "0xb8cde090e6a4741b6450308fad1dc338c53936a0",
    "size": "0x210",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "transactions": [
      "0x086ddaff688612db0e9de17be6f0fe4f0d6626772dacb4057463617341774f24",
      "0x018206132a614715bd0a44beccd85816b6980d1641946faa06b22b17ce8949d0",
      "0x1083af24aa8d5fb6c0a801f33bffbd2fff9d5c1075f309a7917c943ca00eefef",
      "0xd357785e8459d1972d0077cae330e5561e842ca072dd3571395d89893f307f24",
      "0x62ba12ca51eececa54e15d4a5819246f390cb7037db43341bae9979623908949",
      "0xea5978e2e08eb1dfdadfba1f71280821d9b0c0b7d60b058f3ad56c075c3c1372"
    ],
    "timestamp": "0x634f55fe",
    "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "nonce": "0x0000000000000000",
    "stateRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "sha3Uncles": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "receiptsRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "transactionsRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "uncles": [],
    "difficulty": "0x8e1bc9bf04000",
    "totalDifficulty": "0x8e1bc9bf04000",
    "extraData": "0x"
  }
}
```
Also visible in [gwscan](https://v1.gwscan.com/block/0x9207b685f981f6bdd1a191de60db31557bafc4774cb2093b395a6c4407b0e6f3?tab=raw-data)

This is problem for hardhat fork feature beacous we need to be able to calculated block hash from these parameters but since some of them are equal to zero the calculated hash is invalid. Godwoken RPC should return correct parameters that would get same hash for calculated and rpc hash in the `getBlockByHashTest.js` file.

Similar issue related to `eth_getTransactionByHash` but it's not clear which values in RPC call are incorrect. Test regarding calculated and received tx hash is avaible in `getTxByHashTest.js`.