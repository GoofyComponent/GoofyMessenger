import React from "react";
import "../../css/bottombar.css";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import axios from "axios";

function BottomBar() {
  const [credentials, setCredentials] = useState({
    message: "",
  });

  const onChange = (e: any) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    console.log(e.target.value);
    console.log(e.target.name);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token);
    console.log(credentials);

    var url = "http://localhost:8245/api/message/post/4";
    var config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(
        url,
        {
          message: credentials.message,
        },
        config
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        console.log("error");
      });
    setCredentials({ ...credentials, message: "" });
  };

  return (
    <div className="Row bottomBar" id="bottomBar">
      <div className="col h-100 bottomBox">
        <form className="d-flex" onSubmit={onSubmit}>
          <textarea
            autoFocus
            id="textareaMsg"
            maxLength={401}
            spellCheck="true"
            className="h-100 messagetextarea"
            name="message"
            value={credentials.message}
            onChange={onChange}
          />
          <button className="messagesend">Send</button>
        </form>
      </div>
    </div>
  );
}

export default BottomBar;
