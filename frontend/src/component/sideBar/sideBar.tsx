import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Container, Col, Button } from "react-bootstrap";
import SearchIcon from "../../img/magnifying-glass-solid.svg";
import "../../css/sidebar.css";
import { accountService } from "../../_services/account.service";
import { useNavigate } from "react-router-dom";

function sidebar() {
  let navigate = useNavigate();

  const logout = () => {
    accountService.logout();
    navigate("/login");
  };

  return (
    <div className="sideBar">
      <Row>
        <Col className="d-flex">
          <h1 className="p-3">Chat</h1>
          <Button onClick={logout} className="">
            logout
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="justify-content-center d-flex align-items-center">
          <img src={SearchIcon} alt="search" className="searchIcon mx-2" />
          <input type="search" name="name" className="search" />
        </Col>
      </Row>
      <Row className="w-100 contactListBox mt-2">
        <Col>
          <ul className="contactList">
            <li className="contact">
              <div className="contactBox mx-2">
                <div className="contactinfos row py-2 w-100">
                  <div className="col-3">
                    <div className="pp"></div>
                  </div>
                  <div className="col-9">
                    <h5 className="name m-0">Adrien</h5>
                    <span className="lastMessage">Hello</span>
                  </div>
                </div>
              </div>
            </li>
            <li className="contact">
              <div className="contactBox mx-2">
                <div className="contactinfos row py-2 w-100">
                  <div className="col-3">
                    <div className="pp"></div>
                  </div>
                  <div className="col-9">
                    <h5 className="name m-0">Adrien</h5>
                    <span className="lastMessage">Hello</span>
                  </div>
                </div>
              </div>
            </li>
            <li className="contact">
              <div className="contactBox mx-2">
                <div className="contactinfos row py-2 w-100">
                  <div className="col-3">
                    <div className="pp"></div>
                  </div>
                  <div className="col-9">
                    <h5 className="name m-0">Adrien</h5>
                    <span className="lastMessage">Hello</span>
                  </div>
                </div>
              </div>
            </li>
            <li className="contact">
              <div className="contactBox mx-2">
                <div className="contactinfos row py-2 w-100">
                  <div className="col-3">
                    <div className="pp"></div>
                  </div>
                  <div className="col-9">
                    <h5 className="name m-0">Adrien</h5>
                    <span className="lastMessage">Hello</span>
                  </div>
                </div>
              </div>
            </li>
            <li className="contact">
              <div className="contactBox mx-2">
                <div className="contactinfos row py-2 w-100">
                  <div className="col-3">
                    <div className="pp"></div>
                  </div>
                  <div className="col-9">
                    <h5 className="name m-0">Adrien</h5>
                    <span className="lastMessage">Hello</span>
                  </div>
                </div>
              </div>
            </li>
            <li className="contact">
              <div className="contactBox mx-2">
                <div className="contactinfos row py-2 w-100">
                  <div className="col-3">
                    <div className="pp"></div>
                  </div>
                  <div className="col-9">
                    <h5 className="name m-0">Adrien</h5>
                    <span className="lastMessage">Hello</span>
                  </div>
                </div>
              </div>
            </li>
            <li className="contact">
              <div className="contactBox mx-2">
                <div className="contactinfos row py-2 w-100">
                  <div className="col-3">
                    <div className="pp"></div>
                  </div>
                  <div className="col-9">
                    <h5 className="name m-0">Adrien</h5>
                    <span className="lastMessage">Hello</span>
                  </div>
                </div>
              </div>
            </li>
            <li className="contact">
              <div className="contactBox mx-2">
                <div className="contactinfos row py-2 w-100">
                  <div className="col-3">
                    <div className="pp"></div>
                  </div>
                  <div className="col-9">
                    <h5 className="name m-0">Adrien</h5>
                    <span className="lastMessage">Hello</span>
                  </div>
                </div>
              </div>
            </li>
            <li className="contact">
              <div className="contactBox mx-2">
                <div className="contactinfos row py-2 w-100">
                  <div className="col-3">
                    <div className="pp"></div>
                  </div>
                  <div className="col-9">
                    <h5 className="name m-0">Adrien</h5>
                    <span className="lastMessage">Hello</span>
                  </div>
                </div>
              </div>
            </li>
            <li className="contact">
              <div className="contactBox mx-2">
                <div className="contactinfos row py-2 w-100">
                  <div className="col-3">
                    <div className="pp"></div>
                  </div>
                  <div className="col-9">
                    <h5 className="name m-0">Adrien</h5>
                    <span className="lastMessage">Hello</span>
                  </div>
                </div>
              </div>
            </li>
            <li className="contact">
              <div className="contactBox mx-2">
                <div className="contactinfos row py-2 w-100">
                  <div className="col-3">
                    <div className="pp"></div>
                  </div>
                  <div className="col-9">
                    <h5 className="name m-0">Adrien</h5>
                    <span className="lastMessage">Hello</span>
                  </div>
                </div>
              </div>
            </li>
            <li className="contact">
              <div className="contactBox mx-2">
                <div className="contactinfos row py-2 w-100">
                  <div className="col-3">
                    <div className="pp"></div>
                  </div>
                  <div className="col-9">
                    <h5 className="name m-0">Adrien</h5>
                    <span className="lastMessage">Hello</span>
                  </div>
                </div>
              </div>
            </li>
            <li className="contact">
              <div className="contactBox mx-2">
                <div className="contactinfos row py-2 w-100">
                  <div className="col-3">
                    <div className="pp"></div>
                  </div>
                  <div className="col-9">
                    <h5 className="name m-0">Adrien</h5>
                    <span className="lastMessage">Hello</span>
                  </div>
                </div>
              </div>
            </li>
            <li className="contact">
              <div className="contactBox mx-2">
                <div className="contactinfos row py-2 w-100">
                  <div className="col-3">
                    <div className="pp"></div>
                  </div>
                  <div className="col-9">
                    <h5 className="name m-0">Adrien</h5>
                    <span className="lastMessage">Hello</span>
                  </div>
                </div>
              </div>
            </li>
            <li className="contact">
              <div className="contactBox mx-2">
                <div className="contactinfos row py-2 w-100">
                  <div className="col-3">
                    <div className="pp"></div>
                  </div>
                  <div className="col-9">
                    <h5 className="name m-0">Adrien</h5>
                    <span className="lastMessage">Hello</span>
                  </div>
                </div>
              </div>
            </li>
            <li className="contact">
              <div className="contactBox mx-2">
                <div className="contactinfos row py-2 w-100">
                  <div className="col-3">
                    <div className="pp"></div>
                  </div>
                  <div className="col-9">
                    <h5 className="name m-0">Adrien</h5>
                    <span className="lastMessage">Hello</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
}

export default sidebar;
