import React, { useState } from "react";
import { UncontrolledAlert } from "reactstrap";

import { useHistory } from "react-router-dom";

const AlertMessage = (props) => {
  const [visible, setVisible] = useState(true);
  let history = useHistory();

  const onDismiss = () => {
    setVisible(false);
    history.push({
      pathname: "/mis-publicaciones",
    });
  };

  const getText = () => {
    switch (props.type) {
      case "success":
        return "¡Objeto publicado!";
      case "danger":
        return "Lo sentimos, hubo un error";
      default:
        return "¡Listo!";
    }
  };

  const showContent = () => {
    switch (props.type) {
      case "success":
        return (
          <UncontrolledAlert
            color={props.type}
            fade={false}
            isOpen={visible}
            toggle={onDismiss}
          >
            <span className="alert-inner--icon">
              <i className="ni ni-like-2" />
            </span>
            <span className="alert-inner--text ml-1">
              <strong>{getText()}</strong>
            </span>
          </UncontrolledAlert>
        );

      case "danger":
        return (
          <UncontrolledAlert
            color="danger"
            fade={false}
            isOpen={visible}
            toggle={onDismiss}
          >
            <span className="alert-inner--icon">
              <i className="ni ni-support-16" />
            </span>
            <span className="alert-inner--text ml-1">
              <strong>{getText()}</strong>
            </span>
          </UncontrolledAlert>
        );
      default:
        return (
          <UncontrolledAlert
            color="info"
            fade={false}
            isOpen={visible}
            toggle={onDismiss}
          >
            <span className="alert-inner--icon">
              <i className="ni ni-like-2" />
            </span>
            <span className="alert-inner--text ml-1">
              <strong>{getText()}</strong>
            </span>
          </UncontrolledAlert>
        );
    }
  };

  return showContent();
};

export default AlertMessage;
