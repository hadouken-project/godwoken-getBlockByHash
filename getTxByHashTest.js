import { ReadOnlyValidTransaction } from "hardhat/internal/hardhat-network/provider/transactions/ReadOnlyValidTransaction.js";
import { rpcToTxData } from "hardhat/internal/hardhat-network/provider/fork/rpcToTxData.js";
import { Address, bufferToHex } from "@nomicfoundation/ethereumjs-util";
import { provider } from "./provider.js";

const rpcTransaction = await provider.getTransactionByHash(
  "0x086ddaff688612db0e9de17be6f0fe4f0d6626772dacb4057463617341774f24"
);
console.log("rpcTransaction", rpcTransaction);

const tx = new ReadOnlyValidTransaction(
  new Address(rpcTransaction.from),
  rpcToTxData(rpcTransaction)
);

const calculatedHash = tx.hash();
const rpcHash = rpcTransaction.hash;

console.log("calculatedHash", bufferToHex(calculatedHash));
console.log("rpcHash", bufferToHex(rpcHash));
