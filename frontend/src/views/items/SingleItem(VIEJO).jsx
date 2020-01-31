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
import React, { useState, useEffect, useContext } from "react";

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
  Badge
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";
import { useHistory } from "react-router-dom";

import AuthContext from "../../context/auth-context";

import ModalSingleItem from "./SingleItem/ModalSingleItem";
import MustLoginModal from "../../components/Helpers/MustLoginModal";
var moment = require("moment");
require("moment/locale/es");

const SingleItem = props => {
  const [answer, setAnswer] = useState("");
  const [isToggled, setToggled] = useState(false);
  const context = useContext(AuthContext);

  let history = useHistory();

  useEffect(() => {
    console.log("TCL: props", props);
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);

  const toggleClaimModal = () => {
    setToggled(!isToggled);
    console.log("TCL: toggleClaimModal -> isToggled", isToggled);
  };

  const cancelAnswer = () => {
    toggleClaimModal();
    setAnswer("");
    console.log("voy a hacer el push");
    history.push({
      pathname: "/objetos-publicados"
    });
  };

  const handleAnswerChange = event => {
    setAnswer(event.target.value.toString());
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
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="text-center mt-5">
                  <h3>Objeto {props.location.state.props.type}</h3>
                  <div className="h6 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {moment(props.location.state.props.date).format("LL")}
                  </div>
                  <div className="h6 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Categoría: {props.location.state.props.category}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    Ubicación: {props.location.state.props.location}
                  </div>
                </div>
                <div className="mt-5 py-5 border-top text-center">
                  <Row className="justify-content-center">
                    <Col lg="9">
                      <p>{props.location.state.props.description}</p>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        Show more
                      </a>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="px-lg-5 py-lg-5">
                <CardHeader className="bg-white pb-5">
                  <div className="btn-wrapper text-center">
                    <Button color="primary" onClick={toggleClaimModal}>
                      <span className="btn-inner--text">
                        ¡Encontré este objeto!
                      </span>
                    </Button>

                    {isToggled && content.token && (
                      <ModalSingleItem toggleClaimModal={toggleClaimModal} />
                    )}
                    {isToggled && !content.token && <MustLoginModal />}

                    <Button
                      className="btn-neutral btn-icon ml-1"
                      color="default"
                      onClick={cancelAnswer}
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
