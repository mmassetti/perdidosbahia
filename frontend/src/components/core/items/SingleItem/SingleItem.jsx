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
import React, { useEffect, useContext } from "react";

import { Button, Card, Container, Row, Col, CardHeader } from "reactstrap";

import CustomNavbar from "../../../theme/Navbars/CustomNavbar.jsx";
import SimpleFooter from "../../../theme/Footers/SimpleFooter";
import { useHistory } from "react-router-dom";
import AuthContext from "../../../../common/providers/AuthProvider/auth-context";
import ModalFirstStep from "../SingleItem/modals/ModalFirstStep";
import MustLoginModal from "../../../core/Helpers/MustLoginModal";
import useModal from "../../../core/Helpers/useModal";

var moment = require("moment");
require("moment/locale/es");

const SingleItem = (props) => {
  const { isShowing, toggle } = useModal();
  const context = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);

  const cancelAnswer = () => {
    toggle();
    history.push({
      pathname: "/objetos-publicados",
    });
  };

  function loggedUserIsItemCreator() {
    return (
      props.location.state.props.creatorId ===
        props.location.state.props.authUserId && context.token
    );
  }

  const getActionForTypeOfItem = () => {
    let itemType = props.location.state.props.type;
    if (itemType == "perdido") {
      return (
        <Button color="primary" size="sm" onClick={toggle}>
          <span className="btn-inner--text">
            ¡Creo que encontré este objeto!
          </span>
        </Button>
      );
    } else if (itemType == "encontrado") {
      return (
        <Button color="primary" size="sm" onClick={toggle}>
          <span className="btn-inner--text">¡Este objeto es mío!</span>
        </Button>
      );
    }
  };

  return (
    <>
      {props.location.state ? (
        <React.Fragment>
          <CustomNavbar />
          <main className="profile-page">
            <section className="section-profile-cover section-shaped my-0">
              <div className="shape shape-style-1 shape-default alpha-4">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="separator separator-bottom separator-skew">
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
            <section className="section">
              <Container>
                <Card className="card-profile shadow mt--300">
                  <div className="px-4">
                    <Row className="justify-content-center">
                      <Col className="order-lg-2" lg="3">
                        <div className="card-profile-image">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
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
                            onClick={(e) => e.preventDefault()}
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
                              {moment(props.location.state.props.date).format(
                                "L"
                              )}
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
                        {loggedUserIsItemCreator() ? (
                          <Button color="primary" size="sm" onClick={toggle}>
                            <span className="btn-inner--text">
                              Editar publicación
                            </span>
                          </Button>
                        ) : (
                          getActionForTypeOfItem()
                        )}

                        {context.token ? (
                          <ModalFirstStep
                            isShowing={isShowing}
                            hide={toggle}
                            itemCreatorQuestion={
                              props.location.state.props.itemCreatorQuestion
                            }
                            itemId={props.location.state.props.id}
                            token={context.token}
                          />
                        ) : (
                          <MustLoginModal isShowing={isShowing} hide={toggle} />
                        )}

                        <Button
                          className="btn-neutral btn-icon ml-1"
                          color="default"
                          onClick={cancelAnswer}
                          size="sm"
                        >
                          <span className="btn-inner--text">
                            Volver a objetos publicados
                          </span>
                        </Button>
                      </div>
                    </CardHeader>
                  </div>
                </Card>
              </Container>
            </section>
          </main>

          <SimpleFooter />
        </React.Fragment>
      ) : (
        <p className="text-muted text-center mb-3">llevar a 404</p>
      )}
    </>
  );
};

export default SingleItem;
