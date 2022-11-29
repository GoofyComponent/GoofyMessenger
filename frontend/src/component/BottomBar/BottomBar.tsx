import React from "react";
import "../../css/bottombar.css";
import TextareaAutosize from "react-textarea-autosize";

function BottomBar() {
  function growUp() {
    var barreBottom = document.getElementById("bottomBar");
    var textareaMsg = document.getElementById("textareaMsg");

    if (barreBottom != null && textareaMsg != null) {
      var textareaHeight = parseInt(textareaMsg.style.height);
      var current = parseInt(barreBottom.style.maxHeight);

      current = textareaHeight + 40;

      barreBottom.style.maxHeight = current + "px";
    }
  }

  // var yourTextArea = document.getElementById("textareaMsg");
  // if (yourTextArea != null) {
  //   var yourTextAreaLength = (yourTextArea as HTMLInputElement).value.length;
  //   // In case you want to limit the number of characters in no less than, say, 10
  //   // or no more than 400.
  //   if (yourTextAreaLength < 10 || yourTextAreaLength > 400) {
  //     alert(
  //       "The field must have no less than 10 and no more than 400 characters."
  //     );
  //     return false;
  //   }
  // }

  return (
    <div
      className="Row bottomBar"
      id="bottomBar"
      style={{ maxHeight: "100px" }}
    >
      <div className="col bottomBox">
        <TextareaAutosize
          autoFocus
          onHeightChange={growUp}
          maxRows={10}
          id="textareaMsg"
          maxLength={401}
          spellCheck="true"
        />
      </div>
    </div>
  );
}

export default BottomBar;
