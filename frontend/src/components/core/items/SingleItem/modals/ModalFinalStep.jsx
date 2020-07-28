import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";

// reactstrap components
import { Button, Modal } from "reactstrap";
import ContactInfo from "../modals/helpers/ContactInfo";

const ModalFinaltep = ({ isShowing, hide, info }) => {
  let history = useHistory();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  });

  const showItemCreatorInfo = () => {
    return (
      <ContactInfo
        firstName={info.itemCreator.firstName}
        lastName={info.itemCreator.lastName}
        phoneNumber={info.itemCreator.phoneNumber}
        email={info.itemCreator.email}
      />
    );
  };

  const showClaimerInfo = () => {
    return (
      <ContactInfo
        firstName={info.itemClaimer.firstName}
        lastName={info.itemClaimer.lastName}
        phoneNumber={info.itemClaimer.phoneNumber}
        email={info.itemClaimer.email}
      />
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

              {info.authUserId == info.itemClaimer._id
                ? showItemCreatorInfo()
                : showClaimerInfo()}

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
