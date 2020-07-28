import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

export default function ContactInfo(props) {
  return (
    <div className="modal-body">
      <ListGroup>
        <ListGroupItem>
          <span className="h6 font-weight-bold">Nombre: </span>
          {props.firstName}
        </ListGroupItem>
        <ListGroupItem>
          {" "}
          <span className="h6 font-weight-bold">Apellido: </span>
          {props.lastName}{" "}
        </ListGroupItem>
        <ListGroupItem>
          {" "}
          <span className="h6 font-weight-bold">Número de celular: </span>
          {props.phoneNumber
            ? props.phoneNumber
            : "La otra persona no brindó su número"}{" "}
        </ListGroupItem>
        <ListGroupItem>
          <span className="h6 font-weight-bold">Email:</span> {props.email}
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
