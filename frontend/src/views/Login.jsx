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
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
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
import SimpleFooter from "components/Footers/SimpleFooter.jsx";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  handleChange = async event => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value
    });
  };

  async submitForm(e) {
    e.preventDefault();
    console.log("Success");
  }

  render() {
    const { email, password } = this.state;

    return (
      <>
        <DemoNavbar />
        <main ref='main'>
          <section className='section section-shaped section-lg'>
            <div className='shape shape-style-1 bg-gradient-default'>
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className='pt-lg-md'>
              <Row className='justify-content-center'>
                <Col lg='5'>
                  <Card className='bg-secondary shadow border-0'>
                    <CardHeader className='bg-white pb-5'>
                      <div className='text-muted text-center mb-3'>
                        <small>Iniciar sesión con</small>
                      </div>
                      <div className='btn-wrapper text-center'>
                        <Button
                          className='btn-neutral btn-icon'
                          color='default'
                          href='#pablo'
                          onClick={e => e.preventDefault()}
                        >
                          <span className='btn-inner--icon mr-1'>
                            <img
                              alt='...'
                              src={require("assets/img/icons/common/github.svg")}
                            />
                          </span>
                          <span className='btn-inner--text'>Github</span>
                        </Button>
                        <Button
                          className='btn-neutral btn-icon ml-1'
                          color='default'
                          href='#pablo'
                          onClick={e => e.preventDefault()}
                        >
                          <span className='btn-inner--icon mr-1'>
                            <img
                              alt='...'
                              src={require("assets/img/icons/common/google.svg")}
                            />
                          </span>
                          <span className='btn-inner--text'>Google</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardBody className='px-lg-5 py-lg-5'>
                      <div className='text-center text-muted mb-4'>
                        <small>O inicia sesión con tu email</small>
                      </div>
                      <Form role='form' onSubmit={e => this.submitForm(e)}>
                        <FormGroup className='mb-3'>
                          <InputGroup className='input-group-alternative'>
                            <InputGroupAddon addonType='prepend'>
                              <InputGroupText>
                                <i className='ni ni-email-83' />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder='Email'
                              type='email'
                              name='email'
                              required
                              value={email}
                              onChange={e => {
                                this.handleChange(e);
                              }}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className='input-group-alternative'>
                            <InputGroupAddon addonType='prepend'>
                              <InputGroupText>
                                <i className='ni ni-lock-circle-open' />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder='Contraseña'
                              type='password'
                              autoComplete='off'
                              name='password'
                              value={password}
                              onChange={e => this.handleChange(e)}
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                        <div className='custom-control custom-control-alternative custom-checkbox'>
                          <input
                            className='custom-control-input'
                            id=' customCheckLogin'
                            type='checkbox'
                          />
                          <label
                            className='custom-control-label'
                            htmlFor=' customCheckLogin'
                          >
                            <span>Recordarme</span>
                          </label>
                        </div>
                        <div className='text-center'>
                          <Button
                            className='my-4'
                            color='primary'
                            type='button'
                          >
                            Iniciar sesión
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                  <Row className='mt-3'>
                    <Col xs='6'>
                      <a
                        className='text-light'
                        href='#pablo'
                        onClick={e => e.preventDefault()}
                      >
                        <small>Olvidé mi contraseña</small>
                      </a>
                    </Col>
                    <Col className='text-right' xs='6'>
                      <small>
                        <Link className='text-light' to='/register-page'>
                          Crear nueva cuenta
                        </Link>
                      </small>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Login;
