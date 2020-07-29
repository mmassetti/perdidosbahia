import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";

// reactstrap components
import { Button, Modal } from "reactstrap";
import ItemInfo from "./helpers/ItemInfo";

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
        <ItemInfo item={info.item} />
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
              <div className="px-sm-3 py-sm-3 text-center text-muted">
                <h6>
                  Hace click en el ícono del lápiz para editar el campo que
                  quieras
                </h6>
              </div>
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
