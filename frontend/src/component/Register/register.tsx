import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Container, Col, Button } from "react-bootstrap";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function register() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const onChange = (e: any) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    var url = "http://localhost:8245/api/register";
    var config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(
        url,
        {
          email: credentials.email,
          password: credentials.password,
          firstname: credentials.firstname,
          lastname: credentials.lastname,
        },
        config
      )
      .then((res) => {
        const JWT = res.data.token;
        navigate("/home");
      })
      .catch((err) => {});
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="formLogReg mx-auto p-4">
        <h4 className=" text-md-center mb-4"> Register </h4>
        <div className="mb-3">
          <label htmlFor="name" className="form-label ">
            firstname{" "}
          </label>
          <input
            className="form-control"
            id="exampleInputName"
            name="firstname"
            value={credentials.firstname}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label ">
            lastname{" "}
          </label>
          <input
            className="form-control"
            id="exampleInputName"
            name="lastname"
            value={credentials.lastname}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label ">
            Email address{" "}
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn  form-control mt-4 mb-2">
          Register{" "}
        </button>

        <button
          className="mt-2 linkbtn text-center"
          onClick={() => navigate("/login")}
        >
          {" "}
          Already have an account? Login here.{" "}
        </button>
      </form>
    </div>
  );
}
