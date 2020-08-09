/*!

=====================================================================================
* Argon Design System React - v1.0.0
=====================================================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=====================================================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useContext, useEffect } from "react";

import ReactDatetime from "react-datetime";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Modal,
  ButtonGroup,
  Form,
  CardHeader,
} from "reactstrap";

import CustomNavbar from "../../../theme/Navbars/CustomNavbar.jsx";

import AuthContext from "../../../../common/providers/AuthProvider/auth-context";
import { useForm, Controller } from "react-hook-form";
import MustLoginModal from "../../Helpers/MustLoginModal";
import useModal from "../../Helpers/useModal";
import SimpleFooter from "../../../theme/Footers/SimpleFooter";
import AlertMessage from "../../Helpers/Alerts/AlertMessage";
import getNewItemSchema from "./getNewItemSchema.js";
import getNewItemQuery from "./getNewItemQuery.js";

var moment = require("moment");
require("moment/locale/es");

const NewItem = (props) => {
  const context = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [category, setCategory] = useState({ categoryName: "" });
  const [itemCreatorQuestion, setItemCreatorQuestion] = useState("");
  const [buttonGroupTouched, setButtonGroupTouched] = useState(null);
  const [isToggled, setToggled] = useState(false);
  const { isShowing, toggle } = useModal();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const defaultValues = {
    description: "",
    category: "",
    date: "",
    itemCreatorQuestion: "",
  };

  const ItemSchema = getNewItemSchema();

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

  const handleItemCreatorQuestionChange = (event) => {
    setItemCreatorQuestion(event.target.value.toString());
  };

  const cancelItemCreatorQuestion = () => {
    toggleTrueFalse();
    setItemCreatorQuestion("");
  };

  const removeItemCreatorQuestion = () => {
    setItemCreatorQuestion("");
  };

  const submitForm = async (data) => {
    setData(data);

    const transformedDate = moment(data.dateOfEvent).toDate();

    let requestBody = getNewItemQuery(
      data,
      category,
      transformedDate,
      itemCreatorQuestion,
      props.type
    );

    const token = context.token;

    fetch(localStorage.getItem("fetchUrl"), {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          setShowErrorAlert(true);
        }
        return res.json();
      })
      .then((resData) => {
        setShowSuccessAlert(true);
      })
      .catch((err) => {
        setShowErrorAlert(true);

        console.log(err);
      });
  };

  const getPlaceholder = () => {
    if (props.type === "perdido") {
      return "perdiste";
    } else return "encontraste";
  };

  const showAlertMessage = (type, msg, redirectTo) => {
    return <AlertMessage type={type} msg={msg} redirectTo={redirectTo} />;
  };

  /* //* Category (llaves,documentos,patente,celular,etc) */
  const showCategoryOptions = () => {
    return (
      <FormGroup>
        <ButtonGroup style={{ borderColor: "red" }} vertical>
          <div
            style={{
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            <span className="h6 font-weight-bold ">
              Seleccioná una categoría de las siguientes:
            </span>
          </div>
          <Button
            active={!buttonGroupTouched}
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
    );
  };

  /* //* Date */
  const showDateOptions = () => {
    return (
      <FormGroup
        className={
          !formState.touched.dateOfEvent &&
          (formState.submitCount === 0 || formState.isSubmitted)
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
                    "Fecha en la que " + getPlaceholder() + " el objeto",
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
          <small style={{ color: "red" }}>{errors.dateOfEvent.message}</small>
        )}
      </FormGroup>
    );
  };

  /* //* Location */
  const showLocationOptions = () => {
    return (
      <FormGroup
        className={
          !formState.touched.location &&
          (formState.submitCount === 0 || formState.isSubmitted)
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
              placeholder={
                "Escribí la ubicación en donde " +
                getPlaceholder() +
                " tu objeto (calle y altura,lugar,zona,etc)"
              }
              className={
                !formState.touched.location &&
                (formState.submitCount === 0 || formState.isSubmitted)
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
          <small style={{ color: "red" }}>{errors.location.message}</small>
        )}
      </FormGroup>
    );
  };

  /* //* Description */
  const showDescriptionOptions = () => {
    return (
      <FormGroup
        className={
          !formState.touched.description &&
          (formState.submitCount === 0 || formState.isSubmitted)
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
              placeholder="Escribí una descripción del objeto (recordá guardar algún detalle de tu objeto para poner en una pregunta debajo)"
              className={
                !formState.touched.description &&
                (formState.submitCount === 0 || formState.isSubmitted)
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
          <small style={{ color: "red" }}>{errors.description.message}</small>
        )}
      </FormGroup>
    );
  };

  /* //* Item question */
  const itemQuestionHeader = () => {
    if (itemCreatorQuestion) {
      return (
        <div style={{ marginBottom: "1rem" }}>
          <span className="h6 ">
            <b>Tu pregunta:</b> {itemCreatorQuestion}
          </span>
        </div>
      );
    } else {
      return (
        <div style={{ marginBottom: "1rem" }}>
          <span className="h6 font-weight-bold ">
            Necesitamos que agregues una pregunta.
          </span>
        </div>
      );
    }
  };

  const showItemQuestionOptions = () => {
    return (
      <React.Fragment>
        {itemQuestionHeader()}
        <Row>
          <Col md="4">
            <Button
              color="default"
              type="button"
              size="sm"
              onClick={toggleTrueFalse}
              style={{ marginBottom: "1rem" }}
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
                        Agrega una pregunta sobre tu objeto (por ejemplo: color,
                        tamaño, o cualquier detalle que recuerdes).
                      </h6>
                    </div>
                    <Form role="form">
                      <FormGroup
                        className={
                          !formState.touched.itemCreatorQuestion &&
                          (formState.submitCount === 0 || formState.isSubmitted)
                            ? ""
                            : errors.itemCreatorQuestion
                            ? "has-danger"
                            : "has-success"
                        }
                      >
                        <Input
                          ref={register()}
                          autoComplete="off"
                          placeholder="Ejemplos: Qué tipo de funda tiene el celular? Cómo es el estuche de los lentes? Qué fecha de nacimiento figura en el documento?"
                          className={
                            !formState.touched.itemCreatorQuestion &&
                            (formState.submitCount === 0 ||
                              formState.isSubmitted)
                              ? ""
                              : errors.itemCreatorQuestion
                              ? "is-invalid"
                              : "is-valid"
                          }
                          cols="80"
                          rows="4"
                          type="textarea"
                          name="itemCreatorQuestion"
                          value={itemCreatorQuestion}
                          onChange={handleItemCreatorQuestionChange}
                        />

                        {errors.itemCreatorQuestion && (
                          <small style={{ color: "red" }}>
                            {errors.itemCreatorQuestion.message}
                          </small>
                        )}
                      </FormGroup>
                      <h6>
                        {props.type === "perdido" ? (
                          <span>
                            Si alguien reclama haber encontrado tu objeto te
                            mostraremos su respuesta a esta pregunta
                          </span>
                        ) : (
                          <span>
                            Si alguien reclama haber perdido tu objeto te
                            mostraremos su respuesta a esta pregunta
                          </span>
                        )}

                        <br />
                      </h6>

                      <div className="modal-footer">
                        <Button
                          color="primary"
                          type="button"
                          disabled={itemCreatorQuestion ? false : true}
                          onClick={toggleTrueFalse}
                        >
                          Guardar
                        </Button>
                        <Button
                          className="ml-auto"
                          color="link"
                          data-dismiss="modal"
                          type="button"
                          onClick={cancelItemCreatorQuestion}
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
              hidden={itemCreatorQuestion === ""}
              disabled={itemCreatorQuestion === ""}
              className="ml-auto"
              color="danger"
              outline
              data-dismiss="modal"
              type="button"
              size="sm"
              onClick={removeItemCreatorQuestion}
              style={{ marginBottom: "1rem" }}
            >
              Eliminar pregunta
            </Button>
          </Col>
        </Row>
        <div className="text-center">
          <Button
            className="my-4"
            color="primary"
            disabled={
              !formState.isValid || !buttonGroupTouched || !itemCreatorQuestion
                ? true
                : false
            }
            type="submit"
          >
            Publicar objeto
          </Button>
          {showSuccessAlert
            ? showAlertMessage(
                "success",
                "¡Objeto publicado!",
                "mis-publicaciones"
              )
            : ""}
          {showErrorAlert
            ? showAlertMessage(
                "danger",
                "Lo sentimos, hubo un error",
                "mis-publicaciones"
              )
            : ""}
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <CustomNavbar />
      <main>
        <div className="position-relative">
          <section
            className="section section-sm, section-shaped"
            style={{ paddingBottom: "0rem" }}
          >
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
            <Container className="py-sm-sm d-flex">
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
          <React.Fragment>
            <section
              className="section section-sm bg-gradient-default"
              style={{ paddingBottom: "0rem" }}
            >
              <Container className="pt-sm pb-300">
                <Row className="text-center justify-content-center">
                  <Col lg="10">
                    <h2 className="display-3 text-white">
                      Formulario de objeto {props.type}
                    </h2>
                  </Col>
                </Row>
              </Container>
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
            <section className="section section-sm pt-lg-0 section-contact-us">
              <Container>
                <Row className="justify-content-center mt--300">
                  <Col lg="8">
                    <Card className="bg-gradient-secondary shadow">
                      <CardBody className="p-lg-5">
                        <h6 className="mt-0" style={{ color: "#cc3300" }}>
                          <b>IMPORTANTE</b>: En la descripción del objeto{" "}
                          <b>NO</b> brindes todos los detalles de tu objeto. Más
                          abajo deberás agregar una pregunta que tendrá que
                          contestar quien reclame un objeto similar al tuyo. De
                          esta forma buscamos evitar fraudes
                        </h6>

                        <Form
                          noValidate
                          role="form"
                          onSubmit={handleSubmit(submitForm)}
                        >
                          {showCategoryOptions()}

                          {showDateOptions()}

                          {showLocationOptions()}

                          {showDescriptionOptions()}

                          {showItemQuestionOptions()}
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </section>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="text-center mt-5">
              <h3>
                {" "}
                <Link to="/registro" className="font-weight-bold">
                  Registrate
                </Link>{" "}
                o{" "}
                <Link to="/inicio-sesion" className="font-weight-bold">
                  inicia sesión
                </Link>{" "}
                para poder publicar
              </h3>
            </div>

            <MustLoginModal isShowing={isShowing} hide={toggle} />
          </React.Fragment>
        )}
      </main>
      {context.token ? <SimpleFooter page={"objeto-perdido"} /> : ""}
    </React.Fragment>
  );
};

export default NewItem;
