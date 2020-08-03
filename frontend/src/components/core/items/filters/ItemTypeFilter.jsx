import React from "react";
import { Button, Container, ButtonGroup } from "reactstrap";

const ItemTypeFilter = () => {
  return (
    <ButtonGroup>
      <Button active outline size="sm" color="default">
        Todos
      </Button>
      <Button outline size="sm" color="default">
        Perdidos
      </Button>
      <Button outline size="sm" color="default">
        Encontrados
      </Button>
    </ButtonGroup>
  );
};

export default ItemTypeFilter;
