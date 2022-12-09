import React from "react";
import { useState, useEffect, useRef } from "react";
import "../../css/messageListe.css";
import Message from "../Message/message";
import axios from "axios";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

function MessageListe(user: any) {
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const token = localStorage.getItem("token");
  if (token !== null) {
    var decodedJwt: any = jwt_decode(token);
  }
  var UserMe = decodedJwt.author;

  const [messageList, setMessageList] = useState([]);

  const { idConv } = useParams();


  function fetchConv(props: any) {
    const token = localStorage.getItem("token");
    var url = `http://localhost:8245/api/message/get/${idConv}`;
    var config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios
      .get(url, config)
      .then((res) => {
        console.log(res.data);
        setMessageList(Object.values(res.data.messages));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // console.log(messageList);

  useEffect(() => {
    fetchConv(idConv);
  }, [idConv]);
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  });

  return (
    <div className="messagelist" ref={messageContainerRef}>
      <div className="containers">
        <div className="row">
          <div className="col-12">
            {messageList &&
              messageList.map((message: any, index) => {
                if (message.author === UserMe) {
                  return (
                    <Message
                      author={message.author}
                      content={message.content}
                      date={message.date}
                      messageclass={"imauthor"}
                    />
                  );
                } else {
                  return (
                    <Message
                      author={message.author}
                      content={message.content}
                      date={message.date}
                      messageclass={"imnotauthor"}
                    />
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageListe;
