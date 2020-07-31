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

import Spinner from "../../theme/Spinner/Spinner";
import CustomNavbar from "../../theme/Navbars/CustomNavbar";
import AuthContext from "../../../common/providers/AuthProvider/auth-context";
import ClaimCard from "../../core/claims/ClaimCard";
import MustLoginModal from "../Helpers/MustLoginModal";
import useModal from "../Helpers/useModal";

import { Card, Container, Row, Col, CardBody, Badge, Button } from "reactstrap";
var moment = require("moment");
require("moment/locale/es");

const UserClaims = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [claims, setClaims] = useState({ claims: [] });
  const [notifications, setNotifications] = useState({ notifications: [] });
  const context = useContext(AuthContext);
  const { isShowing, toggle } = useModal();
  const [cleanedNotifications, setCleanedNotifications] = useState(false);

  const fetchClaims = () => {
    setIsLoading(true);
    const requestBody = {
      query: `
          query {
            claims {
              _id  
              item {
                _id
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
                firstName
                lastName
                phoneNumber
              }
              itemClaimer {
                _id
                email
                firstName
                lastName
                phoneNumber
              }
              stateForClaimer
              stateForItemCreator
              flagClaimer
              flagItemCreator
              claimerQuestion
              claimerAnswer
              itemCreatorAnswer
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
        if (claims.length == 0) {
          getNotifications();
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const getNotifications = () => {
    setIsLoading(true);
    const requestBody = {
      query: `
        query {
          userNotifications{
            _id,
            description,
            itemInvolved {
                _id,
                description,
                category
            },
            itemInfo {
              _id,
              description,
              category
            }
            userToNotify {
                _id,
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
        const userNotifications = resData.data.userNotifications;
        setNotifications({ notifications: userNotifications });
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
         mutation CancelClaim($id: ID!, $notificationDescription: String!) {
            cancelClaim(claimId: $id, notificationDescription: $notificationDescription) {
              _id,
              description
              category
            }
          }
        `,
      variables: {
        id: claimId,
        notificationDescription:
          "Lo sentimos, el otro usuario rechazó el contacto para este objeto:",
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

  function deleteNotifications() {
    setIsLoading(true);

    notifications.notifications.map((notification, index) => {
      const requestBody = {
        query: `
           mutation DeleteNotification($notificationId: ID!) {
              deleteNotification(notificationId: $notificationId)
            }
          `,
        variables: {
          notificationId: notification._id,
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
          setCleanedNotifications(true);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    });
  }

  const notificationItemCategory = (notification) => {
    if (
      notification.itemInvolved &&
      notification.itemInvolved.category != "otro"
    ) {
      return notification.itemInvolved.category;
    } else if (notification.itemInvolved) {
      return "Otros objetos";
    } else if (notification.itemInfo && notification.itemInfo.category) {
      return notification.itemInfo.category;
    } else return "Error al mostrar la categoria del objeto";
  };

  const notificationItemDescription = (notification) => {
    if (notification.itemInvolved && notification.itemInvolved.description) {
      return notification.itemInvolved.description;
    } else if (notification.itemInfo && notification.itemInfo.description) {
      return notification.itemInfo.description;
    } else return "Error al mostrar la descripción del objeto";
  };

  const showNotifications = () => {
    return notifications.notifications.map((notification, index) => {
      return (
        <Card
          key={index}
          className="card-lift--hover shadow border-0"
          style={{ marginBottom: "2rem" }}
        >
          <CardBody className="py-5">
            <h6 className="text-warning font-weight-light mb-2">
              {notification.description}
            </h6>

            <h6 className="text-default ">
              <span className="font-weight-bold"> Categoría: </span>
              {notificationItemCategory(notification)}
            </h6>
            <h6 className="text-default ">
              <span className="font-weight-bold"> Descripción: </span>{" "}
              {notificationItemDescription(notification)}
            </h6>
          </CardBody>
        </Card>
      );
    });
  };

  useEffect(() => {
    if (context.token) {
      fetchClaims();
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    toggle();
    setCleanedNotifications(false);
  }, [context, setCleanedNotifications]);

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
        claimerQuestion={claim.claimerQuestion}
        claimerAnswer={claim.claimerAnswer}
        itemCreatorAnswer={claim.itemCreatorAnswer}
        onDelete={deleteClaimHandler}
      ></ClaimCard>
    );
  });

  const showContent = () => {
    if (isLoading) {
      return <Spinner />;
    } else if (claims.claims && claims.claims.length > 0) {
      return (
        <Card className="shadow">
          <CardBody>
            <Row className="row-grid">{itemsAuthUserIsParticipating}</Row>
          </CardBody>
        </Card>
      );
    } else if (
      notifications.notifications &&
      notifications.notifications.length > 0 &&
      !cleanedNotifications
    ) {
      return (
        <React.Fragment>
          <Col className="text-center mt-5" lg="12">
            {showNotifications()}
            <Button
              className="mt-4"
              color="primary"
              onClick={() => deleteNotifications()}
            >
              Volver a mis publicaciones
            </Button>
          </Col>
        </React.Fragment>
      );
    } else {
      return (
        <div className="text-center mt-5">
          <h3>Todavía no iniciaste contacto con ninguna persona</h3>
        </div>
      );
    }
  };

  return (
    <>
      <CustomNavbar />

      {context.token ? (
        <React.Fragment>
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
                          Controlá el estado de las publicaciones en las que
                          estás participando
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
                style={{ marginTop: "2rem", marginBottom: "2rem" }}
              >
                <Col lg="12">{showContent()}</Col>
              </Row>
            </Container>
            {/* <Download /> */}
          </main>
        </React.Fragment>
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
