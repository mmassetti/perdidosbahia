import React, { useState, useEffect } from "react";
import { Badge, Card, Button, CardBody, Col } from "reactstrap";
import useModal from "../Helpers/useModal";
import ModalSecondStep from "../items/SingleItem/modals/ModalSecondStep";
import ModalThirdStep from "../items/SingleItem/modals/ModalThirdStep";
import ModalFinalStep from "../items/SingleItem/modals/ModalFinalStep";

var moment = require("moment");
require("moment/locale/es");

const ClaimCard = (props) => {
  const { isShowing, toggle } = useModal();
  const [showCancelClaimOption, setCancelClaimOption] = useState(false);

  useEffect(() => {}, [setCancelClaimOption]);

  const getStateForAuthUser = () => {
    if (props.authUserId === props.claim.itemCreator._id) {
      return props.claim.stateForItemCreator;
    } else if (props.authUserId === props.claim.itemClaimer._id) {
      return props.claim.stateForClaimer;
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
        {props.authUserId === props.claim.itemCreator._id &&
        props.claim.flagItemCreator === 1 &&
        props.claim.flagClaimer === 0
          ? showNotificationMessage()
          : ""}

        {/* El user2 recibio la respuesta del user1 */}
        {props.authUserId === props.claim.itemClaimer._id &&
        props.claim.flagItemCreator === 0 &&
        props.claim.flagClaimer === 1
          ? showNotificationMessage()
          : ""}

        {/* Ambos usuarios confirmaron el contacto*/}
        {props.claim.flagItemCreator === 1 && props.claim.flagClaimer === 1
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
          <Badge
            color="success"
            pill
            className="mr-1"
            style={{ marginLeft: "0rem" }}
          >
            {getStateForAuthUser()}
          </Badge>
        </div>
        <h6 className="text-primary font-weight-bold text-uppercase">
          Información del objeto
        </h6>
        <h6 className="text-default ">
          {" "}
          <span className="font-weight-bold"> Categoría: </span>
          {props.claim.item.category !== "otro"
            ? props.claim.item.category
            : "Otros objetos"}
        </h6>
        <h6 className="text-default ">
          <span className="font-weight-bold"> Descripción: </span>{" "}
          {props.claim.item.description}
        </h6>
        <h6 className="text-default ">
          <span className="font-weight-bold"> Ubicación: </span>{" "}
          {props.claim.item.location}
        </h6>
        <h6 className="text-default ">
          <span className="font-weight-bold"> Fecha:</span>{" "}
          {moment(props.claim.item.date).format("LL")}{" "}
        </h6>
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
        onClick={() =>
          props.onDelete(props.claim._id, "¡Rechazaste el contacto!")
        }
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
        onClick={() => props.onDeleteItem(props.claim.item._id)}
      >
        Eliminar publicación
      </Button>
    );
  };

  const showOptions = () => {
    return (
      <React.Fragment>
        {(props.claim.flagItemCreator !== 1 || props.claim.flagClaimer !== 1) &&
        showCancelClaimOption
          ? cancelButton()
          : ""}
      </React.Fragment>
    );
  };

  const showModal = () => {
    if (props.claim.flagItemCreator === 1 && props.claim.flagClaimer === 0) {
      return (
        <ModalSecondStep isShowing={isShowing} hide={toggle} info={props} />
      );
    } else if (
      props.claim.flagItemCreator === 0 &&
      props.claim.flagClaimer === 1
    ) {
      return (
        <ModalThirdStep isShowing={isShowing} hide={toggle} info={props} />
      );
    } else if (
      props.claim.flagItemCreator === 1 &&
      props.claim.flagClaimer === 1
    ) {
      return (
        <ModalFinalStep isShowing={isShowing} hide={toggle} info={props} />
      );
    } else return "";
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

            {props.claim.item.creator._id === props.authUserId
              ? showDeleteButton()
              : ""}
          </CardBody>
        </Card>
      </Col>

      {/*Show proper modal acording flags*/}
      {showModal()}
    </React.Fragment>
  );
};

export default ClaimCard;
