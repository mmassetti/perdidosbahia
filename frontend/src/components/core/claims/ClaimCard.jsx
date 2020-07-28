import React from "react";
import { Badge, Card, Button, CardBody, Col } from "reactstrap";
import { useHistory } from "react-router-dom";
import useModal from "../Helpers/useModal";
import ModalSecondStep from "../items/SingleItem/modals/ModalSecondStep";
import ModalThirdStep from "../items/SingleItem/modals/ModalThirdStep";
import ModalFinalStep from "../items/SingleItem/modals/ModalFinalStep";

var moment = require("moment");
require("moment/locale/es");

const ClaimCard = (props) => {
  console.log("ClaimCard -> props", props);
  let history = useHistory();
  const { isShowing, toggle } = useModal();

  function goToSingleItem() {
    history.push({
      pathname: "/detalle",
      state: { props: props },
    });
  }

  function cancelClaim() {
    alert("publicacion cancelada");
  }

  const getStateForAuthUser = () => {
    if (props.authUserId == props.itemCreator._id) {
      return props.stateForItemCreator;
    } else if (props.authUserId == props.itemClaimer._id) {
      return props.stateForClaimer;
    }
  };

  const showExtraInfo = () => {
    return (
      <React.Fragment>
        {/*TODO: Sacar estos 3 controles a un componente aparte*/}

        {/* SECOND MODAL*/}
        {props.authUserId == props.itemCreator._id &&
        props.flagItemCreator == 1 &&
        props.flagClaimer == 0 ? (
          <React.Fragment>
            <h6 className="text-warning font-weight-light mb-2">
              ¡Alguien se comunicó con vos!
            </h6>
            <Button
              className=""
              style={{ marginBottom: "1rem" }}
              color="warning"
              size="sm"
              outline
              onClick={toggle}
            >
              Ver
            </Button>
          </React.Fragment>
        ) : (
          ""
        )}

        {/* THIRD MODAL */}
        {props.authUserId == props.itemClaimer._id &&
        props.flagItemCreator == 0 &&
        props.flagClaimer == 1 ? (
          <React.Fragment>
            <h6 className="text-warning font-weight-light mb-2">
              ¡Alguien se comunicó con vos!
            </h6>
            <Button
              className=""
              style={{ marginBottom: "1rem" }}
              color="warning"
              size="sm"
              outline
              onClick={toggle}
            >
              Ver
            </Button>
          </React.Fragment>
        ) : (
          ""
        )}

        {/* LAST MODAL */}

        {props.flagItemCreator == 1 && props.flagClaimer == 1 ? (
          <React.Fragment>
            <h6 className="text-warning font-weight-light mb-2">
              Tanto vos como la otra persona confirmaron el contacto.
            </h6>
            <Button
              className=""
              style={{ marginBottom: "1rem" }}
              color="warning"
              size="sm"
              outline
              onClick={toggle}
            >
              Ver info contacto
            </Button>
          </React.Fragment>
        ) : (
          ""
        )}
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

            <h6 className="text-primary text-uppercase">
              {props.item.category != "otro"
                ? props.item.category
                : "Otros objetos"}
            </h6>
            <p className="description mt-3">{props.item.description}</p>
            <Badge color="primary" pill className="mr-1">
              {props.item.type}
            </Badge>

            <div>
              <Badge color="primary" pill className="mr-1">
                {moment(props.item.date).format("LL")}
              </Badge>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <span className="h6 font-weight-bold">Estado actual:</span>
              <Badge
                color="success"
                pill
                className="mr-1"
                style={{ marginLeft: "0.5rem" }}
              >
                {getStateForAuthUser()}
              </Badge>
            </div>
            {props.item.creator._id == props.authUserId ? (
              <Button
                className="mt-4"
                color="primary"
                size="sm"
                // onClick={props.onDelete.bind()}
              >
                Editar objeto
              </Button>
            ) : (
              ""
            )}

            {props.item.creator._id == props.authUserId ? (
              <React.Fragment>
                <Button
                  className="mt-4"
                  color="warning"
                  size="sm"
                  onClick={props.onDelete}
                >
                  Cancelar contacto
                </Button>
                <Button
                  className="mt-4"
                  color="warning"
                  size="sm"
                  onClick={() => props.onDelete(props.claimId)}
                >
                  Eliminar objeto
                </Button>
              </React.Fragment>
            ) : (
              [
                props.flagItemCreator == 1 && props.flagClaimer == 1 ? (
                  ""
                ) : (
                  <Button
                    className="mt-4"
                    color="warning"
                    size="sm"
                    onClick={props.onDelete}
                  >
                    Cancelar contacto
                  </Button>
                ),
              ]
            )}
          </CardBody>
        </Card>
      </Col>

      {/*Show proper modal acording flags*/}

      {props.flagItemCreator == 1 && props.flagClaimer == 0 ? (
        <ModalSecondStep isShowing={isShowing} hide={toggle} info={props} />
      ) : (
        ""
      )}
      {/* THIRD MODAL */}
      {props.flagItemCreator == 0 && props.flagClaimer == 1 ? (
        <ModalThirdStep isShowing={isShowing} hide={toggle} info={props} />
      ) : (
        ""
      )}
      {/*FINAL MODAL */}
      {props.flagItemCreator == 1 && props.flagClaimer == 1 ? (
        <ModalFinalStep isShowing={isShowing} hide={toggle} info={props} />
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default ClaimCard;
