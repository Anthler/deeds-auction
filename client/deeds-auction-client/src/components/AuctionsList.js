import React, { Component } from "react";

import web3 from "../web3/web3";
import auctionInstance from "../contracts/contracts/auction";

class AuctionsList extends Component {
  state = {
    auctions: [],
    bidAmount: null,
    success: false
  };

  async componentDidMount() {
    const auctionsCount = await auctionInstance.methods
      .getAuctionCount()
      .call();

    for (let i = 0; i < auctionsCount; i++) {
      const auction = await auctionInstance.methods.getAuctionById(i).call();

      const auctionJson = {
        id: i,
        title: auction.name,
        ends: auction.blockDeadline,
        startPrice: auction.startPrice,
        metadata: auction.metadata,
        deedId: auction.deedId,
        owner: auction.owner,
        finalized: auction.finalized,
        active: auction.active
      };
      this.setState({ auctions: [...this.state.auctions, auctionJson] });
      console.log(this.state.auctions);
    }
  }

  bidOnAuction = async auctionId => {
    try {
      const { bidAmount } = this.state;
      const accounts = await web3.eth.getAccounts();
      await auctionInstance.methods.bidOnAuction(auctionId).send({
        from: accounts[0],
        value: web3.utils.toWei(bidAmount.toString(), "ether")
      });
      this.setState({ success: true });
    } catch (error) {
      console.log(error);
    }
  };

  updateAmount = event => {
    this.setState({ bidAmount: event.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h3> AUCTIONED DEEDS </h3>
          </div>
        </div>
        <br />
        {this.state.success ? (
          <div>
            <div className="alert alert-success" role="alert">
              Bidding successful
            </div>
          </div>
        ) : null}
        <div className="row justify-content-center">
          {this.state.auctions.map(auction => {
            return (
              <div key={auction.id} className="col-md-4 my-4">
                <div className="card " style={{ width: "20rem" }}>
                  <div className="card-header text-white bg-info">
                    <h5 className="card-title">{auction.title}</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    {/* <li className="list-group-item">
                      {" "}
                      <strong> OWNER: </strong> {auction.owner}
                    </li> */}
                    <li className="list-group-item">
                      <strong>DEED ID: </strong> {auction.deedId}
                    </li>
                    <li className="list-group-item">
                      <strong> START PRICE: </strong> ETH {auction.startPrice}
                    </li>

                    <li className="list-group-item">
                      <strong> AUACTION STATUS: </strong>{" "}
                      {auction.active ? (
                        <p style={{ color: "green", fontWeight: "bold" }}>
                          {" "}
                          Active
                        </p>
                      ) : (
                        <p style={{ color: "red", fontWeight: "bold" }}>
                          {" "}
                          Inactive
                        </p>
                      )}
                    </li>
                    <li className="list-group-item">
                      <strong> FINALIZED: </strong>{" "}
                      {auction.finlized ? (
                        <p style={{ color: "red", fontWeight: "bold" }}> Yes</p>
                      ) : (
                        <p style={{ color: "green", fontWeight: "bold" }}>
                          {" "}
                          No
                        </p>
                      )}
                    </li>
                  </ul>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="title">
                        {" "}
                        <strong>Bid on Auction </strong>
                      </label>
                      <input
                        onChange={this.updateAmount}
                        type="text"
                        id="title"
                        className="form-control"
                        placeholder="amount in ether"
                      />
                      <br />
                      <button
                        onClick={() => this.bidOnAuction(auction.id)}
                        className="btn btn-outline-success btn-block"
                      >
                        Bid
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default AuctionsList;
