import React, { Component } from "react";

import web3 from "../web3/web3";
import auctionInstance from "../contracts/contracts/auction";
import Header from "./Header";

class Auction extends Component {
  state = {
    tokenId: null,
    metaData: "",
    startPrice: null,
    auctionTitle: "",
    auctionEnds: null,
    success: false
  };

  createAuction = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const {
      tokenId,
      metaData,
      startPrice,
      auctionTitle,
      uri,
      auctionEnds
    } = this.state;
    await auctionInstance.methods
      .createAuction(tokenId, auctionTitle, metaData, startPrice, auctionEnds)
      .send({ from: accounts[0] });
    this.setState({ success: true });
  };
  updateAuctionEnds = event => {
    this.setState({ auctionEnds: event.target.value });
  };

  updateAuctionTitle = event => {
    this.setState({ auctionTitle: event.target.value });
  };

  updateStartPrice = event => {
    this.setState({ startPrice: event.target.value });
  };

  updateMetaData = event => {
    this.setState({ metaData: event.target.value });
  };

  updateUri = event => {
    this.setState({ uri: event.target.value });
  };
  updateTokenId = event => {
    this.setState({ tokenId: event.target.value });
  };

  render() {
    return (
      <div>
        <Header />
        <br />
        <br />
        <div className="container justify-content-center">
          {this.state.success ? (
            <div>
              <div className="alert alert-success" role="alert">
                Your auction was created successfully
              </div>
            </div>
          ) : null}

          <div className="row justify-content-center ">
            <div className="col-md-6">
              <h4> AUCTION YOUR DEEDS </h4>
            </div>
          </div>
          <hr />
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="col-md-8">
                <form>
                  <div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">DEED ID: </label>
                      <input
                        onChange={this.updateTokenId}
                        type="text"
                        className="form-control"
                        placeholder="Enter Token Id"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="title">AUCTION TITLE: </label>
                      <input
                        onChange={this.updateAuctionTitle}
                        type="text"
                        id="title"
                        className="form-control"
                        placeholder="Auction Title"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="title">DEED METADATA: </label>
                      <input
                        onChange={this.updateMetaData}
                        type="text"
                        id="title"
                        className="form-control"
                        placeholder="Deed Metadata"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="title">START PRICE: </label>
                      <input
                        onChange={this.updateStartPrice}
                        type="text"
                        id="title"
                        className="form-control"
                        placeholder="Start price in ether"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="title">AUCTION ENDS: </label>
                      <input
                        onChange={this.updateAuctionEnds}
                        type="text"
                        id="title"
                        className="form-control"
                        placeholder="Auction bidding ends"
                      />
                    </div>
                    <button
                      onClick={this.createAuction}
                      className="btn btn-success btn-block"
                    >
                      CREATE AUCTION
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Auction;
