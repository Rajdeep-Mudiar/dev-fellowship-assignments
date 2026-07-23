import { useState } from "react";
import Modal from "./modal";
import "./modal.css";

export default function ModalTest() {
  const [showModalPopup, setShowModalPopup] = useState(false);

  function handleToggleModalPopup() {
    setShowModalPopup(!showModalPopup);
  }
  return (
    <div className="modal-test-wrapper">
      <button onClick={handleToggleModalPopup} className="open-modal-btn">Open Modal Popup</button>

      {showModalPopup && (
        <Modal
          body={<div>Customised body</div>}
          onClose={handleToggleModalPopup}
        />
      )}
    </div>
  );
}
