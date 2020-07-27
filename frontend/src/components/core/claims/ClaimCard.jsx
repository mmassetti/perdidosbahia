import React from "react";
import { Badge, Card, Button, CardBody, Col } from "reactstrap";
import { useHistory } from "react-router-dom";
import ModalSecondStep from "../items/SingleItem/modals/ModalSecondStep";
import useModal from "../Helpers/useModal";

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
        {props.authUserId == props.itemClaimer._id &&
        props.flagItemCreator == 0 &&
        props.flagClaimer == 1 ? (
          <h6 className="text-warning font-weight-light mb-2">
            ¡Alguien se comunicó con vos!
          </h6>
        ) : (
          ""
        )}
        {props.flagItemCreator == 1 && props.flagClaimer == 1 ? (
          <h6 className="text-warning font-weight-light mb-2">
            Tanto vos como la otra persona confirmaron el contacto. Te dejamos
            sus datos:
          </h6>
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
              <span className="h6 font-weight-bold ">Estado actual:</span>
              <Badge color="success" pill className="mr-1">
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
                Editar
              </Button>
            ) : (
              ""
            )}

            {props.item.creator._id == props.authUserId ? (
              <Button
                className="mt-4"
                color="warning"
                size="sm"
                onClick={() => props.onDelete(props.claimId)}
              >
                Eliminar
              </Button>
            ) : (
              <Button
                className="mt-4"
                color="warning"
                size="sm"
                onClick={props.onDelete}
              >
                Cancelar contacto
              </Button>
            )}
          </CardBody>
        </Card>
      </Col>

      {props.flagItemCreator == 1 && props.flagClaimer == 0 ? (
        <ModalSecondStep
          isShowing={isShowing}
          hide={toggle}
          info={props}
          // itemCreatorQuestion={props.item.itemCreatorQuestion}
          // claimerQuestion={props.item.claimerQuestion}
          // item={props.item}
          // token={props.token}
        />
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default ClaimCard;
