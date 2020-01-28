import React, { useEffect } from "react";

// reactstrap components
import { Container, Row } from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import CardsFooter from "components/Footers/CardsFooter.jsx";

// index page sections
import SplashScreen from "./IndexSections/SplashScreen.jsx";
import Buttons from "./IndexSections/Buttons.jsx";
import Inputs from "./IndexSections/Inputs.jsx";
import CustomControls from "./IndexSections/CustomControls.jsx";
import Menus from "./IndexSections/Menus.jsx";
import Navbars from "./IndexSections/Navbars.jsx";
import Tabs from "./IndexSections/Tabs.jsx";
import Progress from "./IndexSections/Progress.jsx";
import Pagination from "./IndexSections/Pagination.jsx";
import Pills from "./IndexSections/Pills.jsx";
import Labels from "./IndexSections/Labels.jsx";
import Alerts from "./IndexSections/Alerts.jsx";
import Typography from "./IndexSections/Typography.jsx";
import Modals from "./IndexSections/Modals.jsx";
import Datepicker from "./IndexSections/Datepicker.jsx";
import TooltipPopover from "./IndexSections/TooltipPopover.jsx";
import Carousel from "./IndexSections/Carousel.jsx";
import Icons from "./IndexSections/Icons.jsx";
import Login from "./IndexSections/Login.jsx";
import Download from "./IndexSections/Download.jsx";
import AuthContext from "../context/auth-context";

const Index = props => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);

  return (
    <>
      <DemoNavbar />
      <SplashScreen />
      {/*
              <Buttons />
            <Inputs />
            <section className='section'>
              <Container>
                <CustomControls />
                <Menus />
              </Container>
            </section>
            <Navbars />
            <section className='section section-components'>
              <Container>
                <Tabs />
                <Row className='row-grid justify-content-between align-items-center mt-lg'>
                  <Progress />
                  <Pagination />
                </Row>
                <Row className='row-grid justify-content-between'>
                  <Pills />
                  <Labels />
                </Row>
                <Alerts />
                <Typography />
                <Modals />
                <Datepicker />
                <TooltipPopover />
              </Container>
            </section>
            <Carousel />
            <Icons />
            <Login />
            <Download />
             */}
      <CardsFooter />
    </>
  );
};

export default Index;
