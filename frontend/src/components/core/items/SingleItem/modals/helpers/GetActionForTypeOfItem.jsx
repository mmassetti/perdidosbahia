import React from "react";
import { Button } from "reactstrap";

const GetActionForTypeOfItem = (props) => {
  if (props.itemType === "perdido") {
    return (
      <Button
        color="primary"
        size="sm"
        onClick={props.onToggle}
        style={{ marginBottom: "0.5rem" }}
      >
        <span className="btn-inner--text">¡Creo que encontré este objeto!</span>
      </Button>
    );
  } else if (props.itemType === "encontrado") {
    return (
      <Button
        color="primary"
        size="sm"
        onClick={props.onToggle}
        style={{ marginBottom: "0.5rem" }}
      >
        <span className="btn-inner--text">¡Este objeto es mío!</span>
      </Button>
    );
  }
};

export default GetActionForTypeOfItem;
