import { Block } from "@nomicfoundation/ethereumjs-block";
import { rpcToBlockData } from "hardhat/internal/hardhat-network/provider/fork/rpcToBlockData.js";
import { JsonRpcClient } from "hardhat/internal/hardhat-network/jsonrpc/client.js";
import { HttpProvider } from "hardhat/internal/core/providers/http.js";

const httpProvider = new HttpProvider(
  "https://v1.mainnet.godwoken.io/rpc",
  "hardhat",
  { "Content-Type": "application/json" },
  35000
);
const networkIdString = await httpProvider.request({
  method: "net_version",
});
const networkId = parseInt(networkIdString, 10);
const provider = new JsonRpcClient(httpProvider, networkId, 188652, 0);
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
console.log("calculatedHash", calculatedHash);
console.log("rpcHash", rpcHash);
