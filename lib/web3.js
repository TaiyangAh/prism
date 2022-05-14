import Web3 from "web3";
import PrismSale from "./PrismSale.json";

const web3 = new Web3(Web3.givenProvider || "ws://127.0.0.1:7545");

//set up contract
const contractAddress = "0x2E98F51Fadc0C79beAF648F0a4f8EBFe1B03614C";
const contract = new web3.eth.Contract(PrismSale.abi, contractAddress);

const sharedMessage =
  "This is to confirm your account when downloading the limited edition album";

export { web3, contract, contractAddress, sharedMessage };
