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

import Spinner from "../../../theme/Spinner/Spinner";
import CustomNavbar from "../../../theme/Navbars/CustomNavbar";
import AuthContext from "../../../../common/providers/AuthProvider/auth-context";
import ClaimCard from "../ClaimCard";
import MustLoginModal from "../../Helpers/MustLoginModal";
import useModal from "../../Helpers/useModal";
import { Link } from "react-router-dom";

import { Card, Container, Row, Col, CardBody, Badge, Button } from "reactstrap";
import SimpleFooter from "components/theme/Footers/SimpleFooter";
import confirm from "reactstrap-confirm";
import AlertMessage from "../../Helpers/Alerts/AlertMessage";
import getUserClaimsQuery from "./queries/getUserClaimsQuery";
import getUserItemsWithoutClaimsQuery from "./queries/getUserItemsWithoutClaimQuery";
import getNotificationsQuery from "./queries/getNotificationsQuery";
import getDeleteItemQuery from "./queries/getDeleteItemQuery";
import getDeleteClaimQuery from "./queries/getDeleteClaimQuery";
import getDeleteNotificationQuery from "./queries/getDeleteNotificationQuery";
import ShowNotifications from "./contentShower/ShowNotifications";

var moment = require("moment");
require("moment/locale/es");

const UserClaims = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userItemsWithoutClaim, setUserItemsWithoutClaim] = useState({
    items: [],
  });
  const [claims, setClaims] = useState({ claims: [] });
  const [notifications, setNotifications] = useState({ notifications: [] });
  const context = useContext(AuthContext);
  const { isShowing, toggle } = useModal();
  const [cleanedNotifications, setCleanedNotifications] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const fetchUserItemsWithoutClaim = () => {
    setIsLoading(true);
    const requestBody = getUserItemsWithoutClaimsQuery();

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
        const items = resData.data.userItemsWithoutClaim;
        setUserItemsWithoutClaim({ items: items });
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const fetchClaims = () => {
    setIsLoading(true);
    const requestBody = getUserClaimsQuery();

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
        getNotifications();
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const getNotifications = () => {
    setIsLoading(true);
    const requestBody = getNotificationsQuery();

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

  const deleteItemHandler = async (itemId) => {
    let result = await confirm({
      title: <span className="text-danger font-weight-bold">¡Atención!</span>,
      message: "Estás a punto de eliminar tu publicación",
      confirmText: "Eliminar",
      cancelText: "Cancelar",
      confirmColor: "danger",
      cancelColor: "default",
    });

    const requestBody = getDeleteItemQuery(itemId);

    if (result) {
      setIsLoading(true);
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
            setShowErrorAlert(true);
          }
          return res.json();
        })
        .then((resData) => {
          const updatedValues = userItemsWithoutClaim.items.filter(
            (item) => item._id !== itemId
          );
          setUserItemsWithoutClaim({ items: updatedValues });
          setIsLoading(false);
          setShowSuccessAlert(true);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setShowErrorAlert(true);
        });
    }
  };

  const deleteClaimHandler = async (claimId, alertMsg) => {
    let result = await confirm({
      title: <span className="text-danger font-weight-bold">¡Atención!</span>,
      message: "Estás a punto de rechazar el contacto",
      confirmText: "Rechazar",
      cancelText: "Cancelar",
      confirmColor: "danger",
      cancelColor: "default",
    });

    const requestBody = getDeleteClaimQuery(claimId);

    if (result) {
      setIsLoading(true);
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
            setShowErrorAlert(true);
          }
          return res.json();
        })
        .then((resData) => {
          const updatedValues = claims.claims.filter(
            (claim) => claim._id !== claimId
          );

          setClaims({ claims: updatedValues });
          setShowSuccessAlert(true);
          setAlertMessage(alertMsg);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setShowErrorAlert(true);

          console.log(err);
        });
    }
  };

  function deleteNotifications() {
    setIsLoading(true);

    notifications.notifications.forEach((notification, index) => {
      const requestBody = getDeleteNotificationQuery(notification);

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

  useEffect(() => {
    if (context.token) {
      fetchUserItemsWithoutClaim();
      fetchClaims();
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    toggle();
    setCleanedNotifications(false);
  }, [
    context,
    setCleanedNotifications,
    setShowSuccessAlert,
    setShowErrorAlert,
  ]);

  const itemsAuthUserWithoutClaims = userItemsWithoutClaim.items.map(
    (item, key) => {
      return (
        <Col key={key} lg="4">
          <Card
            className="card-lift--hover shadow border-0"
            style={{ marginBottom: "1rem" }}
          >
            <CardBody className="py-5">
              <React.Fragment>
                <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                  <span className="h6 font-weight-bold">Estado actual:</span>
                  <Badge
                    color="success"
                    pill
                    className="mr-1"
                    style={{ marginLeft: "0.2rem" }}
                  >
                    Sin Respuestas
                  </Badge>
                </div>
                <h6 className="text-primary font-weight-bold text-uppercase">
                  Información del objeto
                </h6>
                <h6 className="text-default ">
                  {" "}
                  <span className="font-weight-bold"> Categoría: </span>
                  {item.category !== "otro" ? item.category : "Otros objetos"}
                </h6>
                <h6 className="text-default ">
                  <span className="font-weight-bold"> Descripción: </span>{" "}
                  {item.description}
                </h6>
                <h6 className="text-default ">
                  <span className="font-weight-bold"> Ubicación: </span>{" "}
                  {item.location}
                </h6>
                <h6 className="text-default ">
                  <span className="font-weight-bold"> Fecha:</span>{" "}
                  {moment(item.date).format("LL")}{" "}
                </h6>
                <Button
                  className="mt-4"
                  color="danger"
                  size="sm"
                  outline
                  onClick={() => deleteItemHandler(item._id)}
                >
                  Eliminar publicación
                </Button>
              </React.Fragment>
            </CardBody>
          </Card>
        </Col>
      );
    }
  );

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
        onDeleteItem={deleteItemHandler}
      ></ClaimCard>
    );
  });

  const showContent = () => {
    if (isLoading) {
      return <Spinner />;
    } else if (
      notifications.notifications &&
      notifications.notifications.length > 0 &&
      !cleanedNotifications
    ) {
      return (
        <React.Fragment>
          <Col className="text-center mt-5" lg="12">
            <ShowNotifications notifications={notifications.notifications} />
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
    } else if (
      userItemsWithoutClaim.items.length > 0 ||
      (claims.claims && claims.claims.length > 0)
    ) {
      return (
        <Card className="shadow">
          <CardBody>
            <Row className="row-grid">
              {itemsAuthUserIsParticipating} {itemsAuthUserWithoutClaims}
            </Row>
          </CardBody>
        </Card>
      );
    } else {
      return (
        <div className="text-center mt-5">
          <h3>Todavía no iniciaste contacto con ninguna persona</h3>
        </div>
      );
    }
  };

  const showAlertMessage = (type, msg, redirectTo) => {
    return (
      <AlertMessage
        type={type}
        msg={alertMessage ? alertMessage : msg}
        redirectTo={redirectTo}
      />
    );
  };

  const showNavbar = () => {
    return (
      <div className="position-relative">
        <section
          className="section section-sm, section-shaped"
          style={{ paddingBottom: "0rem" }}
        >
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

          <Container className="py-sm-sm d-flex">
            <div className="col px-0"></div>
          </Container>
        </section>
      </div>
    );
  };

  return (
    <React.Fragment>
      <CustomNavbar />

      {context.token ? (
        <React.Fragment>
          <main>
            {showNavbar()}

            <Container>
              <Row
                className="justify-content-center"
                style={{ marginTop: "2rem", marginBottom: "21rem" }}
              >
                <Col lg="6" style={{ marginTop: "2rem" }}>
                  {" "}
                  {showSuccessAlert
                    ? showAlertMessage("success", "¡Publicación eliminada!")
                    : ""}
                  {showErrorAlert
                    ? showAlertMessage("danger", "Lo sentimos, hubo un error")
                    : ""}
                </Col>
                <Col lg="12">{showContent()} </Col>
              </Row>
            </Container>
          </main>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <main>{showNavbar()}</main>

          <div className="text-center mt-5">
            <h3>
              Para poder ver tus publicaciones primero tenés que{" "}
              <Link to="/inicio-sesion" className="font-weight-bold">
                iniciar sesión.
              </Link>{" "}
            </h3>
          </div>
          <h1 className="display-3 text-center"></h1>

          <MustLoginModal isShowing={isShowing} hide={toggle} />
        </React.Fragment>
      )}
      {context.token ? <SimpleFooter page={"mis-publicaciones"} /> : ""}
    </React.Fragment>
  );
};

export default UserClaims;
