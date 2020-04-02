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

import Download from "../../theme/IndexSections/Download";
import CardsFooter from "../../theme/Footers/CardsFooter";
import Spinner from "../../theme/Spinner/Spinner";
import DemoNavbar from "../../theme/Navbars/DemoNavbar";
import AuthContext from "../../../context/auth-context";
import ClaimCard from "../../core/claims/ClaimCard";
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
  NavLink,
  TabPane,
  TabContent
} from "reactstrap";
// core components

const UserClaims = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tabs, setTabs] = useState({ tabs: 1 });
  const [claims, setClaims] = useState({ claims: [] });
  const context = useContext(AuthContext);

  const itemsUserIsOwner = claims.claims.map(claim => {
    console.log("UserClaims -> claim ", claim);

    if (claim.item.creator._id == context.userId) {
      return (
        <ClaimCard
          key={claim._id}
          claimerUser={claim.claimerUser}
          authUserId={context.userId}
          item={claim.item}
        ></ClaimCard>
      );
    }
  });

  const itemsUserIsClaimer = claims.claims.map(claim => {
    if (claim.claimerUser._id == context.userId) {
      return (
        <ClaimCard
          key={claim._id}
          claimerUser={claim.claimerUser}
          authUserId={context.userId}
          item={claim.item}
        ></ClaimCard>
      );
    }
  });

  const fetchClaims = () => {
    setIsLoading(true);
    const requestBody = {
      query: `
          query {
            claims {
              _id  
              item {
                description
                category
                description
                type
                date
                location
                ownerQuestion
                creator {
                  _id
                  email
                }
              }
              claimerUser {
                _id
                email
              }
            }
          }
        `
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        const claims = resData.data.claims;
        setClaims({ claims: claims });
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchClaims();
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
                    <h1 className="display-3 text-white">
                      En esta seccion aparecen las publicaciones que fueron
                      creadas por vos o bien por otra persona y estes
                      participando
                    </h1>
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
                <>
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
                          Publicaciones creadas por mi
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
                          Publicaciones creadas por otra persona
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>

                  <Card className="shadow">
                    <CardBody>
                      <TabContent activeTab={"tabs" + tabs.tabs}>
                        <TabPane tabId="tabs1">
                          <Row className="row-grid">{itemsUserIsOwner}</Row>
                        </TabPane>
                        <TabPane tabId="tabs2">
                          <Row className="row-grid">{itemsUserIsClaimer}</Row>
                        </TabPane>
                      </TabContent>
                    </CardBody>
                  </Card>
                </>
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

export default UserClaims;
