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
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  ModalHeader,
} from "reactstrap";

import classnames from "classnames";
import SingleItemQuestionExplain from "../../../Helpers/SingleItemQuestionExplain";
import ContactInfo from "./helpers/ContactInfo";

const ModalThirdStep = ({ isShowing, hide, info }) => {
  const [tabs, setTabs] = useState({ tab: 1 });
  let history = useHistory();

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setTabs({ tab: index });
  };

  const handleSubmitModalForm = (e) => {
    const newStateForClaimer = "EnContacto";
    const newStateForItemCreator = "EnContacto";
    const newFlagClaimer = 1;
    const newFlagItemCreator = 1;

    let requestBody = {
      query: `
        mutation EditClaim($claimId: ID!, $newStateForClaimer: String!, $newStateForItemCreator: String!, $newFlagClaimer: Int!, $newFlagItemCreator: Int!) {
          editClaim(claimId: $claimId, newStateForClaimer: $newStateForClaimer, newStateForItemCreator: $newStateForItemCreator, newFlagClaimer: $newFlagClaimer, newFlagItemCreator: $newFlagItemCreator) {
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
          }
        }
      `,
      variables: {
        claimId: info.claimId,
        newStateForClaimer: newStateForClaimer,
        newStateForItemCreator: newStateForItemCreator,
        newFlagClaimer: newFlagClaimer,
        newFlagItemCreator: newFlagItemCreator,
      },
    };

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
                  <span style={{ marginRight: "0.5rem" }}>Último paso</span>
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
                </Nav>
              </div>

              <Card className="shadow">
                <CardBody>
                  <TabContent activeTab={"tabs" + tabs.tab}>
                    <TabPane tabId="tabs1">
                      <div className="text-muted text-center mt-2 mb-3">
                        <span className="h6 font-weight-bold">
                          La otra persona te respondió. Te recordamos tu
                          pregunta:
                        </span>
                      </div>

                      <div className="text-muted text-center mt-2 mb-3">
                        <span className="h6 text-primary font-weight-bold ">
                          {info.claimerQuestion}
                        </span>
                      </div>

                      <div className="text-muted text-center mt-2 mb-3">
                        <span className="h6 font-weight-bold">
                          Esta fue la respuesta que te dieron:
                        </span>
                      </div>
                      <div className="text-muted text-center mt-2 mb-3">
                        <span className="h6 text-primary font-weight-bold ">
                          {info.itemCreatorAnswer}
                        </span>
                      </div>
                      <Form role="form">
                        <div className="modal-footer">
                          <div className="text-muted text-center mt-2 mb-3">
                            <span className="h6 text-danger font-weight-bold">
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
                        <div className="text-center text-muted mb-4">
                          <h6>
                            ¡Listo! Ya le enviamos tus datos de contacto a la
                            otra persona y te dejamos los suyos:
                          </h6>
                        </div>
                      </div>

                      <ContactInfo
                        firstName={info.itemCreator.firstName}
                        lastName={info.itemCreator.lastName}
                        phoneNumber={info.itemCreator.phoneNumber}
                        email={info.itemCreator.email}
                      />

                      <Form role="form">
                        <div className="modal-footer">
                          <Button
                            color="primary"
                            type="button"
                            onClick={(e) => handleSubmitModalForm(e)}
                          >
                            Ok
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

export default ModalThirdStep;
