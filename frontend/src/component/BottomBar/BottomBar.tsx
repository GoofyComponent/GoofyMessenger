import React from "react";
import "../../css/bottombar.css";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function BottomBar() {
  var { idConv } = useParams();
  const [credentials, setCredentials] = useState({
    message: "",
  });

  const onChange = (e: any) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    var url = `http://localhost:8245/api/message/post/${idConv}`;
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
      .then((res) => {})
      .catch((err) => {});
    setCredentials({ ...credentials, message: "" });
  };

  return (
    <div className="Row bottomBar" id="bottomBar">
      <div className="col h-100 bottomBox">
        <form className="d-flex w-100" onSubmit={onSubmit}>
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
          <button className="messagesend mx-2 ">Send</button>
        </form>
      </div>
    </div>
  );
}

export default BottomBar;
