import React, { useEffect } from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Container, Col, Button } from "react-bootstrap";
import axios from "axios";
import "../../css/login.css";
import Sidebar from "../sideBar/sideBar";

function Dev() {

  useEffect(() => {
    axios.get("http://localhost:8245/api/users/1").then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <>
    </>
  );
}

export default Dev;
