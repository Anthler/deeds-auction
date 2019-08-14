import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

import "./index.css";
import App from "./App";

import Auction from "./components/Auction";
import Deed from "./components/Deed";

import "bootstrap/dist/css/bootstrap.min.css";
import AuctionsList from "./components/AuctionsList";

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/deed/create" component={Deed} />
      <Route exact path="/auction/create" component={Auction} />
      <Route exact path="/auctions" component={AuctionsList} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
