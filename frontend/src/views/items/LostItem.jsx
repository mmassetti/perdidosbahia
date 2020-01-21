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
  CardHeader
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import CardsFooter from "components/Footers/CardsFooter.jsx";

// index page sections
import Download from "../IndexSections/Download.jsx";

import AuthContext from "../../context/auth-context";

import * as yup from "yup";

import { useForm, Controller } from "react-hook-form";

var moment = require("moment");
require("moment/locale/es");

const LostItem = props => {
  const context = useContext(AuthContext);

  const defaultValues = {
    description: "",
    category: "",
    date: "",
    question: ""
  };

  const ItemSchema = yup.object().shape({
    description: yup
      .string()
      .required("Por favor escribí una descripción del objeto")
      .min(5, "La descripción es muy corta"),
    dateOfEvent: yup
      .date()
      .max(new Date(), "La fecha no puede ser posterior al día de hoy")
      .typeError("Por favor selecciona la fecha en que perdiste el objeto")
    // category: yup
    //   .string()
    //   .required("Por favor selecciona la categoría del objeto"),
  });

  const { handleSubmit, register, reset, control, errors, formState } = useForm(
    {
      mode: "onChange",
      validationSchema: ItemSchema,
      defaultValues
    }
  );

  const [data, setData] = useState(null);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);

  const [category, setCategory] = useState({ categoryName: "" });
  const [buttonGroupTouched, setButtonGroupTouched] = useState(null);

  const radio = i => {
    setCategory({ categoryName: i });
    setButtonGroupTouched(true);
  };

  const [isToggled, setToggled] = useState(false);

  const toggleTrueFalse = () => setToggled(!isToggled);

  const submitForm = async data => {
    setData(data);
    console.log("Data: ", data);
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    console.log(
      "fecha: ",
      data.dateOfEvent.toLocaleDateString("es-ES", options)
    );

    let requestBody = {
      query: `
          mutation {
            createItem(itemInput: {description: "${
              data.description
            }", type: "perdido", category: "${
        category.categoryName
      }", date: "${data.dateOfEvent.toLocaleDateString("es-ES", options)}"}) {
              _id
              description
              type
              category
              date
              creator {
                _id
                email
              }
            }
          }
        `
    };

    const token = context.token;

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        /* //TODO: Reedireccionar */
        console.log("TCL: resData ", resData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <DemoNavbar />
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

        <section className="section section-sm bg-gradient-default">
          <Container className="pt-lg pb-300">
            <Row className="text-center justify-content-center">
              <Col lg="10">
                <h2 className="display-3 text-white">¿Cómo funciona?</h2>
                <p className="lead text-white">
                  Consideramos que es importante garantizar la seguridad de
                  nuestros usuarios a la hora de publicar de un objeto, por lo
                  que te pediremos que nos proporciones información sobre lo que
                  perdiste, además de una o más preguntas que alguien que pueda
                  llegar a encontrar tu objeto deberá contestar correctamente.
                  De esta forma buscamos evitar fraudes y riesgos de seguridad
                  personal.
                </p>
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
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
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
                      <b>IMPORTANTE</b>: Te pedimos que en la descripción del
                      objeto te guardes uno o más detalles que se utilizarán en
                      una de las preguntas que deberá contestar quien encuentre
                      un objeto similar al tuyo
                    </h6>

                    <h6 className="h6 text-primary  ">
                      ¿Necesitás ayuda?{" "}
                      <a href="#" className="mr-1 font-weight-bold">
                        Acá
                      </a>
                      hay un ejemplo de como completar el formulario
                    </h6>
                    <br></br>

                    <h2 className="mb-1 fon-weight-bold text-success">
                      Formulario de objeto perdido
                    </h2>

                    <Form
                      noValidate
                      role="form"
                      onSubmit={handleSubmit(submitForm)}
                    >
                      {/* //* Category (llaves,documentos,patente,celular,etc) */}
                      <FormGroup>
                        <ButtonGroup style={{ borderColor: "red" }} vertical>
                          <div>
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
                              category.categoryName == "" && buttonGroupTouched
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
                              category.categoryName == "" && buttonGroupTouched
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
                              category.categoryName == "" && buttonGroupTouched
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
                              category.categoryName == "" && buttonGroupTouched
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
                              category.categoryName == "" && buttonGroupTouched
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
                              category.categoryName == "" && buttonGroupTouched
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
                              category.categoryName == "" && buttonGroupTouched
                                ? "danger"
                                : "default"
                            }
                            size="sm"
                          >
                            <span className="btn-inner--text">Otro</span>
                          </Button>
                        </ButtonGroup>
                      </FormGroup>

                      {/* //* Description */}
                      <FormGroup
                        className={
                          !formState.touched.description &&
                          (formState.submitCount == 0 || formState.isSubmitted)
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
                              placeholder="Escribí una descripción del objeto (guardá uno o mas detalles de tu objeto para poner en una pregunta acá abajo)"
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

                      {/* //* Date */}
                      <FormGroup
                        className={
                          !formState.touched.dateOfEvent &&
                          (formState.submitCount == 0 || formState.isSubmitted)
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
                                    "Fecha en la que perdiste el objeto"
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
                                      Preguntas sobre el objeto
                                    </span>
                                  </div>
                                </CardHeader>
                                <CardBody className="px-lg-5 py-lg-5">
                                  <div className="text-center text-muted mb-4">
                                    <h6>
                                      Agrega una pregunta sobre tu objeto (por
                                      ejemplo: color, tamano, o cualquier
                                      detalle que recuerdes).
                                    </h6>
                                  </div>
                                  <Form role="form">
                                    {/* //* Question */}
                                    <FormGroup
                                      className={
                                        !formState.touched.question &&
                                        (formState.submitCount == 0 ||
                                          formState.isSubmitted)
                                          ? ""
                                          : errors.question
                                          ? "has-danger"
                                          : "has-success"
                                      }
                                    >
                                      <Controller
                                        as={
                                          <Input
                                            ref={register()}
                                            autoComplete="off"
                                            placeholder="Escribí una descripción del objeto (guardá uno o mas detalles de tu objeto para poner en una pregunta acá abajo)"
                                            className={
                                              !formState.touched.question &&
                                              (formState.submitCount == 0 ||
                                                formState.isSubmitted)
                                                ? ""
                                                : errors.question
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
                                      {errors.question && (
                                        <small style={{ color: "red" }}>
                                          {errors.question.message}
                                        </small>
                                      )}
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                      <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                          <InputGroupText>
                                            <i className="ni ni-email-83" />
                                          </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                          placeholder="Email"
                                          type="email"
                                        />
                                      </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                      <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                          <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                          </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                          placeholder="Password"
                                          type="password"
                                        />
                                      </InputGroup>
                                    </FormGroup>

                                    <div className="text-center">
                                      <Button
                                        className="my-4"
                                        color="primary"
                                        type="button"
                                      >
                                        Guardar pregunta
                                      </Button>
                                    </div>
                                  </Form>
                                </CardBody>
                              </Card>
                            </div>
                          </Modal>
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
      </main>
      <CardsFooter />
    </>
  );
};

export default LostItem;
