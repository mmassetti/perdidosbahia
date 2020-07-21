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

import CardsFooter from "../../theme/Footers/CardsFooter";
import Spinner from "../../theme/Spinner/Spinner";
import CustomNavbar from "../../theme/Navbars/CustomNavbar";
import AuthContext from "../../../context/auth-context";
import ClaimCard from "../../core/claims/ClaimCard";
import classnames from "classnames";
import MustLoginModal from "../Helpers/MustLoginModal";
import useModal from "../Helpers/useModal";

import {
  Card,
  Container,
  Row,
  Col,
  CardBody,
  NavItem,
  Nav,
  NavLink,
  TabPane,
  TabContent,
} from "reactstrap";

const UserClaims = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tabs, setTabs] = useState({ tabs: 1 });
  const [claims, setClaims] = useState({ claims: [] });
  const context = useContext(AuthContext);
  const [isToggled, setToggled] = useState(false);
  const { isShowing, toggle } = useModal();

  const fetchClaims = () => {
    setIsLoading(true);
    const requestBody = {
      query: `
          query {
            claims {
              _id  
              state
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
        `,
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        const claims = resData.data.claims;
        setClaims({ claims: claims });
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const deleteClaimHandler = (claimId) => {
    setIsLoading(true);
    const requestBody = {
      query: `
         mutation CancelClaim($id: ID!) {
            cancelClaim(claimId: $id) {
              _id
            }
          }
        `,
      variables: {
        id: claimId,
      },
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        const updatedValues = claims.claims.filter(
          (claim) => claim._id !== claimId
        );

        setClaims({ claims: updatedValues });

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchClaims();
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    toggle();
  }, []);

  const itemsUserIsOwner = claims.claims.map((claim) => {
    if (claim.item.creator._id == context.userId) {
      return (
        <ClaimCard
          key={claim._id}
          claimId={claim._id}
          claimState={claim.state}
          claimerUser={claim.claimerUser}
          authUserId={context.userId}
          item={claim.item}
          onDelete={deleteClaimHandler}
        ></ClaimCard>
      );
    }
  });

  const itemsUserIsClaimer = claims.claims.map((claim) => {
    if (claim.claimerUser._id == context.userId) {
      return (
        <ClaimCard
          key={claim._id}
          claimId={claim._id}
          claimerUser={claim.claimerUser}
          claimState={claim.state}
          authUserId={context.userId}
          item={claim.item}
        ></ClaimCard>
      );
    }
  });

  const toggleNavs = (e, state, index) => {
    e.preventDefault();
    setTabs({
      [state]: index,
    });
  };

  return (
    <>
      <CustomNavbar />

      {context.token ? (
        <main>
          <div className="position-relative">
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
                        Controlá el estado de las publicaciones que creaste o de
                        las que estás participando
                      </h1>
                    </Col>
                  </Row>
                </div>
              </Container>
            </section>
          </div>

          <Container>
            <Row
              className="justify-content-center"
              style={{ marginTop: "2rem" }}
            >
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
                              active: tabs.tabs === 1,
                            })}
                            onClick={(e) => toggleNavs(e, "tabs", 1)}
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
                              active: tabs.tabs === 2,
                            })}
                            onClick={(e) => toggleNavs(e, "tabs", 2)}
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
      ) : (
        //TODO : Extrar afuera lo que esta entre <main> </main> porque tambien se usa arriba
        <>
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
                  <div className="col px-0"></div>
                </Container>
              </section>
            </div>
          </main>

          <MustLoginModal isShowing={isShowing} hide={toggle} />
        </>
      )}

      <CardsFooter />
    </>
  );
};

export default UserClaims;
