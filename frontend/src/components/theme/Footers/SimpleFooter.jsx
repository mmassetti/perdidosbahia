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
/*eslint-disable*/
import React from "react";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

import { Link } from "react-router-dom";

const SimpleFooter = (props) => {
  const token = localStorage.getItem("token");

  const mainTitle = () => {
    switch (props.page) {
      case "objetos-publicados":
        if (token) {
          return "¿Ya iniciaste contacto con alguién?";
        } else {
          return " ¿Todavía no creaste una cuenta?";
        }
      case "mis-publicaciones":
        return "¿Querés ver todos los objetos publicados?";
      case "objeto-perdido":
        return "¿Estás buscando otra cosa?";
      case "detalle":
        if (token) {
          return "¿Estás buscando otra cosa?";
        } else {
          return "¿Todavía no creaste una cuenta?";
        }
      default:
        return "Objetos perdidos y encontrados en Bahía y la zona";
    }
  };

  const secondaryTitle = () => {
    switch (props.page) {
      case "objetos-publicados":
        if (token) {
          return (
            <h4 class=" mb-0 font-weight-light">
              {" "}
              Seguí el estado de tus publicaciones{" "}
              <Link to="/mis-publicaciones" className="font-weight-bold">
                acá
              </Link>{" "}
            </h4>
          );
        } else {
          return (
            <h4 class=" mb-0 font-weight-light">
              Hacelo{" "}
              <Link to="/registro" className="font-weight-bold">
                acá
              </Link>{" "}
            </h4>
          );
        }
      case "mis-publicaciones":
        return (
          <h4 class=" mb-0 font-weight-light">
            {" "}
            Miralos{" "}
            <Link to="/objetos-publicados" className="font-weight-bold">
              acá
            </Link>{" "}
          </h4>
        );
      case "objeto-perdido":
        return (
          <h4 class=" mb-0 font-weight-light">
            {" "}
            Podes ver todos los{" "}
            <Link to="/objetos-publicados" className="font-weight-bold">
              objetos publicados
            </Link>{" "}
            o ver el estado de{" "}
            <Link to="/mis-publicaciones" className="font-weight-bold">
              tus publicaciones
            </Link>{" "}
          </h4>
        );
      case "detalle":
        if (token) {
          return (
            <h4 class=" mb-0 font-weight-light">
              {" "}
              Podes ver todos los{" "}
              <Link to="/objetos-publicados" className="font-weight-bold">
                objetos publicados
              </Link>{" "}
              o ver el estado de{" "}
              <Link to="/mis-publicaciones" className="font-weight-bold">
                tus publicaciones
              </Link>{" "}
            </h4>
          );
        } else {
          return (
            <h4 class=" mb-0 font-weight-light">
              Hacelo{" "}
              <Link to="/registro" className="font-weight-bold">
                acá
              </Link>{" "}
            </h4>
          );
        }

      default:
        return (
          <h4 class=" mb-0 font-weight-light">
            <Link to="/registro" className="font-weight-bold">
              Registrate
            </Link>{" "}
            o{" "}
            <Link to="/inicio-sesion" className="font-weight-bold">
              inicia sesión
            </Link>{" "}
            para comenzar
          </h4>
        );
    }
  };

  const padding = () => {
    if (props.page == "inicio-sesion") {
      return "3.5rem";
    }
    return "2rem";
  };

  return (
    <React.Fragment>
      <footer className="footer" style={{ padding: padding() }}>
        <Container>
          <Row className=" row-grid align-items-center ">
            <Col lg="12">
              <h3 className=" text-primary font-weight-light mb-2">
                {mainTitle()}
              </h3>
              <h4 className=" mb-0 font-weight-light">{secondaryTitle()}</h4>
            </Col>
          </Row>
          <hr />
          <Row className=" align-items-center justify-content-md-between">
            <Col md="6">
              <div className=" copyright">
                © {new Date().getFullYear()} - Web creada por{" "}
                <a href="mailto:matiasmasetti@gmail.com">Matías Massetti </a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default SimpleFooter;
