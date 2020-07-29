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
          {/* <Button
            size="sm"
            color="primary"
            onClick={() => {
              alert("EDITAR");
            }}
          >
            Editar
          </Button> */}
          <Button
            className=" btn-neutral btn-icon-only btn-round pull-right"
            color="github"
            // style={{ color: "#1da1d2" }}
            id="tooltip126536702"
            size="sm"
            target="_blank"
          >
            <i className="fa fa-pencil" />
          </Button>
          {/* 
          <span class="pull-right">
            <span onclick="alert('Action2 -> Play'); event.stopPropagation();">
              <i className="fa fa-pencil-square-o" />
              <span class="glyphicon glyphicon-play" aria-hidden="true"></span>
            </span>
          </span> */}
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
