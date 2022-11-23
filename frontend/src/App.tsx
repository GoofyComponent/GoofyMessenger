import { SetStateAction, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Container, Col, Button } from "react-bootstrap";
import "./App.css";
import Login from "./component/Login/login";
import Home from "./component/Home/home";
import Register from "./component/Register/register";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [currentForm, setCurrentForm] = useState("login");
  const toggleForm = (formName: SetStateAction<string>) => {
    setCurrentForm(formName);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
