import React, { useEffect } from "react";

import { Container, Row } from "reactstrap";

import CustomNavbar from "./theme/Navbars/CustomNavbar.jsx";
import CardsFooter from "../components/theme/Footers/CardsFooter.jsx";

import SplashScreen from "../components/theme/IndexSections/SplashScreen.jsx";

const Index = (props) => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);

  return (
    <>
      <CustomNavbar />
      <SplashScreen />
      <CardsFooter />
    </>
  );
};

export default Index;
