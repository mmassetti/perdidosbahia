import React from "react";
import { Badge, Card, Button, CardBody, Col } from "reactstrap";
import { useHistory } from "react-router-dom";

var moment = require("moment");
require("moment/locale/es");

const ClaimCard = (props) => {
  let history = useHistory();

  function goToSingleItem() {
    history.push({
      pathname: "/detalle",
      state: { props: props },
    });
  }

  function cancelClaim() {
    alert("publicacion cancelada");
  }

  return (
    <Col lg="4">
      <Card
        className="card-lift--hover shadow border-0"
        style={{ marginBottom: "1rem" }}
      >
        <CardBody className="py-5">
          <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
            <i className="ni ni-check-bold" />
          </div>

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
              Esperando respuesta
            </Badge>
          </div>
          {props.item.creator._id == props.authUserId ? (
            <Button
              className="mt-4"
              color="primary"
              // onClick={props.onDelete.bind()}
            >
              Editar publicacion
            </Button>
          ) : (
            ""
          )}

          {props.item.creator._id == props.authUserId ? (
            <Button
              className="mt-4"
              color="warning"
              onClick={() => props.onDelete(props.claimId)}
            >
              Eliminar publicación
            </Button>
          ) : (
            <Button className="mt-4" color="warning" onClick={props.onDelete}>
              Cancelar contacto
            </Button>
          )}
        </CardBody>
      </Card>
    </Col>
  );
};

export default ClaimCard;
