import React from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
var moment = require("moment");
require("moment/locale/es");

export default function ItemInfo(props) {
  console.log("ItemInfo -> props", props);

  const editButton = (itemField, itemFieldNameToShow, itemFieldContent) => {
    return (
      <Button
        className=" btn-neutral btn-icon-only btn-round pull-right"
        color="github"
        size="sm"
        onClick={() => {
          props.onEditClick(itemField, itemFieldNameToShow, itemFieldContent);
        }}
      >
        <i className="fa fa-pencil" />
      </Button>
    );
  };

  return (
    <div className="modal-body" style={{ paddingTop: "0" }}>
      <ListGroup>
        <ListGroupItem>
          <span className="h6 font-weight-bold">Categoría: </span>
          {props.item.category != "otro"
            ? props.item.category
            : "Otros objetos"}

          {editButton("category", "categoría", props.item.category)}
        </ListGroupItem>
        <ListGroupItem>
          {" "}
          <span className="h6 font-weight-bold">Descripción: </span>
          {props.item.description}
          {editButton("description", "descripción", props.item.description)}
        </ListGroupItem>
        <ListGroupItem>
          {" "}
          <span className="h6 font-weight-bold">Ubicación: </span>
          {props.item.location}
          {editButton("location", "ubicación", props.item.location)}
        </ListGroupItem>
        <ListGroupItem>
          <span className="h6 font-weight-bold">Fecha:</span>{" "}
          {moment(props.item.date).format("LL")}{" "}
          {editButton("date", "fecha", props.item.date)}
        </ListGroupItem>
        <ListGroupItem>
          <span className="h6 font-weight-bold">
            Pregunta que tienen que responderte:
          </span>{" "}
          {props.item.itemCreatorQuestion}{" "}
          {editButton(
            "itemCreatorQuestion",
            "pregunta sobre el objeto",
            props.item.itemCreatorQuestion
          )}
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
