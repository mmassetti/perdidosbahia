import React, { useState, useEffect } from "react";
import {
  Badge,
  Card,
  Button,
  CardBody,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import { useHistory } from "react-router-dom";

var moment = require("moment");
require("moment/locale/es");

const CardItem = (props) => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  function goToSingleItem() {
    history.push({
      pathname: "/detalle",
      state: { props: props },
    });
  }

  const deleteItemButton = () => {
    return (
      <React.Fragment>
        <Button
          className="mt-4 btn-icon-only btn-round pull-right"
          color="danger"
          id="tooltipDeleteItem"
          onClick={() => props.onDelete(props.id)}
        >
          <i className=" fa fa-trash" />
        </Button>
        <UncontrolledTooltip ardelay={0} target="tooltipDeleteItem">
          Eliminar publicación
        </UncontrolledTooltip>
      </React.Fragment>
    );
  };

  return (
    <Col lg="4">
      <Card
        className="card-lift--hover shadow border-0"
        style={{ marginBottom: "1rem" }}
      >
        <CardBody className="py-5">
          {props.creatorId == props.authUserId ? (
            <h6 className="text-warning font-weight-light mb-2">
              ¡Esta es tu publicación!
            </h6>
          ) : (
            ""
          )}
          <h6 className="text-primary text-uppercase">
            {props.category != "otro" ? props.category : "Otros objetos"}
          </h6>
          <p className="description mt-3">{props.description}</p>
          <div>
            <Badge color="primary" pill className="mr-1">
              {props.type}
            </Badge>
            <Badge color="primary" pill className="mr-1">
              {moment(props.date).format("LL")}
            </Badge>
          </div>
          <Button
            className="mt-4 btn-round"
            color="primary"
            onClick={() => goToSingleItem()}
          >
            Ver
          </Button>

          {props.token && props.authUserId == props.creatorId
            ? deleteItemButton()
            : ""}
        </CardBody>
      </Card>
    </Col>
  );
};

export default CardItem;
