import React, { useState, useContext } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Modal,
  Form,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  ModalHeader
} from "reactstrap";

import classnames from "classnames";
import SingleItemQuestionExplain from "components/Helpers/SingleItemQuestionExplain";
import AuthContext from "../../../context/auth-context";

const ModalSingleItem = props => {
  const [claimerAnswer, setClaimerAnswer] = useState("");
  const [claimerQuestion, setClaimerQuestion] = useState("");
  const [tabs, setTabs] = useState({ tab: 1 });
  const [isToggled, setToggled] = useState(false);
  const context = useContext(AuthContext);

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setTabs({ tab: index });
  };

  const toggleClaimModal = () => {
    setToggled(!isToggled);
  };

  const handleClaimerAnswerChange = event => {
    setClaimerAnswer(event.target.value.toString());
  };

  const handleClaimerQuestionChange = event => {
    setClaimerQuestion(event.target.value.toString());
  };

  const handleSubmitModalForm = () => {
    toggleClaimModal();
    setClaimerQuestion("");
    setClaimerAnswer("");
    console.log("TCL: claimerAnswer", claimerAnswer);
    console.log("TCL: claimerQuestion", claimerQuestion);
    console.log("TCL: itemId: ", props.location.state.props.id);
    let requestBody = {
      query: `
          mutation {
            claimItem(
              itemId: "${props.location.state.props.id}"
            ) {
              _id
              createdAt
              updatedAt
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
              <div className="text-center">
                <span style={{ marginRight: "0.5rem" }}>
                  Completá estos datos
                </span>
                <SingleItemQuestionExplain />
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
                      <span className="h6 font-weight-bold">
                        Respuesta sobre el objeto
                      </span>
                    </div>

                    <div className="text-center text-muted mb-4">
                      <h6>
                        Deberás contestar esta pregunta que dejó el usuario que
                        perdió el objeto:
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
                      <span className="h6 font-weight-bold">
                        Pregunta sobre el objeto
                      </span>
                    </div>

                    <div className="text-center text-muted mb-4">
                      <h6>
                        Te pedimos que escribas una pregunta sobre el objeto. La
                        persona que realizó esta publicación deberá contestarla
                        y te mostraremos su respuesta para que puedas verificar
                        que realmente es quién perdió el objeto.
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
                      <span className="h6 font-weight-bold">Último paso</span>
                    </div>
                    <p className="description">
                      Enviaremos esta información al otro usuario y te
                      notificaremos cuando haya novedades. Si todo va bien,
                      podrás obtener el contacto del usuario que publicó el
                      objeto
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
                      Raw denim you probably haven't heard of them jean shorts
                      Austin. Nesciunt tofu stumptown aliqua, retro synth master
                      cleanse. Mustache cliche tempor, williamsburg carles vegan
                      helvetica. Reprehenderit butcher retro keffiyeh
                      dreamcatcher synth.
                    </p>
                    <p className="description">
                      Raw denim you probably haven't heard of them jean shorts
                      Austin. Nesciunt tofu stumptown aliqua, retro synth master
                      cleanse.
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
                      Cosby sweater eu banh mi, qui irure terry richardson ex
                      squid. Aliquip placeat salvia cillum iphone. Seitan
                      aliquip quis cardigan american apparel, butcher voluptate
                      nisi qui.
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
      </Modal>
    </>
  );
};

export default ModalSingleItem;
