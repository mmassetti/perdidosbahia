import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";

// reactstrap components
import { Button, Modal, ListGroup, ListGroupItem } from "reactstrap";

const ModalFinaltep = ({ isShowing, hide, info }) => {
  console.log("ModalFinaltep -> info", info);
  let history = useHistory();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  });

  const showItemCreatorInfo = () => {
    return (
      <div className="modal-body">
        <ListGroup>
          <ListGroupItem>
            <span className="h6 font-weight-bold">Nombre: </span>
            {info.itemCreator.firstName}
          </ListGroupItem>
          <ListGroupItem>
            {" "}
            <span className="h6 font-weight-bold">Apellido: </span>
            {info.itemCreator.lastName}{" "}
          </ListGroupItem>
          <ListGroupItem>
            {" "}
            <span className="h6 font-weight-bold">Número de celular: </span>
            {info.itemCreator.phoneNumber
              ? info.itemCreator.phoneNumber
              : "La otra persona no brindó su número"}{" "}
          </ListGroupItem>
          <ListGroupItem>
            <span className="h6 font-weight-bold">Email:</span>{" "}
            {info.itemCreator.email}
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  };

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <Modal
            className="modal-dialog-centered"
            size="sm"
            isOpen={isShowing}
            toggle={hide}
          >
            <React.Fragment>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Datos de contacto
                </h5>
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
              {}

              {info.authUserId == info.itemClaimer._id ? (
                showItemCreatorInfo()
              ) : (
                <div className="modal-body">
                  {info.itemClaimer.firstName}
                  {info.itemClaimer.email}
                </div>
              )}

              <div className="modal-footer">
                <Button
                  color="secondary"
                  data-dismiss="modal"
                  type="button"
                  onClick={hide}
                >
                  Salir
                </Button>
              </div>
            </React.Fragment>
          </Modal>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default ModalFinaltep;
