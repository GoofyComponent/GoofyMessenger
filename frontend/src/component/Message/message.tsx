import React from "react";
import "../../css/message.css";

function Message(props: any) {
  return (
    <div className={`message ${props.messageclass}`}>
      <h5>{props.author}</h5>
      <p>{props.content}</p>
      <span>{props.date}</span>
    </div>
  );
}

export default Message;
