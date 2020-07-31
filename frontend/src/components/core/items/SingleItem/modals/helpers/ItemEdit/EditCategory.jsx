import React, { useState, useEffect } from "react";
import { Button, FormGroup, ButtonGroup, Form } from "reactstrap";
import { useForm, Controller } from "react-hook-form";

import { useHistory } from "react-router-dom";

export default function EditCategory(props) {
  console.log("EditCategory -> props", props);
  const [category, setCategory] = useState({ categoryName: "" });

  const [buttonGroupTouched, setButtonGroupTouched] = useState(null);
  let history = useHistory();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  });

  const defaultValues = {
    category: "",
  };

  const { handleSubmit, register, reset, control, errors, formState } = useForm(
    {
      mode: "onChange",
      defaultValues,
    }
  );

  const radio = (i) => {
    setCategory({ categoryName: i });
    setButtonGroupTouched(true);
  };

  const submitForm = async (data) => {
    let requestBody = {
      query: `
          mutation EditItem($itemId: ID!, $description: String! , $category: String!, $location:String, $date: String!, $itemCreatorQuestion: String!, $itemType: String!) {
            editItem(
              itemId: $itemId,
              newItemInput: 
                {description: $description, 
                type: $itemType, 
                category: $category, 
                location: $location,
                date: $date,
                itemCreatorQuestion: $itemCreatorQuestion }) {
                  _id
                  description
                  type
                  category
                  location
                  date
                  itemCreatorQuestion
            }
          }
        `,
      variables: {
        itemId: props.info.info.item._id,
        category: category.categoryName,
        itemType: props.info.info.item.type,
        description: props.info.info.item.description,
        location: props.info.info.item.location,
        date: props.info.info.item.date,
        itemCreatorQuestion: props.info.info.item.itemCreatorQuestion,
      },
    };

    const token = props.info.info.token;

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        /* //TODO: Reedireccionar */
        history.push({
          pathname: "/objetos-publicados",
        });
        console.log("TCL: resData ", resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="px-sm-3 py-sm-3 text-center text-muted ">
      <Form noValidate role="form" onSubmit={handleSubmit(submitForm)}>
        {/* //* Category (llaves,documentos,patente,celular,etc) */}
        <FormGroup>
          <ButtonGroup style={{ borderColor: "red" }} vertical>
            <div
              style={{
                marginBottom: "1rem",
                marginTop: "1rem",
              }}
            >
              <span className="h6 font-weight-bold ">
                Seleccioná la nueva categoría:
              </span>
            </div>
            <Button
              onClick={() => radio("documentacion")}
              className={
                category.categoryName === "documentacion"
                  ? "active btn-icon mb-3 mb-sm-0"
                  : "btn-icon mb-3 mb-sm-0"
              }
              outline
              color={
                category.categoryName === "" && buttonGroupTouched
                  ? "danger"
                  : "default"
              }
              size="sm"
            >
              <span className="btn-inner--text">Documentación</span>
            </Button>
            <Button
              onClick={() => radio("llaves")}
              className={
                category.categoryName === "llaves"
                  ? "active btn-icon mb-3 mb-sm-0"
                  : "btn-icon mb-3 mb-sm-0"
              }
              outline
              color={
                category.categoryName === "" && buttonGroupTouched
                  ? "danger"
                  : "default"
              }
              size="sm"
            >
              <span className="btn-inner--text">Llaves</span>
            </Button>
            <Button
              onClick={() => radio("lentes")}
              className={
                category.categoryName === "lentes"
                  ? "active btn-icon mb-3 mb-sm-0"
                  : "btn-icon mb-3 mb-sm-0"
              }
              outline
              color={
                category.categoryName === "" && buttonGroupTouched
                  ? "danger"
                  : "default"
              }
              size="sm"
            >
              <span className="btn-inner--text">Lentes</span>
            </Button>
            <Button
              onClick={() => radio("patente")}
              className={
                category.categoryName === "patente"
                  ? "active btn-icon mb-3 mb-sm-0"
                  : "btn-icon mb-3 mb-sm-0"
              }
              outline
              color={
                category.categoryName === "" && buttonGroupTouched
                  ? "danger"
                  : "default"
              }
              size="sm"
            >
              <span className="btn-inner--text">Patente</span>
            </Button>
            <Button
              onClick={() => radio("ropa")}
              className={
                category.categoryName === "ropa"
                  ? "active btn-icon mb-3 mb-sm-0"
                  : "btn-icon mb-3 mb-sm-0"
              }
              outline
              color={
                category.categoryName === "" && buttonGroupTouched
                  ? "danger"
                  : "default"
              }
              size="sm"
            >
              <span className="btn-inner--text">Ropa</span>
            </Button>
            <Button
              onClick={() => radio("celular")}
              className={
                category.categoryName === "celular"
                  ? "active btn-icon mb-3 mb-sm-0"
                  : "btn-icon mb-3 mb-sm-0"
              }
              outline
              color={
                category.categoryName === "" && buttonGroupTouched
                  ? "danger"
                  : "default"
              }
              size="sm"
            >
              <span className="btn-inner--text">Celular/Notebook/Tablet</span>
            </Button>
            <Button
              onClick={() => radio("otro")}
              className={
                category.categoryName === "otro"
                  ? "active btn-icon mb-3 mb-sm-0"
                  : "btn-icon mb-3 mb-sm-0"
              }
              outline
              color={
                category.categoryName === "" && buttonGroupTouched
                  ? "danger"
                  : "default"
              }
              size="sm"
            >
              <span className="btn-inner--text">Otro</span>
            </Button>
          </ButtonGroup>
        </FormGroup>

        <div className="text-center">
          <Button
            className="my-4"
            color="primary"
            disabled={!formState.isValid || !buttonGroupTouched ? true : false}
            type="submit"
          >
            Confirmar cambio
          </Button>
        </div>
      </Form>
    </div>
  );
}
