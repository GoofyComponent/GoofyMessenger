import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Container, Col, Button } from "react-bootstrap";
import axios from "axios";
import { AxiosRequestConfig } from "axios";
import "../../css/login.css";
import { accountService } from "../../_services/account.service";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (e: any) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    console.log(e.target.value);
    console.log(e.target.name);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(credentials);

    var url = "http://localhost:8245/api/login";
    var config = {};

    axios
      .post(url, {
        username: credentials.username,
        password: credentials.password,
      })
      .then((res) => {
        console.log(res);
        const JWT = res.data.token;
        console.log(JWT);
        accountService.saveToken(JWT);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        console.log("error");
      });
  };

  return (
    <>
      <form onSubmit={onSubmit} className="formLogReg mx-auto p-4">
        <h4 className=" text-md-center mb-4"> Connexion </h4>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label ">
            Email address{" "}
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="username"
            value={credentials.username}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>
        <button
          type="submit"
          className="btn form-control mt-4 mb-2"
        >
          Login{" "}
        </button>
        <button
          className="mt-2 linkbtn text-center"
          onClick={() => navigate("/register")}
        >
          {" "}
          Don't have an account ? Resgister here{" "}
        </button>
      </form>
    </>
  );
}

export default Login;
