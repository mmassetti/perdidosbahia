import React from "react";
import { Badge, Card, Button, CardBody, Col } from "reactstrap";

const CardItem = props => {
  console.log("TCL: CardItem -> props", props);

  return (
    <Col lg="4">
      <Card className="card-lift--hover shadow border-0">
        <CardBody className="py-5">
          <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
            <i className="ni ni-check-bold" />
          </div>
          <h6 className="text-primary text-uppercase">Download Argon</h6>
          <p className="description mt-3">
            Argon is a great free UI package based on Bootstrap 4 that includes
            the most important components and features.
          </p>
          <div>
            <Badge color="primary" pill className="mr-1">
              design
            </Badge>
            <Badge color="primary" pill className="mr-1">
              system
            </Badge>
            <Badge color="primary" pill className="mr-1">
              creative
            </Badge>
          </div>
          <Button
            className="mt-4"
            color="primary"
            href="#pablo"
            onClick={e => e.preventDefault()}
          >
            Learn more
          </Button>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CardItem;
