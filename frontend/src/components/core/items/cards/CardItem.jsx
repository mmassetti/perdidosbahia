import React, { useEffect } from "react";
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

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);

  function goToSingleItem() {
    let { onDelete, ...neededProps } = props;

    history.push({
      pathname: "/detalle",
      state: { props: neededProps },
    });
  }

  const getIcon = (category) => {
    switch (category) {
      case "documentacion":
        return "fa fa-id-card";
      case "llaves":
        return "ni ni-key-25";
      case "lentes":
        return "ni ni-glasses-2";
      case "patente":
        return "fa fa-motorcycle";
      case "ropa":
        return "fa fa-child";
      case "celular":
        return "ni ni-mobile-button";
      default:
        return "ni ni-tag";
    }
  };

  const showContent = () => {
    return (
      <Col lg="4">
        <Card
          className="card-lift--hover shadow border-0"
          style={{ marginBottom: "1rem" }}
        >
          <CardBody className="py-5">
            <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
              <i className={getIcon(props.category)}></i>
            </div>
            {props.creatorId === props.authUserId ? (
              <h6 className="text-warning font-weight-light mb-2">
                ¡Esta es tu publicación!
              </h6>
            ) : (
              ""
            )}
            <h6 className="text-primary text-uppercase">
              {props.category !== "otro" ? props.category : "Otros objetos"}
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
              Ver más
            </Button>

            {props.token && props.authUserId == props.creatorId
              ? deleteItemButton()
              : ""}
          </CardBody>
        </Card>
      </Col>
    );
  };

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

  return showContent();
};

export default CardItem;
