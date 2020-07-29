import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";

// reactstrap components
import { Button, Modal } from "reactstrap";

var moment = require("moment");
require("moment/locale/es");

const ModalEditItem = ({ isShowing, hide, info }) => {
  console.log("ModalEditItem -> info ", info);
  let history = useHistory();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  });

  const showItemInfo = () => {
    return (
      <React.Fragment>
        <h6 className="text-default ">
          {" "}
          <span className="font-weight-bold"> Categoría: </span>
          {info.item.category != "otro" ? info.item.category : "Otros objetos"}
        </h6>
        <h6 className="text-default ">
          <span className="font-weight-bold"> Descripción: </span>{" "}
          {info.item.description}
        </h6>
        <h6 className="text-default ">
          <span className="font-weight-bold"> Ubicación: </span>{" "}
          {info.item.location}
        </h6>
        <h6 className="text-default ">
          <span className="font-weight-bold"> Fecha:</span>{" "}
          {moment(info.item.date).format("LL")}{" "}
        </h6>
      </React.Fragment>
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
                  Editar objeto
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
              {showItemInfo()}
              <div className="modal-footer">
                <Button
                  color="primary"
                  data-dismiss="modal"
                  type="button"
                  onClick={hide}
                >
                  Ok
                </Button>
              </div>
            </React.Fragment>
          </Modal>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default ModalEditItem;
