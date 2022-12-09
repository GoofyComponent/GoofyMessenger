import React from "react";
import "../../css/message.css";

function Message(props: any) {
  return (
    <div className={`message ${props.messageclass}`}>
      <h5>{props.author}</h5>
      <p>{props.content}</p>
      <div className="text-end">
        <span>{props.date}</span>
        </div>
    </div>
  );
}

export default Message;
