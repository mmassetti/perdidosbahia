import React from "react";
import ReactDOM from "react-dom";
import { Modal, Button } from "reactstrap";
import { Link } from "react-router-dom";

const MustLoginModal = ({ isShowing, hide }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <Modal
            className="modal-dialog-centered"
            isOpen={isShowing}
            toggle={hide}
          >
            <div className="modal-header">
              <h6 className="modal-title" id="modal-title-default">
                Inicio de sesión requerido
              </h6>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={hide}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                Tenés que{" "}
                <Link
                  to="/registro"
                  style={{ color: "#172b4d" }}
                  className="font-weight-bold"
                >
                  Registrarte
                </Link>{" "}
                o
                <Link
                  to="/inicio-sesion"
                  style={{ color: "#172b4d" }}
                  className="font-weight-bold"
                >
                  {" "}
                  Iniciar sesión{" "}
                </Link>{" "}
                para poder continuar
              </p>
            </div>
            <div className="modal-footer">
              <Button
                className="ml-auto font-weight-bold"
                color="default"
                data-dismiss="modal"
                type="button"
                onClick={hide}
              >
                Cerrar
              </Button>
            </div>
          </Modal>
        </React.Fragment>,
        document.body
      )
    : null;

export default MustLoginModal;
