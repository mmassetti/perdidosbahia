import React from "react";
import useAPIError from "../../common/hooks/useAPIError";
import { Button, Modal } from "reactstrap";

function APIErrorNotification() {
  const { error, removeError } = useAPIError();

  const handleSubmit = () => {
    removeError();
  };

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={!!error}
      toggle={handleSubmit}
    >
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          {error && error.message && <p>({error.message})</p>}
        </h5>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={handleSubmit}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        Usuario o contraseña incorrectos. Intenta nuevamente
      </div>
      <div className="modal-footer">
        <Button
          color="secondary"
          data-dismiss="modal"
          type="button"
          onClick={handleSubmit}
        >
          Cerrar
        </Button>
      </div>
    </Modal>
  );
}

export default APIErrorNotification;
