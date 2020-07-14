/*!

=========================================================
* Argon Design System React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useContext, useEffect } from "react";
// nodejs library that concatenates classes
import classnames from "classnames";

import ReactDatetime from "react-datetime";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Label,
  Modal,
  ButtonGroup,
  Dropdown,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  CardHeader,
} from "reactstrap";

// core components
import CustomNavbar from "../../theme/Navbars/CustomNavbar.jsx";
import CardsFooter from "../../theme/Footers/CardsFooter";
// index page sections
import Download from "../../theme/IndexSections/Download";

import AuthContext from "../../../context/auth-context";

import * as yup from "yup";

import { useForm, Controller } from "react-hook-form";
import MustLoginModal from "../Helpers/MustLoginModal";
import useModal from "../Helpers/useModal";

var moment = require("moment");
require("moment/locale/es");

const LostItem = (props) => {
  const context = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [category, setCategory] = useState({ categoryName: "" });
  const [ownerQuestion, setOwnerQuestion] = useState("");
  const [buttonGroupTouched, setButtonGroupTouched] = useState(null);
  const [isToggled, setToggled] = useState(false);
  const { isShowing, toggle } = useModal();

  const defaultValues = {
    description: "",
    category: "",
    date: "",
    ownerQuestion: "",
  };

  const ItemSchema = yup.object().shape({
    description: yup
      .string()
      .required("Por favor escribí una descripción del objeto")
      .min(5, "La descripción es muy corta"),
    dateOfEvent: yup
      .date()
      .max(new Date(), "La fecha no puede ser posterior al día de hoy")
      .typeError("Por favor selecciona la fecha en que perdiste el objeto"),
    location: yup.string().required("Por favor escribí una ubicación"),
    ownerQuestion: yup.string(),
    // category: yup
    //   .string()
    //   .required("Por favor selecciona la categoría del objeto"),
  });

  const { handleSubmit, register, reset, control, errors, formState } = useForm(
    {
      mode: "onChange",
      validationSchema: ItemSchema,
      defaultValues,
    }
  );

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    toggle();
  }, []);

  const radio = (i) => {
    setCategory({ categoryName: i });
    setButtonGroupTouched(true);
  };

  const toggleTrueFalse = () => setToggled(!isToggled);

  const handleOwnerQuestionChange = (event) => {
    setOwnerQuestion(event.target.value.toString());
  };

  const cancelOwnerQuestion = () => {
    toggleTrueFalse();
    setOwnerQuestion("");
  };

  const removeOwnerQuestion = () => {
    setOwnerQuestion("");
  };

  const submitForm = async (data) => {
    setData(data);

    console.log("Data: ", data);
    console.log("ownerQuestion: ", ownerQuestion);

    const transformedDate = moment(data.dateOfEvent).toDate();

    let requestBody = {
      query: `
          mutation CreateItem($description: String! , $category: String!, $location:String, $date: String!, $ownerQuestion: String) {
            createItem(
              itemInput: 
                {description: $description, 
                type: "perdido", 
                category: $category, 
                location: $location,
                date: $date,
                ownerQuestion: $ownerQuestion }) {
                  _id
                  description
                  type
                  category
                  location
                  date
                  ownerQuestion
            }
          }
        `,
      variables: {
        description: data.description,
        category: category.categoryName,
        location: data.location,
        date: transformedDate,
        ownerQuestion: ownerQuestion,
      },
    };

    const token = context.token;

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
        console.log("TCL: resData ", resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <CustomNavbar />
      <main>
        <div className="position-relative">
          {/* shape Hero */}
          <section className="section section-sm, section-shaped">
            <div className="shape shape-style-1 shape-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="py-lg-md d-flex">
              <div className="col px-0">
                <Row>
                  <Col lg="12">
                    <h1 className="display-3 text-white">
                      Completá el formulario de esta página
                      <span>
                        y tu objeto quedará publicado para que todos lo puedan
                        ver
                      </span>
                    </h1>
                  </Col>
                </Row>
              </div>
            </Container>
          </section>
        </div>
        {context.token ? (
          <>
            <section className="section section-sm bg-gradient-default">
              <Container className="pt-lg pb-300">
                <Row className="text-center justify-content-center">
                  <Col lg="10">
                    <h2 className="display-3 text-white">
                      Formulario de objeto perdido
                    </h2>
                    {/* <p className="lead text-white">
                  Consideramos que es importante garantizar la seguridad de
                  nuestros usuarios a la hora de publicar de un objeto, por lo
                  que te pediremos que nos proporciones información sobre lo que
                  perdiste, además de una o más preguntas que alguien que pueda
                  llegar a encontrar tu objeto deberá contestar correctamente.
                  De esta forma buscamos evitar fraudes y riesgos de seguridad
                  personal.
                </p> */}
                  </Col>
                </Row>
              </Container>
              {/* SVG separator */}
              <div className="separator separator-bottom separator-skew zindex-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-white"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
            </section>
            <section className="section section-lg pt-lg-0 section-contact-us">
              <Container>
                <Row className="justify-content-center mt--300">
                  <Col lg="8">
                    <Card className="bg-gradient-secondary shadow">
                      <CardBody className="p-lg-5">
                        <h6 className="mt-0" style={{ color: "#cc3300" }}>
                          <b>IMPORTANTE</b>: Recomendamos que en la descripción
                          del objeto <b>NO</b> brindes todos los detalles de tu
                          objeto. Más abajo podrás agregar una pregunta que
                          deberá contestar quien encuentre un objeto similar al
                          tuyo. De esta forma buscamos evitar fraudes
                        </h6>

                        <h6 className="h6 text-primary  ">
                          ¿Necesitás ayuda?{" "}
                          <a href="#" className="mr-1 font-weight-bold">
                            Acá
                          </a>
                          hay un ejemplo de como completar el formulario
                        </h6>
                        <br></br>

                        {/* <h2 className="mb-1 fon-weight-bold">
                      Formulario de objeto perdido
                    </h2> */}

                        <Form
                          noValidate
                          role="form"
                          onSubmit={handleSubmit(submitForm)}
                        >
                          {/* //* Category (llaves,documentos,patente,celular,etc) */}
                          <FormGroup>
                            <ButtonGroup
                              style={{ borderColor: "red" }}
                              vertical
                            >
                              <div style={{ marginBottom: "1rem" }}>
                                <span className="h6 font-weight-bold ">
                                  Seleccioná una categoría
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
                                  category.categoryName == "" &&
                                  buttonGroupTouched
                                    ? "danger"
                                    : "default"
                                }
                                size="sm"
                              >
                                <span className="btn-inner--text">
                                  Documentación
                                </span>
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
                                  category.categoryName == "" &&
                                  buttonGroupTouched
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
                                  category.categoryName == "" &&
                                  buttonGroupTouched
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
                                  category.categoryName == "" &&
                                  buttonGroupTouched
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
                                  category.categoryName == "" &&
                                  buttonGroupTouched
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
                                  category.categoryName == "" &&
                                  buttonGroupTouched
                                    ? "danger"
                                    : "default"
                                }
                                size="sm"
                              >
                                <span className="btn-inner--text">
                                  Celular/Notebook/Tablet
                                </span>
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
                                  category.categoryName == "" &&
                                  buttonGroupTouched
                                    ? "danger"
                                    : "default"
                                }
                                size="sm"
                              >
                                <span className="btn-inner--text">Otro</span>
                              </Button>
                            </ButtonGroup>
                          </FormGroup>

                          {/* //* Date */}
                          <FormGroup
                            className={
                              !formState.touched.dateOfEvent &&
                              (formState.submitCount == 0 ||
                                formState.isSubmitted)
                                ? ""
                                : errors.dateOfEvent
                                ? "has-danger"
                                : "has-success"
                            }
                          >
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-calendar-grid-58" />
                                </InputGroupText>
                              </InputGroupAddon>

                              <Controller
                                as={
                                  <ReactDatetime
                                    ref={register()}
                                    inputProps={{
                                      placeholder:
                                        "Fecha en la que perdiste el objeto",
                                    }}
                                    timeFormat={false}
                                    locale="es"
                                  />
                                }
                                name="dateOfEvent"
                                control={control}
                              />
                            </InputGroup>
                            {errors.dateOfEvent && (
                              <small style={{ color: "red" }}>
                                {errors.dateOfEvent.message}
                              </small>
                            )}
                          </FormGroup>

                          {/* //* Location */}
                          <FormGroup
                            className={
                              !formState.touched.location &&
                              (formState.submitCount == 0 ||
                                formState.isSubmitted)
                                ? ""
                                : errors.location
                                ? "has-danger"
                                : "has-success"
                            }
                          >
                            <Controller
                              as={
                                <Input
                                  ref={register()}
                                  autoComplete="off"
                                  placeholder="Escribí la ubicación en donde perdiste tu objeto (calle y altura,lugar,zona,etc) "
                                  className={
                                    !formState.touched.location &&
                                    (formState.submitCount == 0 ||
                                      formState.isSubmitted)
                                      ? ""
                                      : errors.location
                                      ? "is-invalid"
                                      : "is-valid"
                                  }
                                  cols="80"
                                  rows="4"
                                  type="textarea"
                                />
                              }
                              name="location"
                              control={control}
                            />
                            {errors.location && (
                              <small style={{ color: "red" }}>
                                {errors.location.message}
                              </small>
                            )}
                          </FormGroup>

                          {/* //* Description */}
                          <FormGroup
                            className={
                              !formState.touched.description &&
                              (formState.submitCount == 0 ||
                                formState.isSubmitted)
                                ? ""
                                : errors.description
                                ? "has-danger"
                                : "has-success"
                            }
                          >
                            <Controller
                              as={
                                <Input
                                  ref={register()}
                                  autoComplete="off"
                                  placeholder="Escribí una descripción del objeto (recomendamos que guardes algún detalle de tu objeto para poner en una pregunta debajo)"
                                  className={
                                    !formState.touched.description &&
                                    (formState.submitCount == 0 ||
                                      formState.isSubmitted)
                                      ? ""
                                      : errors.description
                                      ? "is-invalid"
                                      : "is-valid"
                                  }
                                  cols="80"
                                  rows="4"
                                  type="textarea"
                                />
                              }
                              name="description"
                              control={control}
                            />
                            {errors.description && (
                              <small style={{ color: "red" }}>
                                {errors.description.message}
                              </small>
                            )}
                          </FormGroup>

                          <div style={{ marginBottom: "1rem" }}>
                            <span className="h6 font-weight-bold ">
                              Recomendamos que agregues una o más preguntas que
                              deberá contestar quien encuentre un objeto similar
                              al tuyo. También le solicitaremos a la persona que
                              envíe una foto
                            </span>
                          </div>

                          {/* Modal questions */}
                          <Row>
                            <Col md="4">
                              <Button
                                color="default"
                                type="button"
                                onClick={toggleTrueFalse}
                              >
                                Agregar pregunta
                              </Button>
                              <Modal
                                className="modal-dialog-centered"
                                size="sm"
                                isOpen={isToggled}
                                toggle={toggleTrueFalse}
                              >
                                <div className="modal-body p-0">
                                  <Card className="bg-secondary shadow border-0">
                                    <CardHeader className="bg-transparent pb-3">
                                      <div className="text-muted text-center mt-2 mb-3">
                                        <span className="h6 font-weight-bold ">
                                          Pregunta sobre el objeto
                                        </span>
                                      </div>
                                    </CardHeader>
                                    <CardBody className="px-lg-3 py-lg-3">
                                      <div className="text-center text-muted mb-4">
                                        <h6>
                                          Agrega una pregunta sobre tu objeto
                                          (por ejemplo: color, tamaño, o
                                          cualquier detalle que recuerdes).
                                        </h6>
                                      </div>
                                      <Form role="form">
                                        {/* //* Question */}
                                        <FormGroup
                                          className={
                                            !formState.touched.ownerQuestion &&
                                            (formState.submitCount == 0 ||
                                              formState.isSubmitted)
                                              ? ""
                                              : errors.ownerQuestion
                                              ? "has-danger"
                                              : "has-success"
                                          }
                                        >
                                          <Input
                                            ref={register()}
                                            autoComplete="off"
                                            placeholder="Ejemplos: Qué tipo de funda tiene el celular? Cómo es el estuche de los lentes? Qué fecha de nacimiento figura en el documento?"
                                            className={
                                              !formState.touched
                                                .ownerQuestion &&
                                              (formState.submitCount == 0 ||
                                                formState.isSubmitted)
                                                ? ""
                                                : errors.ownerQuestion
                                                ? "is-invalid"
                                                : "is-valid"
                                            }
                                            cols="80"
                                            rows="4"
                                            type="textarea"
                                            name="ownerQuestion"
                                            value={ownerQuestion}
                                            onChange={handleOwnerQuestionChange}
                                          />

                                          {errors.ownerQuestion && (
                                            <small style={{ color: "red" }}>
                                              {errors.ownerQuestion.message}
                                            </small>
                                          )}
                                        </FormGroup>
                                        <h6>
                                          <span>
                                            Si alguien dice haber encontrado tu
                                            objeto te mostraremos su respuesta a
                                            esta pregunta
                                          </span>

                                          <br />
                                          {/* <span className="text-danger">
                                        También le solicitaremos que envíe una
                                        foto del objeto
                                      </span> */}
                                        </h6>

                                        <div className="modal-footer">
                                          <Button
                                            color="primary"
                                            type="button"
                                            onClick={toggleTrueFalse}
                                          >
                                            Guardar pregunta
                                          </Button>
                                          <Button
                                            className="ml-auto"
                                            color="link"
                                            data-dismiss="modal"
                                            type="button"
                                            onClick={cancelOwnerQuestion}
                                          >
                                            Volver
                                          </Button>
                                        </div>
                                      </Form>
                                    </CardBody>
                                  </Card>
                                </div>
                              </Modal>
                            </Col>
                            <Col md="4">
                              <Button
                                hidden={ownerQuestion == ""}
                                disabled={ownerQuestion == ""}
                                className="ml-auto"
                                color="danger"
                                outline
                                data-dismiss="modal"
                                type="button"
                                onClick={removeOwnerQuestion}
                              >
                                Eliminar pregunta
                              </Button>
                            </Col>
                          </Row>

                          {/* //Submit */}
                          <div className="text-center">
                            <Button
                              className="my-4"
                              color="primary"
                              disabled={
                                !formState.isValid || !buttonGroupTouched
                                  ? true
                                  : false
                              }
                              type="submit"
                            >
                              Publicar objeto
                            </Button>
                          </div>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </section>
            <Download />
          </>
        ) : (
          <>
            <h2>
              {" "}
              Para poder publicar un objeto primero es necesario Registrarse o
              Iniciar sesion
            </h2>
            <MustLoginModal isShowing={isShowing} hide={toggle} />
          </>
        )}
      </main>
      <CardsFooter />
    </>
  );
};

export default LostItem;