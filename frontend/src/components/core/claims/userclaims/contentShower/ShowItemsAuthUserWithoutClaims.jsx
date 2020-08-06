import React from "react";
import { Card, CardBody, Col, Badge, Button } from "reactstrap";
var moment = require("moment");
require("moment/locale/es");

const ShowItemsAuthUserWithoutClaims = (props) => {
  return props.items.map((item, key) => {
    return (
      <Col key={key} lg="4">
        <Card
          className="card-lift--hover shadow border-0"
          style={{ marginBottom: "1rem" }}
        >
          <CardBody className="py-5">
            <React.Fragment>
              <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                <span className="h6 font-weight-bold">Estado actual:</span>
                <Badge
                  color="success"
                  pill
                  className="mr-1"
                  style={{ marginLeft: "0.2rem" }}
                >
                  Sin Respuestas
                </Badge>
              </div>
              <h6 className="text-primary font-weight-bold text-uppercase">
                Información del objeto
              </h6>
              <h6 className="text-default ">
                {" "}
                <span className="font-weight-bold"> Categoría: </span>
                {item.category !== "otro" ? item.category : "Otros objetos"}
              </h6>
              <h6 className="text-default ">
                <span className="font-weight-bold"> Descripción: </span>{" "}
                {item.description}
              </h6>
              <h6 className="text-default ">
                <span className="font-weight-bold"> Ubicación: </span>{" "}
                {item.location}
              </h6>
              <h6 className="text-default ">
                <span className="font-weight-bold"> Fecha:</span>{" "}
                {moment(item.date).format("LL")}{" "}
              </h6>
              <Button
                className="mt-4"
                color="danger"
                size="sm"
                outline
                onClick={() => props.onDelete(item._id)}
              >
                Eliminar publicación
              </Button>
            </React.Fragment>
          </CardBody>
        </Card>
      </Col>
    );
  });
};

export default ShowItemsAuthUserWithoutClaims;
