import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          DEE-AUCTION
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Auctions</a>
            </li>

            <li className="nav-item">
              <a className="nav-link ">Deeds</a>
            </li>
          </ul>
        </div>
      </nav>
      {/* <h4>
        {" "}
        <Link to="/">Home</Link>{" "}
      </h4>
      <h4>
        {" "}
        <Link to="/deed">Deeds</Link>{" "}
      </h4>
      <h4>
        {" "}
        <Link to="/auction">Auctions</Link>{" "}
      </h4> */}
    </div>
  );
};

export default Header;
