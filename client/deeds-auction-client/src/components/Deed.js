import React, { Component } from "react";

import deedInstance from "../contracts/contracts/deed";
import web3 from "../web3/web3";
import Header from "./Header";

//import Header from "./components/Header";

class Deed extends Component {
  state = {
    tokenId: null,
    uri: "",
    success: false
  };

  createToken = async event => {
    event.preventDefault();

    try {
      const { uri, tokenId } = this.state;
      const accounts = await web3.eth.getAccounts();

      console.log(tokenId, uri);
      await deedInstance.methods
        .registerDeed(tokenId, uri)
        .send({ from: accounts[0] });
      this.setState({ success: true });
    } catch (error) {
      console.log(error);
    }
  };

  updateTokenId = event => {
    this.setState({ tokenId: event.target.value });
    console.log(this.state.tokenId);
  };

  updateTokenUri = event => {
    this.setState({ uri: event.target.value });
    console.log(this.state.uri);
  };
  render() {
    return (
      <div>
        <Header />
        <div className="container d-flex flex-column justify-content-center ">
          {this.state.success ? (
            <div>
              <div className="alert alert-success" role="alert">
                Your deed token was created successfully
              </div>
            </div>
          ) : null}
          {/* <div className="row justify-content-center">
            <div className="col-md-12">
              <button className="btn btn-primary">Lookup Deed Info </button>
            </div>
          </div> */}
          <br />

          <div className="row justify-content-center">
            <div className="col-md-6 ">
              <h4> REGISTER A NEW DEED </h4>
            </div>
          </div>
          <br />
          <div className="row justify-content-center">
            <div className="col col-md-8">
              <div className="col-md-8">
                <form>
                  <div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">DEED ID:</label>
                      <input
                        onChange={this.updateTokenId}
                        type="text"
                        className="form-control"
                        placeholder="Enter Token Id"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">DEED URI: </label>
                      <input
                        onChange={this.updateTokenUri}
                        type="text"
                        className="form-control"
                        placeholder="Enter Token Uri"
                      />
                    </div>
                    <button
                      onClick={this.createToken}
                      className="btn btn-success btn-block"
                    >
                      ADD DEED
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

export default Deed;
