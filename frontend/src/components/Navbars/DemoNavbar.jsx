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
import React from "react";
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

import AuthContext from "../../context/auth-context";

class DemoNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }

  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <>
        <AuthContext.Consumer>
          {context => {
            return (
              <header className="header-global">
                <Navbar
                  className="navbar-main navbar-transparent navbar-light headroom"
                  expand="lg"
                  id="navbar-main"
                >
                  <Container>
                    <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                      <img
                        alt="..."
                        src={require("assets/img/brand/argon-react-white.png")}
                      />
                    </NavbarBrand>
                    <button className="navbar-toggler" id="navbar_global">
                      <span className="navbar-toggler-icon" />
                    </button>
                    <UncontrolledCollapse navbar toggler="#navbar_global">
                      <div className="navbar-collapse-header">
                        <Row>
                          <Col className="collapse-brand" xs="6">
                            <Link to="/">
                              <img
                                alt="..."
                                src={require("assets/img/brand/argon-react.png")}
                              />
                            </Link>
                          </Col>
                          <Col className="collapse-close" xs="6">
                            <button
                              className="navbar-toggler"
                              id="navbar_global"
                            >
                              <span />
                              <span />
                            </button>
                          </Col>
                        </Row>
                      </div>
                      <Nav
                        className="navbar-nav-hover align-items-lg-center"
                        navbar
                      >
                        {/* Menu principal */}
                        <UncontrolledDropdown nav>
                          <DropdownToggle nav>
                            <i className="ni ni-ui-04 d-lg-none mr-1" />
                            <span className="nav-link-inner--text">
                              Menu principal
                            </span>
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-xl">
                            <div className="dropdown-menu-inner">
                              <Media
                                className="d-flex align-items-center"
                                to="/objeto-perdido"
                                tag={Link}
                              >
                                <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                                  <i className="ni ni-spaceship" />
                                </div>
                                <Media body className="ml-3">
                                  <h6 className="heading text-primary mb-md-1">
                                    Perdí algo
                                  </h6>
                                  <p className="description d-none d-md-inline-block mb-0">
                                    Perdí algo y quiero publicarlo
                                  </p>
                                </Media>
                              </Media>
                              <Media
                                className="d-flex align-items-center"
                                to="/objeto-encontrado"
                                tag={Link}
                              >
                                <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                                  <i className="ni ni-palette" />
                                </div>
                                <Media body className="ml-3">
                                  <h6 className="heading text-primary mb-md-1">
                                    Encontré algo
                                  </h6>
                                  <p className="description d-none d-md-inline-block mb-0">
                                    Encontré algo y quiero publicarlo
                                  </p>
                                </Media>
                              </Media>
                              <Media
                                className="d-flex align-items-center"
                                to="/objetos-publicados"
                                tag={Link}
                              >
                                <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                                  <i className="ni ni-ui-04" />
                                </div>
                                <Media body className="ml-3">
                                  <h5 className="heading text-warning mb-md-1">
                                    Objetos publicados
                                  </h5>
                                  <p className="description d-none d-md-inline-block mb-0">
                                    Quiero ver la lista de objetos perdidos y
                                    encontrados publicados
                                  </p>
                                </Media>
                              </Media>
                            </div>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                        {/* Ayuda */}
                        <UncontrolledDropdown nav>
                          <DropdownToggle nav>
                            <i className="ni ni-collection d-lg-none mr-1" />
                            <span className="nav-link-inner--text">Ayuda</span>
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem to="/landing-page" tag={Link}>
                              Tutorial
                            </DropdownItem>
                            <DropdownItem to="/profile-page" tag={Link}>
                              Redes sociales
                            </DropdownItem>
                            <DropdownItem to="/login-page" tag={Link}>
                              Contacto
                            </DropdownItem>
                            <DropdownItem to="/register-page" tag={Link}>
                              Otra ayuda
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Nav>
                      {/* Iniciar sesion */}
                      <Nav className="align-items-lg-center ml-lg-auto" navbar>
                        {!context.token && (
                          <NavItem className="d-none d-lg-block ml-lg-4">
                            <Button
                              className="btn-neutral btn-icon"
                              color="default"
                              to="/login-page"
                              tag={Link}
                            >
                              <span className="btn-inner--icon">
                                <i
                                  className="fa fa-sign-in mr-2"
                                  aria-hidden="true"
                                />
                              </span>
                              <span className="nav-link-inner--text ml-1">
                                Iniciar sesión
                              </span>
                            </Button>
                          </NavItem>
                        )}
                        {/* Cerrar sesion */}
                        {context.token && (
                          <NavItem className="d-none d-lg-block ml-lg-4">
                            <Button
                              className="btn-neutral btn-icon"
                              color="default"
                              onClick={context.logout}
                            >
                              <span className="btn-inner--icon">
                                <i
                                  className="fa fa-sign-out mr-2"
                                  aria-hidden="true"
                                />
                              </span>
                              <span className="nav-link-inner--text ml-1">
                                Cerrar sesión
                              </span>
                            </Button>
                          </NavItem>
                        )}
                      </Nav>
                    </UncontrolledCollapse>
                  </Container>
                </Navbar>
              </header>
            );
          }}
        </AuthContext.Consumer>
      </>
    );
  }
}

export default DemoNavbar;