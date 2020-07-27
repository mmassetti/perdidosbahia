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
import AuthContext from "../../../common/providers/AuthProvider/auth-context";
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

const UserClaims = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [claims, setClaims] = useState({ claims: [] });
  const context = useContext(AuthContext);
  const { isShowing, toggle } = useModal();

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
                itemCreatorQuestion
                creator {
                  _id
                  email
                }
              }
              itemCreator {
                _id
                email
              }
              itemClaimer {
                _id
                email
              }
              stateForClaimer
              stateForItemCreator
              flagClaimer
              flagItemCreator
              claimerQuestion
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
    if (context.token) {
      fetchClaims();
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    toggle();
  }, [context]);

  const itemsAuthUserIsParticipating = claims.claims.map((claim) => {
    return (
      <ClaimCard
        key={claim._id}
        claimId={claim._id}
        itemCreator={claim.itemCreator}
        itemClaimer={claim.itemClaimer}
        authUserId={context.userId}
        token={context.token}
        item={claim.item}
        stateForClaimer={claim.stateForClaimer}
        stateForItemCreator={claim.stateForItemCreator}
        flagClaimer={claim.flagClaimer}
        flagItemCreator={claim.flagItemCreator}
        onDelete={deleteClaimHandler}
      ></ClaimCard>
    );
  });

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
                        Controlá el estado de las publicaciones en las que estás
                        participando
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
                    <Card className="shadow">
                      <CardBody>
                        <Row className="row-grid">
                          {itemsAuthUserIsParticipating}
                        </Row>
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
          <div className="text-center mt-5">
            <h3>
              Para poder ver tus publicaciones primero tenés que iniciar sesión.
            </h3>
          </div>
          <h1 className="display-3 text-center"></h1>

          <MustLoginModal isShowing={isShowing} hide={toggle} />
        </>
      )}
    </>
  );
};

export default UserClaims;
