import { useState } from "react";
import logo from "../assets/card-file-box-svgrepo-com.svg";
import "../Styles/Header.css";

const Header = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
          <img src={logo} alt="Logo" id="Logo" />
        </a>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="/Home">
              Home
            </a>
            <a className="nav-link" href="/AddCard">
              Add Card
            </a>
            <a className="nav-link" href="#">
              Profile
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
