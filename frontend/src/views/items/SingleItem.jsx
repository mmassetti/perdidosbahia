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
import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  CardHeader,
  CardBody,
  Modal,
  Form,
  FormGroup,
  Input,
  Badge,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  ModalHeader
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import SingleItemQuestionExplain from "components/Helpers/SingleItemQuestionExplain";

var moment = require("moment");
require("moment/locale/es");

const SingleItem = props => {
  const [claimerAnswer, setClaimerAnswer] = useState("");
  const [claimerQuestion, setClaimerQuestion] = useState("");
  const [isToggled, setToggled] = useState(false);
  const [tabs, setTabs] = useState({ tab: 1 });

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setTabs({ tab: index });
  };

  let history = useHistory();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);

  const toggleClaimModal = () => {
    setToggled(!isToggled);
  };

  const cancelAnswer = () => {
    toggleClaimModal();
    setClaimerAnswer("");
    history.push({
      pathname: "/objetos-publicados"
    });
  };

  const handleClaimerAnswerChange = event => {
    setClaimerAnswer(event.target.value.toString());
  };

  const handleClaimerQuestionChange = event => {
    setClaimerQuestion(event.target.value.toString());
  };

  const handleSubmitModalForm = event => {
    console.log("TCL: event", event);
  };

  return (
    <>
      <DemoNavbar />
      <main className="profile-page">
        <section className="section-profile-cover section-shaped my-0">
          {/* Circles background */}
          <div className="shape shape-style-1 shape-default alpha-4">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew">
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
        <section className="section">
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/theme/team-4-800x800.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                  <Col
                    className="order-lg-3 text-lg-right align-self-lg-center"
                    lg="4"
                  >
                    <div className="card-profile-actions py-4 mt-lg-0">
                      <Button
                        className="float-right"
                        color="default"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Necesito ayuda
                      </Button>
                    </div>
                  </Col>
                  <Col className="order-lg-1" lg="4">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">
                          {props.location.state.props.category}
                        </span>
                        <span className="description">Categoría</span>
                      </div>
                      <div>
                        <span className="heading">
                          {" "}
                          {moment(props.location.state.props.date).format("L")}
                        </span>
                        <span className="description">Fecha</span>
                      </div>
                      {/* <div>
                        <span className="heading">
                          {props.location.state.props.category}
                        </span>
                        <span className="description">Categoría</span>
                      </div> */}
                    </div>
                  </Col>
                </Row>
                <div className="text-center mt-5">
                  <h3>Objeto {props.location.state.props.type}</h3>
                  {/* <div className="h6">
                    <i className="ni location_pin mr-2" />
                    {moment(props.location.state.props.date).format("LL")}
                  </div> */}
                  {/* <div className="h6 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    <span className="text-warning">Categoría</span> :{" "}
                    {props.location.state.props.category}
                  </div> */}
                  <div>
                    <i className="ni education_hat mr-2" />
                    <span className="text-primary font-weight-bold">
                      Ubicación
                    </span>{" "}
                    : {props.location.state.props.location}
                  </div>
                </div>
                <div className="mt-5 py-5 border-top text-center">
                  <Row className="justify-content-center">
                    <Col lg="4">
                      <p>{props.location.state.props.description}</p>
                      {/* <a href="#pablo" onClick={e => e.preventDefault()}>
                        Show more
                      </a> */}
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="px-lg-5 py-lg-5">
                <CardHeader className="bg-white pb-5">
                  <div className="btn-wrapper text-center">
                    <Button
                      color="primary"
                      size="sm"
                      onClick={toggleClaimModal}
                    >
                      <span className="btn-inner--text">
                        ¡Creo que encontré este objeto!
                      </span>
                    </Button>

                    <Modal
                      className="modal-dialog-centered"
                      size="sm"
                      isOpen={isToggled}
                      toggle={toggleClaimModal}
                    >
                      {/* //* If user that publicated the item gave a Question  */}

                      {props.location.state.props.ownerQuestion ? (
                        <>
                          <ModalHeader
                            className="text-default text-center mb-3"
                            toggle={toggleClaimModal}
                          >
                            <div className="text-center ">
                              Completá estos datos
                            </div>
                          </ModalHeader>
                          {/* <div className="text-center mt-5">
                            Completá estos datos
                          </div> */}
                          <div className="nav-wrapper">
                            <Nav
                              style={{ padding: "0.5rem" }}
                              className="nav-fill flex-column flex-md-row"
                              id="tabs-icons-text"
                              pills
                              role="tablist"
                            >
                              <NavItem>
                                <NavLink
                                  aria-selected={tabs.tab === 1}
                                  className={classnames("mb-sm-3 mb-md-0", {
                                    active: tabs.tab === 1
                                  })}
                                  onClick={e => e.preventDefault()}
                                  role="tab"
                                >
                                  <i className="ni ni-cloud-upload-96 mr-2" />
                                  Paso 1
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                  aria-selected={tabs.tab === 2}
                                  className={classnames("mb-sm-3 mb-md-0", {
                                    active: tabs.tab === 2
                                  })}
                                  onClick={e => e.preventDefault()}
                                  role="tab"
                                >
                                  <i className="ni ni-bell-55 mr-2" />
                                  Paso 2
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                  aria-selected={tabs === 3}
                                  className={classnames("mb-sm-3 mb-md-0", {
                                    active: tabs.tab === 3
                                  })}
                                  onClick={e => e.preventDefault()}
                                  role="tab"
                                >
                                  <i className="ni ni-calendar-grid-58 mr-2" />
                                  Paso 3
                                </NavLink>
                              </NavItem>
                            </Nav>
                          </div>

                          <Card className="shadow">
                            <CardBody>
                              <TabContent activeTab={"tabs" + tabs.tab}>
                                {/* //* Paso 1 */}
                                <TabPane tabId="tabs1">
                                  <div className="text-muted text-center mt-2 mb-3">
                                    <span
                                      className="h6 font-weight-bold"
                                      style={{ marginRight: "0.5rem" }}
                                    >
                                      Respuesta sobre el objeto
                                    </span>
                                    <SingleItemQuestionExplain />
                                  </div>

                                  <div className="text-center text-muted mb-4">
                                    <h6>
                                      Deberás contestar esta pregunta que dejó
                                      el usuario que perdió el objeto:
                                    </h6>
                                  </div>
                                  <div className="text-muted text-center mt-2 mb-3">
                                    <span className="h6 text-primary font-weight-bold ">
                                      {props.location.state.props.ownerQuestion}
                                    </span>
                                  </div>
                                  <Form role="form">
                                    {/* //* Answer to user question */}
                                    <FormGroup>
                                      <Input
                                        autoComplete="off"
                                        placeholder="Tu respuesta..."
                                        cols="80"
                                        rows="4"
                                        type="textarea"
                                        name="answer"
                                        value={claimerAnswer}
                                        onChange={handleClaimerAnswerChange}
                                      />
                                    </FormGroup>
                                    <div className="modal-footer">
                                      <Button
                                        color="primary"
                                        type="button"
                                        onClick={e => toggleNavs(e, 2)}
                                      >
                                        Continuar
                                      </Button>
                                      <Button
                                        className="ml-auto"
                                        color="link"
                                        data-dismiss="modal"
                                        type="button"
                                        onClick={toggleClaimModal}
                                      >
                                        Cancelar
                                      </Button>
                                    </div>
                                  </Form>
                                </TabPane>
                                {/* //* Paso 1 */}
                                <TabPane tabId="tabs2">
                                  <div className="text-muted text-center mt-2 mb-3">
                                    <span
                                      className="h6 font-weight-bold"
                                      style={{ marginRight: "0.5rem" }}
                                    >
                                      Pregunta sobre el objeto
                                    </span>
                                    <SingleItemQuestionExplain />
                                  </div>

                                  <div className="text-center text-muted mb-4">
                                    <h6>
                                      Te pedimos que escribas una pregunta sobre
                                      el objeto. La persona que realizó esta
                                      publicación deberá contestarla y te
                                      mostraremos su respuesta para que puedas
                                      verificar que realmente es quién perdió el
                                      objeto.
                                    </h6>
                                  </div>
                                  <Form role="form">
                                    {/* //* Create answer for other user */}
                                    <FormGroup>
                                      <Input
                                        autoComplete="off"
                                        placeholder="Escribí una pregunta. Ejemplos: Qué tipo de funda tiene el celular? Cómo es el estuche de los lentes? Qué fecha de nacimiento figura en el documento?"
                                        cols="80"
                                        rows="4"
                                        type="textarea"
                                        name="claimerQuestion"
                                        value={claimerQuestion}
                                        onChange={handleClaimerQuestionChange}
                                      />
                                    </FormGroup>
                                    <div className="modal-footer">
                                      <Button
                                        color="primary"
                                        type="button"
                                        onClick={e => toggleNavs(e, 3)}
                                      >
                                        Continuar
                                      </Button>
                                      <Button
                                        className="ml-auto"
                                        color="link"
                                        data-dismiss="modal"
                                        type="button"
                                        onClick={e => toggleNavs(e, 1)}
                                      >
                                        Volver al paso 1
                                      </Button>
                                    </div>
                                  </Form>
                                </TabPane>
                                {/* //* Paso 3 */}
                                <TabPane tabId="tabs3">
                                  <div className="text-muted text-center mt-2 mb-3">
                                    <span className="h6 font-weight-bold">
                                      Finalizar
                                    </span>
                                  </div>
                                  <p className="description">
                                    Enviaremos esta información al otro usuario
                                    y te notificaremos cuando haya novedades. Si
                                    todo va bien, podrás obtener el contacto del
                                    usuario que publicó el objeto
                                  </p>
                                  <Form role="form">
                                    {/* //* Confirmation of claim */}
                                    <div className="modal-footer">
                                      <Button
                                        color="primary"
                                        type="button"
                                        onClick={handleSubmitModalForm}
                                      >
                                        Finalizar
                                      </Button>
                                      <Button
                                        className="ml-auto"
                                        color="link"
                                        data-dismiss="modal"
                                        type="button"
                                        onClick={e => toggleNavs(e, 2)}
                                      >
                                        Volver al paso 2
                                      </Button>
                                    </div>
                                  </Form>
                                </TabPane>
                              </TabContent>
                            </CardBody>
                          </Card>
                        </>
                      ) : (
                        //*ELSE: If user that publicated the item DID NOT give a Question
                        <>
                          <div className="nav-wrapper">
                            <Nav
                              style={{ padding: "0.5rem" }}
                              className="nav-fill flex-column flex-md-row"
                              id="tabs-icons-text"
                              pills
                              role="tablist"
                            >
                              <NavItem>
                                <NavLink
                                  aria-selected={tabs.tab === 1}
                                  className={classnames("mb-sm-3 mb-md-0", {
                                    active: tabs.tab === 1
                                  })}
                                  onClick={e => e.preventDefault()}
                                  role="tab"
                                >
                                  <i className="ni ni-cloud-upload-96 mr-2" />
                                  Paso 1
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                  aria-selected={tabs.tab === 2}
                                  className={classnames("mb-sm-3 mb-md-0", {
                                    active: tabs.tab === 2
                                  })}
                                  onClick={e => e.preventDefault()}
                                  role="tab"
                                >
                                  <i className="ni ni-bell-55 mr-2" />
                                  Paso 2
                                </NavLink>
                              </NavItem>
                            </Nav>
                          </div>

                          <Card className="shadow">
                            <CardBody>
                              <TabContent activeTab={"tabs" + tabs.tab}>
                                <TabPane tabId="tabs1">
                                  <p className="description">
                                    Raw denim you probably haven't heard of them
                                    jean shorts Austin. Nesciunt tofu stumptown
                                    aliqua, retro synth master cleanse. Mustache
                                    cliche tempor, williamsburg carles vegan
                                    helvetica. Reprehenderit butcher retro
                                    keffiyeh dreamcatcher synth.
                                  </p>
                                  <p className="description">
                                    Raw denim you probably haven't heard of them
                                    jean shorts Austin. Nesciunt tofu stumptown
                                    aliqua, retro synth master cleanse.
                                  </p>
                                  <div className="modal-footer">
                                    <Button
                                      color="primary"
                                      type="button"
                                      onClick={e => toggleNavs(e, 2)}
                                    >
                                      Continuar
                                    </Button>
                                    <Button
                                      className="ml-auto"
                                      color="link"
                                      data-dismiss="modal"
                                      type="button"
                                      onClick={toggleClaimModal}
                                    >
                                      Volver
                                    </Button>
                                  </div>
                                </TabPane>
                                <TabPane tabId="tabs2">
                                  <p className="description">
                                    Cosby sweater eu banh mi, qui irure terry
                                    richardson ex squid. Aliquip placeat salvia
                                    cillum iphone. Seitan aliquip quis cardigan
                                    american apparel, butcher voluptate nisi
                                    qui.
                                  </p>
                                  <div className="modal-footer">
                                    <Button
                                      color="primary"
                                      type="button"
                                      onClick={e => toggleNavs(e, 3)}
                                    >
                                      Finalizar
                                    </Button>
                                    <Button
                                      className="ml-auto"
                                      color="link"
                                      data-dismiss="modal"
                                      type="button"
                                      onClick={toggleClaimModal}
                                    >
                                      Volver
                                    </Button>
                                  </div>
                                </TabPane>
                              </TabContent>
                            </CardBody>
                          </Card>
                        </>
                      )}

                      {/* <div className="modal-body p-0">
                        {props.location.state.props.question ? (
                          <Card className="bg-secondary shadow border-0">
                            <CardHeader className="bg-transparent pb-3">
                              <div className="text-muted text-center mt-2 mb-3">
                                <span className="h6 font-weight-bold ">
                                  Respuesta sobre el objeto
                                </span>
                              </div>
                            </CardHeader>
                            <CardBody className="px-lg-3 py-lg-3">
                              <div className="text-center text-muted mb-4">
                                <h6>
                                  Deberás contestar esta pregunta que dejó el
                                  usuario que perdió el objeto.
                                </h6>
                                <h3>
                                  <Badge
                                    className="text-uppercase"
                                    color="primary"
                                    pill
                                  >
                                    {props.location.state.props.question}
                                  </Badge>
                                </h3>
                              </div>
                              <Form role="form">
                                {/* //* Answer to user question */}
                      {/* <FormGroup>
                                  <Input
                                    autoComplete="off"
                                    placeholder="Tu respuesta..."
                                    cols="80"
                                    rows="4"
                                    type="textarea"
                                    name="answer"
                                    value={answer}
                                    onChange={handleAnswerChange}
                                  />
                                </FormGroup>
                                <div className="modal-footer">
                                  <Button
                                    color="primary"
                                    type="button"
                                    onClick={toggleClaimModal}
                                  >
                                    Enviar respuesta
                                  </Button>
                                  <Button
                                    className="ml-auto"
                                    color="link"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={toggleClaimModal}
                                  >
                                    Cancelar
                                  </Button>
                                </div>
                              </Form>
                            </CardBody>
                          </Card>
                        ) : (
                          <p>no cargo pregunta</p>
                        )}
                      </div> */}
                    </Modal>

                    <Button
                      className="btn-neutral btn-icon ml-1"
                      color="default"
                      onClick={cancelAnswer}
                      size="sm"
                    >
                      <span className="btn-inner--text">Volver</span>
                    </Button>
                  </div>
                </CardHeader>
              </div>
            </Card>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
};

export default SingleItem;
