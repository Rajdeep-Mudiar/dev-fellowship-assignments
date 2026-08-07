import { useState } from "react";
import QRCode from "react-qr-code";
import "./styles.css";

export default function QRCodeGenerator() {
  const [qrCode, setQrCode] = useState("");
  const [input, setInput] = useState("");

  function handleGenerateQrCode() {
    setQrCode(input);
    setInput("");
  }
  return (
    <div className="qr-code-wrapper">
      <div className="input-container">
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          name="qr-code"
          placeholder="Enter your value here"
          value={input}
        />

        {/* If input is empty we disable it */}
        <button
          disabled={input && input.trim() !== "" ? false : true}
          onClick={handleGenerateQrCode}
        >
          Generate
        </button>
      </div>

      <div className="qr-code-display">
        {qrCode ? (
          <QRCode id="qr-code-value" value={qrCode} size={400} bgcolor="#fff" />
        ) : (
          <p style={{ color: "#a0aec0", fontSize: "15px" }}>
            Enter a value to generate QR code
          </p>
        )}
      </div>
    </div>
  );
}
