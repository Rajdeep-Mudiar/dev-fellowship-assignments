import "./modal.css";

export default function Modal({ id, header, body, footer, onClose }) {
  return (
    <div id={id || "Modal"} className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <h2>{header ? header : "Header"}</h2>
          <span className="close-modal-icon" onClick={onClose}>&times;</span>
        </div>
        <div className="body">
          {body ? (
            body
          ) : (
            <div>
              {" "}
              <p> This is our Modal Body</p>
            </div>
          )}
        </div>
        <div className="footer">{footer ? footer : <h2>Footer</h2>}</div>
      </div>
    </div>
  );
}
