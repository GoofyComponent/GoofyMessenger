import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Container, Col, Button } from "react-bootstrap";

export default function register() {
  return (
    <div>
      <form className=" mx-auto p-4">
        <h4 className=" text-md-center mb-4 text-primary"> Register </h4>
        <div className="mb-3">
          <label htmlFor="name" className="form-label ">
            Full Name{" "}
          </label>
          <input type="" className="form-control" id="exampleInputName" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label ">
            Email address{" "}
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
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
          />
        </div>
        <button
          type="submit"
          className="btn btn-outline-primary form-control mt-4 mb-2"
        >
          Login{" "}
        </button>
        <button className="mt-2 text-center">
          {" "}
          Already have an account? Login here.{" "}
        </button>
      </form>
    </div>
  );
}
