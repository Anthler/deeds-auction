import AuctionContractABI from "./AuctionContract.json";

import web3 from "../../web3/web3";

const contractAddress = "0x66cc7770a31168fb1503db60133338f1f51b4cdf";

const auctionInstance = new web3.eth.Contract(
  AuctionContractABI,
  contractAddress
);

console.log("Instance", auctionInstance.methods);

export default auctionInstance;
