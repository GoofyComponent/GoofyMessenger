import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Container, Col, Button } from "react-bootstrap";
import axios from "axios";
import "../../css/login.css";
import Sidebar from "../SideBar/sideBar";
import BottomBar from "../BottomBar/BottomBar";
import MessageListe from "../MessageListe/messageListe";

function Home() {
  return (
    <div className="div">
      <div className="row">
        <div className="col-3">
          <Sidebar></Sidebar>
        </div>
        <div className="col-9">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <MessageListe></MessageListe>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <BottomBar></BottomBar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
