import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import useModal from "../../../Helpers/useModal";

// reactstrap components
import { Button, Modal } from "reactstrap";
import ItemInfo from "./helpers/ItemInfo";
import OptionsForSelectedField from "./helpers/ItemEdition/OptionsForSelectedField";

var moment = require("moment");
require("moment/locale/es");

const ModalEditItem = ({ isShowing, hide, info }) => {
  console.log("ModalEditItem -> info ", info);
  let history = useHistory();
  const [isEditModeActive, setIsEditModeActive] = useState(false);
  const { isShowingEditSection, toggleIsShowingEditSection } = useModal();
  const [currentFieldToEdit, setCurrentFieldToEdit] = useState({
    itemField: null,
    itemFieldNameToShow: null,
    itemFieldContent: null,
  });

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  });

  const editClickHandler = (
    itemField,
    itemFieldNameToShow,
    itemFieldContent
  ) => {
    setIsEditModeActive(true);
    setCurrentFieldToEdit({
      itemField: itemField,
      itemFieldNameToShow: itemFieldNameToShow,
      itemFieldContent: itemFieldContent,
    });
  };

  const showAllFields = () => {
    return (
      <React.Fragment>
        <div className="px-sm-3 py-sm-3 text-center text-muted ">
          <h6 className="text-warning font-weight-light">
            Hace click en el ícono del lápiz para editar el campo que quieras
          </h6>
        </div>
        <ItemInfo item={info.item} onEditClick={editClickHandler} />
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
    );
  };

  const showSelectedFieldEdition = () => {
    return (
      <React.Fragment>
        <div className="px-sm-3 py-sm-3 text-center text-muted ">
          <h6 className="text-default font-weight-bold">
            {currentFieldToEdit.itemFieldNameToShow}{" "}
            <span style={{ textTransform: "none" }}>actual: </span>{" "}
            <span
              style={{ wordBreak: "break-all" }}
              className="text-warning font-weight-light"
            >
              {currentFieldToEdit.itemField == "date"
                ? moment(currentFieldToEdit.itemFieldContent).format("LL")
                : currentFieldToEdit.itemFieldContent}
            </span>
          </h6>
        </div>

        <OptionsForSelectedField
          selectedField={currentFieldToEdit.itemField}
          selectedFieldContent={currentFieldToEdit.itemFieldContent}
        />

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

              {!isEditModeActive ? showAllFields() : showSelectedFieldEdition()}
            </React.Fragment>
          </Modal>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default ModalEditItem;
