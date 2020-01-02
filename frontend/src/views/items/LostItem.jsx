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

import ReactDatetime from "react-datetime";

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
  Col,
  Label,
  Modal
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import CardsFooter from "components/Footers/CardsFooter.jsx";

// index page sections
import Download from "../IndexSections/Download.jsx";

class LostItem extends React.Component {
  state = {
    exampleModal: false
  };
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };
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
              <div className='shape shape-style-1 shape-default'>
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <Container className='py-lg-md d-flex'>
                <div className='col px-0'>
                  <Row>
                    <Col lg='6'>
                      <h1 className='display-3 text-white'>
                        Completá este formulario
                        <span>
                          y publicaremos tu objeto para que todos lo puedan ver
                        </span>
                      </h1>
                    </Col>
                  </Row>
                </div>
              </Container>
            </section>
          </div>

          <section className='section section-lg bg-gradient-default'>
            <Container className='pt-lg pb-300'>
              <Row className='text-center justify-content-center'>
                <Col lg='10'>
                  <h2 className='display-3 text-white'>¿Cómo funciona?</h2>
                  <p className='lead text-white'>
                    Consideramos que es importante garantizar la seguridad de
                    nuestros usuarios a la hora de publicar de un objeto, por lo
                    que te pediremos que nos proporciones información sobre lo
                    que perdiste, además de una o más preguntas que alguien que
                    pueda llegar a encontrar tu objeto deberá contestar
                    correctamente. De esta forma buscamos evitar fraudes y
                    riesgos de seguridad personal.
                  </p>
                </Col>
              </Row>
            </Container>
            {/* SVG separator */}
            <div className='separator separator-bottom separator-skew zindex-100'>
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
          <section className='section section-lg pt-lg-0 section-contact-us'>
            <Container>
              <Row className='justify-content-center mt--300'>
                <Col lg='8'>
                  <Card className='bg-gradient-secondary shadow'>
                    <CardBody className='p-lg-5'>
                      <h4 className='mb-1'>
                        Información sobre el objeto perdido
                      </h4>
                      <p className='mt-0'>
                        <b>IMPORTANTE</b>: Te pedimos que en la descripción del
                        objeto te guardes uno o más detalles que se utilizarán
                        en una de las preguntas que deberá contestar quien
                        encuentre un objeto similar al tuyo
                      </p>
                      {/*Tipo de objeto*/}
                      <FormGroup>
                        <Input
                          type='select'
                          name='select'
                          id='itemType'
                          className='form-control-alternative'
                          defaultValue={"DEFAULT"}
                        >
                          <option value='DEFAULT' disabled='disabled'>
                            Tipo de objeto
                          </option>
                          <option>Documentación</option>
                          <option>Llaves</option>
                          <option>Patentes</option>
                          <option>Lentes</option>
                          <option>Ropa</option>
                          <option>Celular/Notebook/Tablet</option>
                          <option>Otro</option>
                        </Input>
                      </FormGroup>
                      {/* <FormGroup
                        className={classnames("mt-5", {
                          focused: this.state.nameFocused
                        })}
                      >
                        <InputGroup className='input-group-alternative'>
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText>
                              <i className='ni ni-user-run' />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder='Titulo del objeto (Por ejemplo: llave, documento, patente)'
                            type='text'
                            onFocus={e => this.setState({ nameFocused: true })}
                            onBlur={e => this.setState({ nameFocused: false })}
                          />
                        </InputGroup>
                      </FormGroup> */}
                      {/*Descripcion */}
                      <FormGroup className='mb-4'>
                        <Input
                          className='form-control-alternative'
                          cols='80'
                          name='name'
                          placeholder='Descripción (guardá uno o mas detalles de tu objeto para poner en una pregunta acá abajo)'
                          rows='4'
                          type='textarea'
                        />
                      </FormGroup>

                      {/* Fecha */}
                      <FormGroup>
                        <InputGroup className='input-group-alternative'>
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText>
                              <i className='ni ni-calendar-grid-58' />
                            </InputGroupText>
                          </InputGroupAddon>
                          <ReactDatetime
                            inputProps={{
                              placeholder: "Fecha en la que perdiste el objeto"
                            }}
                            timeFormat={false}
                          />
                        </InputGroup>
                      </FormGroup>

                      {/* Preguntas */}
                      <p className='mt-0'>
                        Agregá una o más preguntas que deberá contestar quien
                        encuentre tu objeto
                      </p>
                      <Button
                        color='primary'
                        type='button'
                        onClick={() => this.toggleModal("exampleModal")}
                      >
                        Agregar pregunta
                      </Button>
                      {/* Modal pregunta */}
                      <Modal
                        className='modal-dialog-centered'
                        isOpen={this.state.exampleModal}
                        toggle={() => this.toggleModal("exampleModal")}
                      >
                        <div className='modal-header'>
                          <h5 className='modal-title' id='exampleModalLabel'>
                            Modal title
                          </h5>
                          <button
                            aria-label='Close'
                            className='close'
                            data-dismiss='modal'
                            type='button'
                            onClick={() => this.toggleModal("exampleModal")}
                          >
                            <span aria-hidden={true}>×</span>
                          </button>
                        </div>
                        <div className='modal-body'>...</div>
                        <div className='modal-footer'>
                          <Button
                            color='secondary'
                            data-dismiss='modal'
                            type='button'
                            onClick={() => this.toggleModal("exampleModal")}
                          >
                            Close
                          </Button>
                          <Button color='primary' type='button'>
                            Save changes
                          </Button>
                        </div>
                      </Modal>
                      <br />
                      <br />

                      {/* Publicar */}
                      <div>
                        <Button
                          block
                          className='btn-round'
                          color='default'
                          size='lg'
                          type='button'
                        >
                          Publicar
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
          <Download />
        </main>
        <CardsFooter />
      </>
    );
  }
}

export default LostItem;
