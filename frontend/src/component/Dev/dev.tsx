import React, { useEffect } from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Container, Col, Button } from "react-bootstrap";
import axios from "axios";
import "../../css/login.css";
import Sidebar from "../SideBar/sideBar";

function Dev() {
  // authentification bearer
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NjkzMjc0OTcsImV4cCI6MTY2OTY4NzQ5Nywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiZmhhcmJlckBzZW5nZXIuY29tIn0.bQwIVMo7f3cqrVZ_RUVRFvCA0JToE7v7O8jpoXpNzXjIMDR2bWeAJ57bEGSD-gMDdulo87snHLxJAqRdmc_HnxSJnjuFLP6xQl35tY4Tz_sqkAP38PuHtPOnZIs1UrOQi13saus1i7UVXezsAEA4T468y9u9FhfWs3R-kwJ8-KEtjDhU1J9mPQh_6lPlZSMFJx46eUoHbRthRwk-i9i8tnqh2XuAugJ1I4XOtcTLKMXr0RWs2YimDhEzPd5RT7FBP9RnYG1QcuHq3cXXm04Om5Nq3r_1S0YXpNlOc4NAQ8zHsx-t_b6oipT_AasHSevOSj6cE3-NfPfk5R76a2sjfA";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    axios.get("http://localhost:8245/api/users/1", config).then((res) => {});
  }, []);

  return <></>;
}

export default Dev;
