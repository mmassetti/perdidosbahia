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

const ModalSecondStep = ({ isShowing, hide, info }) => {
  const [tabs, setTabs] = useState({ tab: 1 });
  const [itemCreatorAnswer, setItemCreatorAnswer] = useState("");
  let history = useHistory();

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setTabs({ tab: index });
  };

  const handleItemCreatorAnswerChange = (event) => {
    setItemCreatorAnswer(event.target.value.toString());
  };

  const handleSubmitModalForm = (e) => {
    const newStateForClaimer = "Es tu turno de responder";
    const newStateForItemCreator = "Esperando respuesta del otro usuario";
    const newFlagClaimer = 1;
    const newFlagItemCreator = 0;

    let requestBody = {
      query: `
        mutation EditClaim($claimId: ID!, $newStateForClaimer: String!, $newStateForItemCreator: String!, $newFlagClaimer: Int!, $newFlagItemCreator: Int!, $newItemCreatorAnswer: String!) {
          editClaim(claimId: $claimId, newStateForClaimer: $newStateForClaimer, newStateForItemCreator: $newStateForItemCreator, newFlagClaimer: $newFlagClaimer, newFlagItemCreator: $newFlagItemCreator, newItemCreatorAnswer: $newItemCreatorAnswer) {
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
            createdAt
            updatedAt
            claimerQuestion
            itemCreatorAnswer
          }
        }
      `,
      variables: {
        claimId: info.claimId,
        newStateForClaimer: newStateForClaimer,
        newStateForItemCreator: newStateForItemCreator,
        newFlagClaimer: newFlagClaimer,
        newFlagItemCreator: newFlagItemCreator,
        newItemCreatorAnswer: itemCreatorAnswer,
      },
    };

    setItemCreatorAnswer("");

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + info.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((res) => {
        history.push({
          pathname: "/",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [handleSubmitModalForm]);

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
                      <i className="ni ni-bell-55 mr-2" />
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
                      <i className="ni ni-chat-round mr-2" />
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
                      <i className="ni ni-send mr-2" />
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
                          Alguién te respondió. Te recordamos tu pregunta:
                        </span>
                      </div>

                      <div className="text-muted text-center mt-2 mb-3">
                        <span className="h6 text-primary font-weight-bold ">
                          {info.item.itemCreatorQuestion}
                        </span>
                      </div>

                      <div className="text-muted text-center mt-2 mb-3">
                        <span className="h6 font-weight-bold">
                          Esta fue la respuesta que te dieron:
                        </span>
                      </div>
                      <div className="text-muted text-center mt-2 mb-3">
                        <span className="h6 text-primary font-weight-bold ">
                          {info.claimerAnswer}
                        </span>
                      </div>
                      <Form role="form">
                        <div className="modal-footer">
                          <div className="text-muted text-center mt-2 mb-3">
                            <span className="h6 text-warning font-weight-bold">
                              ¿Estás de acuerdo con la respuesta?
                            </span>
                          </div>
                          <Button
                            color="primary"
                            type="button"
                            onClick={(e) => toggleNavs(e, 2)}
                          >
                            Si
                          </Button>
                          <Button
                            className="ml-auto"
                            color="link"
                            data-dismiss="modal"
                            type="button"
                            onClick={hide}
                          >
                            No
                          </Button>
                          {/* TODO: BLOQUEAR CLAIM PARA EL CLAIMER*/}
                        </div>
                      </Form>
                    </TabPane>
                    <TabPane tabId="tabs2">
                      <div className="text-muted text-center mt-2 mb-3">
                        <span className="h6 font-weight-bold">
                          Ahora es tu turno
                        </span>
                      </div>

                      <div className="text-center text-muted mb-4">
                        <h6>
                          Te toca responder su pregunta. De esta forma
                          aseguramos que ambas partes esten de acuerdo para
                          ponerse en contacto.
                        </h6>
                        <h6>¡Este es el último paso!</h6>
                      </div>
                      <div className="text-muted text-center mt-2 mb-3">
                        <span className="h6 text-primary font-weight-bold ">
                          {info.claimerQuestion}
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
                            value={itemCreatorAnswer}
                            onChange={handleItemCreatorAnswerChange}
                          />
                        </FormGroup>
                        <div className="modal-footer">
                          <Button
                            color="primary"
                            type="button"
                            disabled={itemCreatorAnswer ? false : true}
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
                        <span className="h6 font-weight-bold">Último paso</span>
                      </div>
                      <div className="text-center text-muted mb-4">
                        <h6>
                          Enviaremos esta información al otro usuario y te
                          notificaremos cuando haya novedades. Si todo va bien
                          podrás obtener el contacto de la otra persona.
                        </h6>
                        <h6>¡Este es el último paso!</h6>
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

export default ModalSecondStep;
