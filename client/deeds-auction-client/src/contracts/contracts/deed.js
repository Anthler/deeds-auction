import DeedContractABI from "./DeedContract.json";

import web3 from "../../web3/web3";

const contractAddress = "0x7dd1fe546bcc9e96d647c0fc1da121e46fba2c89";

const deedInstance = new web3.eth.Contract(DeedContractABI, contractAddress);
console.log("deedInstance", deedInstance.methods);

export default deedInstance;
