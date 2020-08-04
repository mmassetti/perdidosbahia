import React, { useState } from "react";
import { UncontrolledAlert } from "reactstrap";

import { useHistory } from "react-router-dom";

const AlertMessage = (props) => {
  const [visible, setVisible] = useState(true);
  let history = useHistory();

  const onDismiss = () => {
    setVisible(false);

    if (props.redirectTo) {
      history.push({
        pathname: "/" + props.redirectTo,
      });
    }
  };

  const showAlert = (type) => {
    return (
      <UncontrolledAlert
        color={type}
        fade={false}
        isOpen={visible}
        toggle={onDismiss}
      >
        <span className="alert-inner--icon">
          <i className="ni ni-like-2" />
        </span>
        <span className="alert-inner--text ml-1">
          <strong>{props.msg}</strong>
        </span>
      </UncontrolledAlert>
    );
  };

  return showAlert(props.type);
};
export default AlertMessage;
