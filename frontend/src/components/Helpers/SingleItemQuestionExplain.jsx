import React from "react";

import { Badge, UncontrolledTooltip } from "reactstrap";

const SingleItemQuestionExplain = props => {
  return (
    <>
      <Badge
        className="text-uppercase"
        color="primary"
        pill
        data-placement="right"
        id="test"
      >
        ?
      </Badge>
      <UncontrolledTooltip delay={0} placement="right" target="test">
        Utilizamos un sistema de preguntas y respuestas de los objetos para
        ayudar a verificar la autenticidad de ambas partes y evitar fraudes
      </UncontrolledTooltip>
    </>
  );
};

export default SingleItemQuestionExplain;
