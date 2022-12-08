import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Container, Col, Button } from "react-bootstrap";
import SearchIcon from "../../img/magnifying-glass-solid.svg";
import MessageListe from "../MessageListe/messageListe";
import "../../css/sidebar.css";
import "../../css/message.css";
import { accountService } from "../../_services/account.service";
import axios from "axios";
import { AxiosRequestConfig } from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function Sidebar(this: any) {
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState("");

  let searchHandler = (e: any) => {
    var lowerCaseSearch = e.target.value.toLowerCase();
    setSearch(lowerCaseSearch);
  };
  const filteredUsers = userList.filter((user: any) => {
    if (user.firstname.toLowerCase().includes(search)) {
      return user;
    } else {
      return user.lastname.toLowerCase().includes(search);
    }
  });

  let navigate = useNavigate();

  const fetchUser = () => {
    const token = localStorage.getItem("token");
    var url = "http://localhost:8245/api/users/1";
    var config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios
      .get(url, config)
      .then((res) => {
        setUserList(Object.values(res.data.users));
      })
      .catch((err) => {
        console.log(err);
        logout();
      });
  };

  const logout = () => {
    accountService.logout();
    navigate("/login");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
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
            <input
              type="search"
              name="name"
              className="search"
              onChange={searchHandler}
            />
          </Col>
        </Row>

        <Row className="w-100 contactListBox mt-2">
          <Col>
            <ul className="contactList">
              {" "}
              {filteredUsers &&
                filteredUsers.map((users: any, index) => (
                  <>
                    <li
                      className="contact"
                      onClick={() => navigate(`/home/${users.id}`)}
                    >
                      <div className="contactBox mx-2">
                        <div className="contactinfos row py-2 w-100">
                          <div className="col-3">
                            <div className="pp"></div>
                          </div>
                          <div className="col-9">
                            {users.firstname} {users.lastname}
                            <br />
                            <p className="lastmessage">
                              {users.lastMessage && users.lastMessage.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </>
                ))}
            </ul>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Sidebar;
