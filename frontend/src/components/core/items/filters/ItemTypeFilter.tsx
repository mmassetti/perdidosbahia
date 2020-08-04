import React, { useState } from "react";
import { Button, Container, ButtonGroup } from "reactstrap";

const ItemTypeFilter = (props) => {
  const [selectedType, setSelectedType] = useState("todos");

  const showFilteredItems = (itemType) => {
    setSelectedType(itemType);

    let filter = {
      type: itemType,
      category: props.prevSelectedCategory,
    };

    if (itemType !== "todos") {
      if (props.prevSelectedCategory == "todas") {
        let filterResult: any = props.allItems.filter(
          (item) => item.type == filter.type
        );
        props.onFilter(filterResult, itemType);
      } else {
        let filterResult: any = props.allItems.filter(
          (item) => item.type == filter.type && item.category == filter.category
        );
        props.onFilter(filterResult, itemType);
      }
    } else {
      if (props.prevSelectedCategory == "todas") {
        props.onFilter(props.allItems, itemType);
      } else {
        let filterResult: any = props.allItems.filter(
          (item) => item.category == filter.category
        );
        props.onFilter(filterResult, itemType);
      }
    }
  };

  return (
    <ButtonGroup>
      <Button
        active={selectedType === "todos" ? true : false}
        outline
        size="sm"
        color="default"
        onClick={(e) => showFilteredItems("todos")}
      >
        Todos
      </Button>
      <Button
        active={selectedType === "perdido" ? true : false}
        outline
        size="sm"
        color="default"
        onClick={(e) => showFilteredItems("perdido")}
      >
        Perdidos
      </Button>
      <Button
        active={selectedType === "encontrado" ? true : false}
        outline
        size="sm"
        color="default"
        onClick={(e) => showFilteredItems("encontrado")}
      >
        Encontrados
      </Button>
    </ButtonGroup>
  );
};

export default ItemTypeFilter;
