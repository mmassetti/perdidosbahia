import React from "react";
import { Badge, Card, Button, CardBody, Col } from "reactstrap";

var moment = require("moment");
require("moment/locale/es");

const CardItem = props => {
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
          {props.creatorId == props.authUserId ? (
            <h6 className="text-warning font-weight-light mb-2">
              ¡Esta publicación es tuya!
            </h6>
          ) : (
            ""
          )}
          <h6 className="text-primary text-uppercase">{props.category}</h6>
          <p className="description mt-3">{props.description}</p>
          <div>
            <Badge color="primary" pill className="mr-1">
              {props.type}
            </Badge>
            <Badge color="primary" pill className="mr-1">
              {props.category}
            </Badge>
            <Badge color="primary" pill className="mr-1">
              {moment(props.date).format("LL")}
            </Badge>
          </div>
          <Button
            className="mt-4"
            color="primary"
            href="#pablo"
            onClick={e => e.preventDefault()}
          >
            Ver más
          </Button>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CardItem;
