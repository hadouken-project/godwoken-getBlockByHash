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
export const provider = new JsonRpcClient(httpProvider, networkId, 188652, 0);
