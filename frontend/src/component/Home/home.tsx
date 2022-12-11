import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../../css/login.css";
import "../../css/bottombar.css";
import Sidebar from "../SideBar/sideBar";
import BottomBar from "../BottomBar/BottomBar";
import MessageListe from "../MessageListe/messageListe";
import Navbar from "../Navbar/navbar";
import { HiddenEasterEgg } from "react-hidden-easter-egg";
import AAAH from "../../img/AAAAAH.mp3";

function Home() {
  var audio = new Audio(AAAH);
  function playSound() {
    if (audio) {
      audio.play();
    }
  }
  return (
    <div className="container-fluid">
      <HiddenEasterEgg
        code={["j", "f"]}
        resetEggMs={1}
        cb={() => playSound()}
        children={undefined}
      ></HiddenEasterEgg>
      <div className="row">
        <div className="d-none d-md-block col-md-4 col-xl-3 ps-0 sidebarcol">
          <Sidebar></Sidebar>
        </div>
        <div className="col-12 col-md-8 col-xl-9 pe-0">
          <div className="container-fluid  ">
            <div className="row">
              <div className="col-12  navbarcol">
                <Navbar></Navbar>
              </div>
            </div>
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
