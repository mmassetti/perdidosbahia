import React from "react";
import { Card, CardBody } from "reactstrap";

const ShowNotifications = (props) => {
  const notificationItemCategory = (notification) => {
    if (
      notification.itemInvolved &&
      notification.itemInvolved.category !== "otro"
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

  return props.notifications.map((notification, index) => {
    return (
      <Card
        key={index}
        className="card-lift--hover shadow border-0"
        style={{ marginBottom: "2rem" }}
      >
        <CardBody className="py-5">
          <h6 className="text-warning font-weight-bold mb-2">
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

export default ShowNotifications;
