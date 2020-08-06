import React, { useState } from "react";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";

const CategoryFilter = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(props.prevState);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const showFilteredItems = (category) => {
    setSelectedCategory(category);

    let filter = {
      type: props.prevSelectedType,
      category: category,
    };

    if (category !== "todas") {
      if (props.prevSelectedType === "todos") {
        let filterResult: any = props.allItems.filter(
          (item) => item.category === filter.category
        );
        props.onFilter(filterResult, category);
      } else {
        let filterResult: any = props.allItems.filter(
          (item) =>
            item.type === filter.type && item.category === filter.category
        );
        props.onFilter(filterResult, category);
      }
    } else {
      if (props.prevSelectedType === "todos") {
        props.onFilter(props.allItems, category);
      } else {
        let filterResult: any = props.allItems.filter(
          (item) => item.type === filter.type
        );
        props.onFilter(filterResult, category);
      }
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
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default CategoryFilter;
