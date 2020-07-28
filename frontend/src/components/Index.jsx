import React, { useEffect } from "react";

import CustomNavbar from "./theme/Navbars/CustomNavbar.jsx";
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
    </>
  );
};

export default Index;
