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
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Headroom from "headroom.js";
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
} from "reactstrap";

import AuthContext from "../../../common/providers/AuthProvider/auth-context";

const CustomNavbar = (props) => {
  useEffect(() => {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    headroom.init();
  });

  return (
    <React.Fragment>
      <AuthContext.Consumer>
        {(context) => {
          return (
            <header className="header-global">
              <Navbar
                className="navbar-main navbar-transparent navbar-light headroom"
                expand="lg"
                id="navbar-main"
              >
                <Container>
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
                              src={require("assets/img/logo-hamburger.jpg")}
                            />
                          </Link>
                        </Col>
                        <Col className="collapse-close" xs="6">
                          <button className="navbar-toggler" id="navbar_global">
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
                          <span className="nav-link-inner--text">
                            Menu principal
                          </span>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-xl">
                          <div className="dropdown-menu-inner">
                            <Media
                              className="d-flex align-items-center"
                              to="/objetos-publicados"
                              tag={Link}
                            >
                              <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                                <i className="ni ni-bullet-list-67" />
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
                            <Media
                              className="d-flex align-items-center"
                              to="/objeto-perdido"
                              tag={Link}
                            >
                              <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                                <i className="ni ni-notification-70" />
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
                                <i className="ni ni-like-2" />
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
                          </div>
                        </DropdownMenu>
                      </UncontrolledDropdown>

                      {/* Mis publicaciones */}
                      {context.token && (
                        <NavItem to="/mis-publicaciones" tag={Link}>
                          <NavLink>Mis publicaciones</NavLink>
                        </NavItem>
                      )}

                      {/* Ayuda */}
                      <UncontrolledDropdown nav>
                        <DropdownToggle nav>
                          <span className="nav-link-inner--text">Ayuda</span>
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem href="https://www.facebook.com/groups/1265778186835612">
                            Grupo de Facebook
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </Nav>
                    {/* Iniciar sesion */}
                    <Nav className="align-items-lg-center ml-lg-auto" navbar>
                      {!context.token && (
                        <NavItem>
                          <Button
                            className="btn-neutral btn-icon"
                            color="default"
                            to="/inicio-sesion"
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
                        <React.Fragment>
                          <NavItem>
                            <Button
                              className="btn-neutral btn-icon"
                              color="default"
                              style={{ marginBottom: "0.5rem" }}
                            >
                              <i
                                style={{ fontSize: "18px" }}
                                className="fa fa-user-circle text-primary "
                                aria-hidden="true"
                              ></i>
                              <span>{context.firstName}</span>
                            </Button>
                          </NavItem>

                          <NavItem to="/" tag={Link}>
                            <Button
                              className="btn-neutral btn-icon"
                              color="default"
                              onClick={context.logout}
                              style={{ marginBottom: "0.5rem" }}
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
                        </React.Fragment>
                      )}
                    </Nav>
                  </UncontrolledCollapse>
                </Container>
              </Navbar>
            </header>
          );
        }}
      </AuthContext.Consumer>
    </React.Fragment>
  );
};

export default CustomNavbar;
