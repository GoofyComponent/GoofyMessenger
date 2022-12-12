import React from "react";
import { useState, useEffect, useRef } from "react";
import "../../css/messageListe.css";
import Message from "../Message/message";
import axios from "axios";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";
let createMercureCookie = async (JWT: string) => {
  const d = new Date();
  d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
  const cookies = new Cookies();
  cookies.set("mercureAuthorization", JWT, {
    expires: d,
    secure: false,
    sameSite: "strict",
  });
};

const deleteMercureCookie = () => {
  const cookies = new Cookies();
  cookies.remove("mercureAuthorization");
};

function MessageListe(user: any) {
  const [mercure_JWT, setMercure_JWT] = useState(null);
  function fetchMercure_JWT() {
    const token = localStorage.getItem("token");
    var url = `http://localhost:8245/api/mercureAuthorization`;
    var config = {
      credentials: "include",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get(url, config)
      .then((res) => {
        console.log(res.data.mercureAuthorization);
        setMercure_JWT(res.data.mercureAuthorization);
        deleteMercureCookie();
        deleteMercureCookie();

        deleteMercureCookie();

        deleteMercureCookie();

        deleteMercureCookie();

        createMercureCookie(res.data.mercureAuthorization);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    console.log("booba");
    fetchMercure_JWT();
    // const url = new URL("http://localhost:9090/.well-known/mercure");
    // url.searchParams.append("topic", "https://example.com/my-private-topic");
  }, []);

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
        setMessageList(Object.values(res.data.messages));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchConv(idConv);
  }, [idConv]);
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
    const eventSource = new EventSourcePolyfill(
      "http://localhost:9090/.well-known/mercure?topic=https://example.com/my-private-topic",
      {
        headers: {
          Authorization: `Bearer ${mercure_JWT}`,
        },
      }
    );

    eventSource.onopen = (event) => {};
    eventSource.onmessage = (event) => {
      let data = JSON.parse(event.data);
      console.log("onmessage", data);
      fetchConv(idConv);
    };
    eventSource.onerror = (event) => {
      console.log("onerror", event);
    };
    return () => {
      eventSource.close();
    };
  });

  const urlEventSource = new URL("http://localhost:9090/.well-known/mercure");
  urlEventSource.searchParams.append(
    "topic",
    `https://example.com/my-private-topic`
  );
  // const eventSource = new EventSource(
  //   urlEventSource,
  //   //Add the JWT to the Authorization header of the request
  //   {
  //     withCredentials: true,
  //   }
  // );

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
                      date={message.createdAtFr}
                      messageclass={"imauthor"}
                    />
                  );
                } else {
                  return (
                    <Message
                      author={message.author}
                      content={message.content}
                      date={message.createdAtFr}
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
