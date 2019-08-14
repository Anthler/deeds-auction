import React, { Component } from "react";
import web3 from "./web3/web3";
import deedInstance from "./contracts/contracts/deed";
import auctionInstance from "./contracts/contracts/auction";
import Header from "./components/Header";
import AuctionsList from "./components/AuctionsList";

class App extends Component {
  state = {
    deedId: 0,
    account: "",
    contract: null
  };

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();

    const owner = await deedInstance.methods
      .ownerOf(1)
      .call({ from: accounts[0] });
    console.log(owner);

    const auctCount = await auctionInstance.methods.getAuctionCount().call();
    console.log(auctCount);
  }

  render() {
    return (
      <div>
        <Header />
        <br />
        <div className="container">
          <AuctionsList />
        </div>
      </div>
    );
  }
}

export default App;
