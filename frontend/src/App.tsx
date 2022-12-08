import { SetStateAction, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Container, Col, Button } from "react-bootstrap";
import "./App.css";
import Login from "./component/Login/login";
import Home from "./component/Home/home";

import Register from "./component/Register/register";
import Dev from "./component/Dev/dev";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthGuard from "./_helpers/AuthGuard";

function App() {
  const [currentForm, setCurrentForm] = useState("login");
  const toggleForm = (formName: SetStateAction<string>) => {
    setCurrentForm(formName);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/home/:idConv"
            element={
              <AuthGuard>
                <Home />
              </AuthGuard>
            }
          />
          <Route>
            <Route
              path="/home"
              element={
                <AuthGuard>
                  <Home />
                </AuthGuard>
              }
            />
            <Route path="/:idConv" element />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dev" element={<Dev />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
