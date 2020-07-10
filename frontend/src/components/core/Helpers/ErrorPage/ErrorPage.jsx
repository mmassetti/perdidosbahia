import React from "react";
import "./ErrorPage.css";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";

export default function ErrorPage() {
  let history = useHistory();

  function goHome() {
    history.push("/");
  }

  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>
            4<span></span>4
          </h1>
        </div>
        <h2>No se encontró la página</h2>
        <p>
          Lo lamentamos pero la página que estabas buscando no existe, fue
          eliminada o está temporalmente inhabilitada
        </p>
        <Button
          onClick={goHome}
          style={{ marginTop: "1rem" }}
          className="btn-icon mb-3 mb-sm-0"
          color="github"
          size="lg"
          target="_blank"
        >
          <span className="btn-inner--icon mr-1">
            <i className="fa fa-home" />
          </span>
          <span className="btn-inner--text">
            Volver <span className="text-warning mr-1"> al inicio</span>
          </span>
        </Button>
      </div>
    </div>
  );
}
