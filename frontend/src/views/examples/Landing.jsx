/*!

=========================================================
* Argon Design System React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import CardsFooter from "components/Footers/CardsFooter.jsx";

// index page sections
import Download from "../IndexSections/Download.jsx";

class Landing extends React.Component {
  state = {};
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <DemoNavbar />
        <main ref='main'>
          <div className='position-relative'>
            {/* shape Hero */}
            <section className='section section-lg section-shaped pb-250'>
              <Container className='py-lg-md d-flex'></Container>
              {/* SVG separator */}
              <div className='separator separator-bottom separator-skew'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  preserveAspectRatio='none'
                  version='1.1'
                  viewBox='0 0 2560 100'
                  x='0'
                  y='0'
                >
                  <polygon
                    className='fill-white'
                    points='2560 0 2560 100 0 100'
                  />
                </svg>
              </div>
            </section>
            {/* 1st Hero Variation */}
          </div>

          <section className='section section-lg pt-lg-0 section-contact-us'>
            <Container>
              <Row className='justify-content-center mt--300'>
                <Col lg='8'>
                  <Card className='bg-gradient-secondary shadow'>
                    <CardBody className='p-lg-5'>
                      <h4 className='mb-1'></h4>
                      <p className='mt-0'>
                        Ingrese una o más preguntas que deberá contestar quien
                        encuentre tu objeto
                      </p>
                      <p className='mt-0'>
                        También le solicitaremos que envie una foto
                      </p>
                      <i className='ni ni-fat-add'></i>

                      <div className='custom-control custom-checkbox mb-3'>
                        <input
                          className='custom-control-input'
                          id='customCheck1'
                          type='checkbox'
                        />
                        <label
                          className='custom-control-label'
                          htmlFor='customCheck1'
                        >
                          Unchecked
                        </label>
                      </div>
                      <div>
                        <div className='custom-control custom-checkbox mb-3'>
                          <input
                            className='custom-control-input'
                            id='customCheck1'
                            type='checkbox'
                          />
                          <label
                            className='custom-control-label'
                            htmlFor='customCheck1'
                          >
                            Unchecked
                          </label>
                        </div>
                        <Button
                          block
                          className='btn-round'
                          color='default'
                          size='lg'
                          type='button'
                        >
                          Confirmar
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
          {/*
           */}
        </main>
      </>
    );
  }
}

export default Landing;
