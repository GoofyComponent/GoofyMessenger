import * as React from "react";
import { useState } from "react";
import QRCode from "qrcode.react";
import "../../css/qrcode.css";

function Qrcode({ isOpen, onChange }: { isOpen: boolean; onChange: any }) {
  const qrRef = React.useRef();
  const token = localStorage.getItem("token");

  const downloadQRCode = (evt: React.FormEvent) => {
    evt.preventDefault();
    // @ts-ignore
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <div className={`qr_container ${isOpen && "open"}`}>
      <div className="whitebox">
        <QRCode
          id="qrCodeElToRender"
          size={500}
          value={token}
          bgColor="white"
          fgColor="#141926"
          level="H"
          imageSettings={{
            excavate: true,
            width: 500 * 0.1,
            height: 500 * 0.1,
          }}
        />
      </div>

      <span className=" btnClose" onClick={() => onChange(false)}>
        Close
      </span>
    </div>
  );
}
export default Qrcode;
