import React from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
var moment = require("moment");
require("moment/locale/es");

export default function ItemInfo(props) {
  console.log("ItemInfo -> props", props);
  return (
    <div className="modal-body" style={{ paddingTop: "0" }}>
      <ListGroup>
        <ListGroupItem>
          <span className="h6 font-weight-bold">Categoría: </span>
          {props.item.category != "otro"
            ? props.item.category
            : "Otros objetos"}

          <Button
            className=" btn-neutral btn-icon-only btn-round pull-right"
            color="github"
            size="sm"
            onClick={() => {
              props.onEditClick("category", "categoría", props.item.category);
            }}
          >
            <i className="fa fa-pencil" />
          </Button>
        </ListGroupItem>
        <ListGroupItem>
          {" "}
          <span className="h6 font-weight-bold">Descripción: </span>
          {props.item.description}
        </ListGroupItem>
        <ListGroupItem>
          {" "}
          <span className="h6 font-weight-bold">Ubicación: </span>
          {props.item.location}
        </ListGroupItem>
        <ListGroupItem>
          <span className="h6 font-weight-bold">Fecha:</span>{" "}
          {moment(props.item.date).format("LL")}{" "}
        </ListGroupItem>
        <ListGroupItem>
          <span className="h6 font-weight-bold">
            Pregunta que tienen que responderte:
          </span>{" "}
          {props.item.itemCreatorQuestion}{" "}
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
