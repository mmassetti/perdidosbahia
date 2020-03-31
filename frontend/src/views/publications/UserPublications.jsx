/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect, useContext } from "react";

import Download from "../IndexSections/Download";
import CardsFooter from "../../components/Footers/CardsFooter";
import Spinner from "../../components/Spinner/Spinner";
import classnames from "classnames";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Col,
  Button,
  CardBody,
  NavItem,
  Nav,
  NavLink
} from "reactstrap";
// core components

import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import AuthContext from "../../context/auth-context";

const UserPublications = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tabs, setTabs] = useState({ tabs: 1 });

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);

  const toggleNavs = (e, state, index) => {
    e.preventDefault();
    setTabs({
      [state]: index
    });
  };

  return (
    <>
      <DemoNavbar />
      <main>
        <div className="position-relative">
          {/* shape Hero */}
          <section className="section section-sm, section-shaped">
            <div className="shape shape-style-1 shape-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="py-lg-md d-flex">
              <div className="col px-0">
                <Row>
                  <Col lg="12">
                    <h1 className="display-3 text-white">Tus publicaciones</h1>
                  </Col>
                </Row>
              </div>
            </Container>
          </section>
        </div>
        {/* Page content */}

        <Container>
          <Row className="justify-content-center" style={{ marginTop: "2rem" }}>
            <Col lg="12">
              {isLoading ? (
                <Spinner />
              ) : (
                <div className="nav-wrapper">
                  <Nav
                    className="nav-fill flex-column flex-md-row"
                    id="tabs-icons-text"
                    pills
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        aria-selected={tabs.tabs === 1}
                        className={classnames("mb-sm-3 mb-md-0", {
                          active: tabs.tabs === 1
                        })}
                        onClick={e => toggleNavs(e, "tabs", 1)}
                        href="#pablo"
                        role="tab"
                      >
                        <i className="ni ni-cloud-upload-96 mr-2" />
                        Mis objetos perdidos
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        aria-selected={tabs.tabs === 2}
                        className={classnames("mb-sm-3 mb-md-0", {
                          active: tabs.tabs === 2
                        })}
                        onClick={e => toggleNavs(e, "tabs", 2)}
                        href="#pablo"
                        role="tab"
                      >
                        <i className="ni ni-bell-55 mr-2" />
                        Mis objetos encontrados
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              )}
            </Col>
          </Row>
        </Container>
        {/* <Download /> */}
      </main>
      <CardsFooter />
    </>
  );
};

export default UserPublications;
