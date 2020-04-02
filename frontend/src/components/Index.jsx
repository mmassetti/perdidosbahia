import React, { useEffect } from "react";

// reactstrap components
import { Container, Row } from "reactstrap";

// core components
import DemoNavbar from "../components/theme/Navbars/DemoNavbar.jsx";
import CardsFooter from "../components/theme/Footers/CardsFooter.jsx";

// index page sections
import SplashScreen from "../components/theme/IndexSections/SplashScreen.jsx";
import Buttons from "../components/theme/IndexSections/Buttons.jsx";
import Inputs from "../components/theme/IndexSections/Inputs.jsx";
import CustomControls from "../components/theme/IndexSections/CustomControls.jsx";
import Menus from "../components/theme/IndexSections/Menus.jsx";
import Navbars from "../components/theme/IndexSections/Navbars.jsx";
import Tabs from "../components/theme/IndexSections/Tabs.jsx";
import Progress from "../components/theme/IndexSections/Progress.jsx";
import Pagination from "../components/theme/IndexSections/Pagination.jsx";
import Pills from "../components/theme/IndexSections/Pills.jsx";
import Labels from "../components/theme/IndexSections/Labels.jsx";
import Alerts from "../components/theme/IndexSections/Alerts";
import Typography from "../components/theme/IndexSections/Typography.jsx";
import Modals from "../components/theme/IndexSections/Modals.jsx";
import Datepicker from "../components/theme/IndexSections/Datepicker.jsx";
import TooltipPopover from "../components/theme/IndexSections/TooltipPopover.jsx";
import Carousel from "../components/theme/IndexSections/Carousel.jsx";
import Icons from "../components/theme/IndexSections/Icons.jsx";
import Login from "../components/theme/IndexSections/Login.jsx";
import Download from "../components/theme/IndexSections/Download.jsx";
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
