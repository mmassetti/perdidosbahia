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
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  return (
    <Container style={{ marginBottom: "2rem" }}>
      <UncontrolledDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret color="default">
          Elegir categoría
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={(e) => showFilteredItems("todas")}>
            Todas
          </DropdownItem>
          <DropdownItem onClick={(e) => showFilteredItems("documentacion")}>
            Documentación
          </DropdownItem>
          <DropdownItem onClick={(e) => showFilteredItems("llaves")}>
            Llaves
          </DropdownItem>
          <DropdownItem onClick={(e) => showFilteredItems("lentes")}>
            Lentes
          </DropdownItem>
          <DropdownItem onClick={(e) => showFilteredItems("patente")}>
            Patente
          </DropdownItem>
          <DropdownItem onClick={(e) => showFilteredItems("ropa")}>
            Ropa
          </DropdownItem>
          <DropdownItem onClick={(e) => showFilteredItems("celular")}>
            Celular/Notebook/Tablet
          </DropdownItem>
          <DropdownItem onClick={(e) => showFilteredItems("otro")}>
            Otros
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>

      <h6>{selectedCategory}</h6>
    </Container>
  );
};

export default CategoryFilter;
