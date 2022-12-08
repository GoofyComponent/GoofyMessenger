import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Container, Col, Button } from "react-bootstrap";
import axios from "axios";
import "../../css/login.css";
import "../../css/bottombar.css";
import Sidebar from "../SideBar/sideBar";

import BottomBar from "../BottomBar/BottomBar";
import MessageListe from "../MessageListe/messageListe";

function Home() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-5 col-md-3 sidebarcol">
          <Sidebar></Sidebar>
        </div>
        <div className="col-7 col-md-9">
          <div className="container-fluid ">
            <div className="row">
              <div className="col-12 messagecol">
                <MessageListe></MessageListe>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 bottombarcol">
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
