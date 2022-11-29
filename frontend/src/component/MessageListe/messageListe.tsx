import React from "react";
import "../../css/messageListe.css";
import Message from "../Message/message";

function MessageListe() {
  return (
    <div className="messagelist">
      <div className="containers">
        <div className="row">
          <div className="col-12">
            <Message></Message>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageListe;
