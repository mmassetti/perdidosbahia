import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";

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
  ModalHeader,
} from "reactstrap";

import classnames from "classnames";
import SingleItemQuestionExplain from "../../../Helpers/SingleItemQuestionExplain";

const ModalFirstStep = ({
  isShowing,
  hide,
  itemCreatorQuestion,
  itemId,
  token,
}) => {
  const [tabs, setTabs] = useState({ tab: 1 });
  const [claimerAnswer, setClaimerAnswer] = useState("");
  const [claimerQuestion, setClaimerQuestion] = useState("");
  let history = useHistory();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    setTabs({ tab: 1 });
  }, []);

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setTabs({ tab: index });
  };

  const handleClaimerAnswerChange = (event) => {
    setClaimerAnswer(event.target.value.toString());
  };

  const handleClaimerQuestionChange = (event) => {
    setClaimerQuestion(event.target.value.toString());
  };

  const handleSubmitModalForm = (e) => {
    let requestBody = {
      query: `
        mutation CreateClaim($id: ID!,$claimerQuestion: String!,$claimerAnswer: String!) {
          createClaim(itemId: $id, claimerQuestion: $claimerQuestion, claimerAnswer: $claimerAnswer) {
            _id
            itemClaimer {
              email
            }
            itemCreator {
              email
            }
            item { 
              description
            }
            stateForClaimer
            stateForItemCreator
            flagClaimer
            flagItemCreator
            claimerQuestion
            claimerAnswer
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        id: itemId,
        claimerQuestion: claimerQuestion,
        claimerAnswer: claimerAnswer,
      },
    };

    setClaimerQuestion("");
    setClaimerAnswer("");

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
        history.push({
          pathname: "/mis-publicaciones",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <Modal
            className="modal-dialog-centered"
            size="sm"
            isOpen={isShowing}
            toggle={hide}
          >
            <React.Fragment>
              <ModalHeader
                className="text-default text-center mb-2"
                toggle={hide}
              >
                <div className="text-center">
                  <span style={{ marginRight: "0.5rem" }}>
                    Completá estos datos
                  </span>
                  <SingleItemQuestionExplain />
                </div>
              </ModalHeader>
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
                        active: tabs.tab === 1,
                      })}
                      onClick={(e) => e.preventDefault()}
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
                        active: tabs.tab === 2,
                      })}
                      onClick={(e) => e.preventDefault()}
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
                        active: tabs.tab === 3,
                      })}
                      onClick={(e) => e.preventDefault()}
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
                    <TabPane tabId="tabs1">
                      <div className="text-muted text-center mt-2 mb-3">
                        <span className="h6 font-weight-bold">
                          Respuesta sobre el objeto
                        </span>
                      </div>

                      <div className="text-center text-muted mb-4">
                        <h6>
                          Deberás contestar esta pregunta que dejó el usuario
                          que publicó el objeto:
                        </h6>
                      </div>
                      <div className="text-muted text-center mt-2 mb-3">
                        <span className="h6 text-primary font-weight-bold ">
                          {itemCreatorQuestion}
                        </span>
                      </div>
                      <Form role="form">
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
                            disabled={claimerAnswer ? false : true}
                            onClick={(e) => toggleNavs(e, 2)}
                          >
                            Continuar
                          </Button>
                          <Button
                            className="ml-auto"
                            color="link"
                            data-dismiss="modal"
                            type="button"
                            onClick={hide}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </Form>
                    </TabPane>
                    <TabPane tabId="tabs2">
                      <div className="text-muted text-center mt-2 mb-3">
                        <span className="h6 font-weight-bold">
                          Pregunta sobre el objeto
                        </span>
                      </div>

                      <div className="text-center text-muted mb-4">
                        <h6>
                          Te pedimos que escribas una pregunta sobre el objeto.
                          La persona que realizó esta publicación deberá
                          contestarla y te mostraremos su respuesta para que
                          puedas verificar su identidad.
                        </h6>
                      </div>
                      <Form role="form">
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
                            disabled={claimerQuestion ? false : true}
                            onClick={(e) => toggleNavs(e, 3)}
                          >
                            Continuar
                          </Button>
                          <Button
                            className="ml-auto"
                            color="link"
                            data-dismiss="modal"
                            type="button"
                            onClick={(e) => toggleNavs(e, 1)}
                          >
                            Volver
                          </Button>
                        </div>
                      </Form>
                    </TabPane>
                    <TabPane tabId="tabs3">
                      <div className="text-muted text-center mt-2 mb-3">
                        <span className="h6 font-weight-bold">
                          Ya falta menos...
                        </span>
                      </div>
                      <div className="text-center text-muted mb-4">
                        <h6>
                          Enviaremos esta información al otro usuario y te
                          notificaremos cuando haya novedades. Si todo va bien,
                          podrás obtener el contacto del usuario que publicó el
                          objeto
                        </h6>
                      </div>

                      <Form role="form">
                        <div className="modal-footer">
                          <Button
                            color="primary"
                            type="button"
                            onClick={(e) => handleSubmitModalForm(e)}
                          >
                            Confirmar
                          </Button>
                          <Button
                            className="ml-auto"
                            color="link"
                            data-dismiss="modal"
                            type="button"
                            onClick={(e) => toggleNavs(e, 2)}
                          >
                            Volver
                          </Button>
                        </div>
                      </Form>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </React.Fragment>
          </Modal>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default ModalFirstStep;
