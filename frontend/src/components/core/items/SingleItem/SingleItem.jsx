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
import GetActionForTypeOfItem from "./GetActionForTypeOfItem";

var moment = require("moment");
require("moment/locale/es");

const SingleItem = (props) => {
  console.log("SingleItem -> props", props);
  const { isShowing, toggle } = useModal();
  const context = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);

  const goBack = () => {
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

  // const getActionForTypeOfItem = getActionForTypeOfItem(
  //   props.location.state.props.type
  // );

  const showItemAttributes = () => {
    return (
      <div className="px-4">
        <Row className="justify-content-center">
          <Col className="order-lg-2" lg="3"></Col>
          <Col className="order-lg-3 text-lg-right align-self-lg-center" lg="4">
            {" "}
            <div className="card-profile-actions py-4 mt-lg-0 float-right">
              <span className="h6 font-weight-bold">
                Publicado el{" "}
                {moment(props.location.state.props.createdAt).format("L")}
              </span>
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
                <span className="description">
                  {props.location.state.props.type === "perdido"
                    ? "Fecha en la que se perdió "
                    : "Fecha en la que se encontró "}
                </span>
              </div>
            </div>
          </Col>
        </Row>
        <div className="text-center mt-5">
          <h3>Objeto {props.location.state.props.type}</h3>

          <div>
            <i className="ni education_hat mr-2" />
            <span className="text-default font-weight-bold">
              Ubicación
            </span> : {props.location.state.props.location}
          </div>
        </div>
        <div className="mt-3 py-3 border-top text-center">
          <Row className="justify-content-center">
            <Col lg="4">
              <div className="text-muted text-center mt-2 mb-3">
                <span className="h6 font-weight-bold">
                  Descripción del objeto
                </span>
              </div>
              <p>{props.location.state.props.description}</p>
            </Col>
          </Row>
        </div>
      </div>
    );
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
                  {showItemAttributes()}

                  <div className="px-lg-5 py-lg-5">
                    <CardHeader className="bg-white pb-5">
                      <div className="btn-wrapper text-center">
                        {!loggedUserIsItemCreator() ? (
                          <GetActionForTypeOfItem
                            itemType={props.location.state.props.type}
                            onToggle={toggle}
                          />
                        ) : (
                          ""
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
                          type="button"
                          size="sm"
                          color="default"
                          onClick={goBack}
                          style={{ marginBottom: "0.5rem" }}
                        >
                          Volver a objetos publicados
                        </Button>
                      </div>
                    </CardHeader>
                  </div>
                </Card>
              </Container>
            </section>
          </main>

          <SimpleFooter page={"detalle"} />
        </React.Fragment>
      ) : (
        <p className="text-muted text-center mb-3">llevar a 404</p>
      )}
    </>
  );
};

export default SingleItem;
