import React, { useState, useEffect } from "react";
import { Badge, Card, Button, CardBody, Col } from "reactstrap";
import { useHistory } from "react-router-dom";
import useModal from "../Helpers/useModal";
import ModalSecondStep from "../items/SingleItem/modals/ModalSecondStep";
import ModalThirdStep from "../items/SingleItem/modals/ModalThirdStep";
import ModalFinalStep from "../items/SingleItem/modals/ModalFinalStep";
import ModalEditItem from "../items/SingleItem/modals/ModalEditItem";

var moment = require("moment");
require("moment/locale/es");

const ClaimCard = (props) => {
  let history = useHistory();
  const { isShowing, toggle } = useModal();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCancelClaimOption, setCancelClaimOption] = useState(false);

  useEffect(() => {}, [setCancelClaimOption]);

  const getStateForAuthUser = () => {
    if (props.authUserId == props.itemCreator._id) {
      return props.stateForItemCreator;
    } else if (props.authUserId == props.itemClaimer._id) {
      return props.stateForClaimer;
    }
  };

  const enableCancelClaimOption = () => {
    toggle();
    setCancelClaimOption(true);
  };

  function showNotificationMessage() {
    return (
      <React.Fragment>
        <h6 className="text-primary font-weight-bold mb-2">
          ¡Alguien se comunicó con vos!
        </h6>
        <Button
          color="primary"
          size="sm"
          onClick={() => {
            enableCancelClaimOption();
          }}
        >
          Ver mensaje
        </Button>
        {showOptions()}

        <div
          style={{ marginTop: "1rem" }}
          className="py-2 border-top text-center"
        ></div>
      </React.Fragment>
    );
  }

  function showSuccessContactMessage() {
    return (
      <React.Fragment>
        <h6 className="text-primary font-weight-light mb-2">
          <span className="font-weight-bold">¡Listo! </span> Tanto vos como la
          otra persona confirmaron el contacto.
        </h6>
        <Button
          className=""
          style={{ marginBottom: "1rem" }}
          color="primary"
          size="sm"
          outline
          onClick={toggle}
        >
          Ver info contacto
        </Button>
        {showOptions()}
        <div className="mt-3 border-top text-center"></div>
      </React.Fragment>
    );
  }

  const showExtraInfo = () => {
    return (
      <React.Fragment>
        {/* El creador de la publicacion (user1) recibio un mensaje de la otra persona (user2)*/}
        {props.authUserId == props.itemCreator._id &&
        props.flagItemCreator == 1 &&
        props.flagClaimer == 0
          ? showNotificationMessage()
          : ""}

        {/* El user2 recibio la respuesta del user1 */}
        {props.authUserId == props.itemClaimer._id &&
        props.flagItemCreator == 0 &&
        props.flagClaimer == 1
          ? showNotificationMessage()
          : ""}

        {/* Ambos usuarios confirmaron el contacto*/}
        {props.flagItemCreator == 1 && props.flagClaimer == 1
          ? showSuccessContactMessage()
          : ""}
      </React.Fragment>
    );
  };

  const showItemInfo = () => {
    return (
      <React.Fragment>
        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <span className="h6 font-weight-bold">Estado actual:</span>
          <Badge color="success" pill className="mr-1">
            {getStateForAuthUser()}
          </Badge>
        </div>
        <h6 className="text-primary font-weight-bold text-uppercase">
          Información del objeto
        </h6>
        <h6 className="text-default ">
          {" "}
          <span className="font-weight-bold"> Categoría: </span>
          {props.item.category != "otro"
            ? props.item.category
            : "Otros objetos"}
        </h6>
        <h6 className="text-default ">
          <span className="font-weight-bold"> Descripción: </span>{" "}
          {props.item.description}
        </h6>
        <h6 className="text-default ">
          <span className="font-weight-bold"> Ubicación: </span>{" "}
          {props.item.location}
        </h6>
        <h6 className="text-default ">
          <span className="font-weight-bold"> Fecha:</span>{" "}
          {moment(props.item.date).format("LL")}{" "}
        </h6>
      </React.Fragment>
    );
  };

  const openEditModal = () => {
    toggle();
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    toggle();
    setShowEditModal(false);
  };

  const showEditButton = () => {
    return (
      <React.Fragment>
        {props.item.creator._id == props.authUserId ? (
          <Button
            className="mt-4"
            color="primary"
            size="sm"
            onClick={() => openEditModal()}
            outline
          >
            Editar objeto
          </Button>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  };

  const cancelButton = () => {
    return (
      <Button
        style={{ marginBottom: "1rem" }}
        className="mt-4"
        color="danger"
        size="sm"
        onClick={() => props.onDelete(props.claimId)}
        outline
      >
        Rechazar contacto
      </Button>
    );
  };

  const showDeleteButton = () => {
    return (
      <Button
        className="mt-4"
        color="danger"
        size="sm"
        outline
        // onClick={() => props.onDelete(props.claimId)}
      >
        Eliminar objeto
      </Button>
    );
  };

  const showOptions = () => {
    return (
      <React.Fragment>
        {(props.flagItemCreator !== 1 || props.flagClaimer !== 1) &&
        showCancelClaimOption
          ? cancelButton()
          : ""}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Col lg="4">
        <Card
          className="card-lift--hover shadow border-0"
          style={{ marginBottom: "1rem" }}
        >
          <CardBody className="py-5">
            {showExtraInfo()}

            {showItemInfo()}

            {showEditButton()}
            {props.item.creator._id == props.authUserId
              ? showDeleteButton()
              : ""}
          </CardBody>
        </Card>
      </Col>

      {/*Show proper modal acording flags*/}

      {props.flagItemCreator == 1 &&
      props.flagClaimer == 0 &&
      !showEditModal ? (
        <ModalSecondStep isShowing={isShowing} hide={toggle} info={props} />
      ) : (
        ""
      )}
      {/* THIRD MODAL */}
      {props.flagItemCreator == 0 &&
      props.flagClaimer == 1 &&
      !showEditModal ? (
        <ModalThirdStep isShowing={isShowing} hide={toggle} info={props} />
      ) : (
        ""
      )}
      {/*FINAL MODAL */}
      {props.flagItemCreator == 1 &&
      props.flagClaimer == 1 &&
      !showEditModal ? (
        <ModalFinalStep isShowing={isShowing} hide={toggle} info={props} />
      ) : (
        ""
      )}
      {showEditModal ? (
        <ModalEditItem
          isShowing={isShowing}
          hide={() => closeEditModal()}
          info={props}
        />
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default ClaimCard;
