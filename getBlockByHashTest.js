import { Block } from "@nomicfoundation/ethereumjs-block";
import { rpcToBlockData } from "hardhat/internal/hardhat-network/provider/fork/rpcToBlockData.js";
import { provider } from "./provider.js";
import { bufferToHex } from "@nomicfoundation/ethereumjs-util";

const rpcBlock = await provider.getBlockByHash(
  "0x9207b685f981f6bdd1a191de60db31557bafc4774cb2093b395a6c4407b0e6f3",
  true
);

const blockData = rpcToBlockData({
  ...rpcBlock,
  transactions: [],
});
const block = Block.fromBlockData(blockData, {
  freeze: false,
  skipConsensusFormatValidation: true,
});

const calculatedHash = block.hash();
const rpcHash = rpcBlock.hash;

console.log("calculatedHash", bufferToHex(calculatedHash));
console.log("rpcHash", bufferToHex(rpcHash));
