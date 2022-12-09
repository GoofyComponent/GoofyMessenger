import React from "react";
import "../../css/navbar.css";
import GoofiLogo from "../../img/goffyLogo.png";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { accountService } from "../../_services/account.service";
import { Navigate, useNavigate } from "react-router-dom";
import { Form, Row, Container, Col, Button } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';

function Navbar() {
    let navigate = useNavigate();
   const logout = () => {
    accountService.logout();
    navigate("/login");
  };
    const token = localStorage.getItem("token");
  if (token !== null) {
    var decodedJwt: any = jwt_decode(token);
  }
  var UserMe = decodedJwt.firstname;
  console.log(UserMe);
  return ( 
    <>
      <div className="containers navbar" >
        <div className="row w-100 h-100">
          <div className="col-7 col-lg-9 d-flex">
            <img src={GoofiLogo} className="logo"></img>
            <h4 className="p-3 title">Goofy <br/>Messenger</h4>
          </div>
          <div className="col-5 col-lg-3">
            <Dropdown>
              <Dropdown.Toggle className="d-flex align-items-center btn-logout ms-auto">
                <div className="PP"></div>
                <span className="navbarUser px-3">{UserMe}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
          </div>
        </div>
      </div>
    </>

  );
}

export default Navbar;