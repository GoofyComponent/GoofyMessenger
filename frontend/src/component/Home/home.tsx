import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Container, Col, Button } from "react-bootstrap";
import axios from "axios";
import "../../css/login.css";
import Sidebar from "../sideBar/sideBar";

function Home() {
  return (
    <>
      <Sidebar></Sidebar>
    </>
  );
}

export default Home;