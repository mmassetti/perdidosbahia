import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Button, Modal } from "reactstrap";
import ContactInfo from "../modals/helpers/ContactInfo";

const ModalFinalStep = ({ isShowing, hide, info }) => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  });

  const showItemCreatorInfo = () => {
    return (
      <ContactInfo
        firstName={info.claim.itemCreator.firstName}
        lastName={info.claim.itemCreator.lastName}
        phoneNumber={info.claim.itemCreator.phoneNumber}
        email={info.claim.itemCreator.email}
      />
    );
  };

  const showClaimerInfo = () => {
    return (
      <ContactInfo
        firstName={info.claim.itemClaimer.firstName}
        lastName={info.claim.itemClaimer.lastName}
        phoneNumber={info.claim.itemClaimer.phoneNumber}
        email={info.claim.itemClaimer.email}
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

              {info.authUserId === info.claim.itemClaimer._id
                ? showItemCreatorInfo()
                : showClaimerInfo()}

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

export default ModalFinalStep;
