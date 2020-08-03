import React, { useState } from "react";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Container,
  Dropdown,
} from "reactstrap";

const CategoryFilter = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("todas");

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const showFilteredItems = (category) => {
    setSelectedCategory(category);

    if (category !== "todas") {
      const filteredItems = [];

      props.allItems
        .filter((item) => item.category.includes(category))
        .map((searchedItems) => {
          filteredItems.push(searchedItems);
        });

      props.onFilter(filteredItems);
    } else {
      props.onFilter(props.allItems);
    }
  };

  const showMessage = () => {
    if (selectedCategory) {
      return (
        <h6>
          Mostrando:{" "}
          <span style={{ textTransform: "capitalize" }}>
            {selectedCategory}
          </span>
        </h6>
      );
    } else {
      return (
        <h6>
          Mostrando: <span style={{ textTransform: "capitalize" }}>todas</span>
        </h6>
      );
    }
  };

  return (
    <Container style={{ marginBottom: "2rem" }}>
      <UncontrolledDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
          caret
          size="sm"
          color="default"
          style={{ marginBottom: "0.5rem" }}
        >
          Elegir categoría
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            active={selectedCategory === "todas" ? true : false}
            onClick={(e) => showFilteredItems("todas")}
          >
            Todas
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem
            active={selectedCategory === "documentacion" ? true : false}
            onClick={(e) => showFilteredItems("documentacion")}
          >
            Documentación
          </DropdownItem>
          <DropdownItem
            active={selectedCategory === "llaves" ? true : false}
            onClick={(e) => showFilteredItems("llaves")}
          >
            Llaves
          </DropdownItem>
          <DropdownItem
            active={selectedCategory === "lentes" ? true : false}
            onClick={(e) => showFilteredItems("lentes")}
          >
            Lentes
          </DropdownItem>
          <DropdownItem
            active={selectedCategory === "patente" ? true : false}
            onClick={(e) => showFilteredItems("patente")}
          >
            Patente
          </DropdownItem>
          <DropdownItem
            active={selectedCategory === "ropa" ? true : false}
            onClick={(e) => showFilteredItems("ropa")}
          >
            Ropa
          </DropdownItem>
          <DropdownItem
            active={selectedCategory === "celular" ? true : false}
            onClick={(e) => showFilteredItems("celular")}
          >
            Celular/Notebook/Tablet
          </DropdownItem>
          <DropdownItem
            active={selectedCategory === "otro" ? true : false}
            onClick={(e) => showFilteredItems("otro")}
          >
            Otros
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>

      {showMessage()}
    </Container>
  );
};

export default CategoryFilter;
