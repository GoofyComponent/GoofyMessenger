import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../../css/login.css";
import "../../css/home.css";
import "../../css/bottombar.css";
import Sidebar from "../SideBar/sideBar";
import BottomBar from "../BottomBar/BottomBar";
import MessageListe from "../MessageListe/messageListe";
import Navbar from "../Navbar/navbar";
import { HiddenEasterEgg } from "react-hidden-easter-egg";
import AAAH from "../../img/AAAAAH.mp3";
import Qrcode from "../Qrcode/Qrcode";

function Home() {
  const { idConv } = useParams();
  const [isOpen, setIsOpen] = useState(false);

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
          <Qrcode isOpen={isOpen} onChange={setIsOpen}></Qrcode>
          <Sidebar></Sidebar>
        </div>
        <div className="col-12 col-md-8 col-xl-9 pe-0">
          <div className="container-fluid  ">
            <div className="row">
              <div className="col-12  navbarcol">
                <Navbar></Navbar>
              </div>
            </div>
          </div>
          {/* // si idConv est undefined, on affiche rien */}
          {idConv ? (
            <>
              <div className="container-fluid">
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
            </>
          ) : (
            <>
              <div className="container-fluid d-flex align-items-center pasmsg">
                <div className="row m-auto">
                  <div className="col-12 ">
                    <h2>Commencez une nouvelle conversation</h2>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
