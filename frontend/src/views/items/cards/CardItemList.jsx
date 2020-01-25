import React from "react";
import CardItem from "../cards/CardItem";
import PropTypes from "prop-types";

const CardItemList = ({ items }) => {
  if (items) {
    const cardsArray = items.items.map(item => (
      <CardItem key={item._id} name={item.description}></CardItem>
    ));

    return <div>{cardsArray}</div>;
  } else {
    return <div>No hay ningun item</div>;
  }
};

CardItemList.propTypes = {
  items: PropTypes.object.isRequired
};

export default CardItemList;
