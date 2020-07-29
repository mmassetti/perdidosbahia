import React from "react";

export default function OptionsForSelectedField(props) {
  switch (props.selectedField) {
    case "category":
      return <p>Opciones para category</p>;
    case "description":
      return <p>Opciones para description</p>;
    case "location":
      return <p>Opciones para location</p>;
    case "date":
      return <p>Opciones para date</p>;
    case "itemCreatorQuestion":
      return <p>Opciones para itemCreatorQuestion</p>;
    default:
      return <p>Lo sentimos pero no se puede editar el campo seleccionado</p>;
  }
}
