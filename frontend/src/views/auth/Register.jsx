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
  Col,
  FormFeedback
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      validate: {
        emailState: ""
      },
      validFormEmail: "has-sucess"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRex.test(e.target.value)) {
      validate.emailState = "has-success";
    } else {
      validate.emailState = "has-danger";
    }
    this.setState({ validate });
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

    if (this.state.password !== this.state.password2) {
      console.log("Las contraseñas no coinciden");
    } else {
      const requestBody = {
        query: `
        mutation {
          createUser(userInput: {email: "${this.state.email}", password: "${this.state.password}"}) {
            _id
            email
          }
        }
      `
      };

      fetch("http://localhost:8000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error("Failed!");
          }
          return res.json();
        })
        .then(resData => {
          console.log(resData);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    const { name, email, password, password2 } = this.state;

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
                        <small>Registrate con</small>
                      </div>
                      <div className='text-center'>
                        <Button
                          className='btn-neutral btn-icon mr-4'
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
                        {/* Registro usando email */}
                        <small>O registrate usando tu email</small>
                      </div>
                      <Form
                        noValidate
                        role='form'
                        onSubmit={e => this.submitForm(e)}
                      >
                        {/* Nombre */}
                        <FormGroup>
                          <InputGroup className='input-group-alternative mb-3'>
                            <InputGroupAddon addonType='prepend'>
                              <InputGroupText>
                                <i className='ni ni-hat-3' />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              autoFocus
                              name='name'
                              placeholder='Nombre'
                              type='text'
                              value={name}
                              onChange={e => {
                                this.handleChange(e);
                              }}
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                        {/* Email */}

                        <FormGroup>
                          <InputGroup className='input-group-alternative mb-3'>
                            <InputGroupAddon addonType='prepend'>
                              <InputGroupText>
                                <i className='ni ni-email-83' />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              name='email'
                              placeholder='Email'
                              type='email'
                              value={email}
                              onChange={e => {
                                this.validateEmail(e);
                                this.handleChange(e);
                              }}
                              valid={
                                this.state.validate.emailState === "has-success"
                              }
                              invalid={
                                this.state.validate.emailState === "has-danger"
                              }
                            />
                            <FormFeedback valid>Email correcto.</FormFeedback>
                            <FormFeedback>
                              El formato de email no es correcto.
                            </FormFeedback>
                          </InputGroup>
                        </FormGroup>
                        {/* Contraseña */}
                        <FormGroup>
                          <InputGroup className='input-group-alternative'>
                            <InputGroupAddon addonType='prepend'>
                              <InputGroupText>
                                <i className='ni ni-lock-circle-open' />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              name='password'
                              placeholder='Contraseña'
                              type='password'
                              autoComplete='off'
                              value={password}
                              onChange={e => this.handleChange(e)}
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                        {/* Contraseña 2 */}
                        <FormGroup>
                          <InputGroup className='input-group-alternative'>
                            <InputGroupAddon addonType='prepend'>
                              <InputGroupText>
                                <i className='ni ni-lock-circle-open' />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              name='password2'
                              placeholder='Confirmar contraseña '
                              type='password'
                              autoComplete='off'
                              value={password2}
                              onChange={e => this.handleChange(e)}
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                        {
                          <div className='text-muted font-italic'>
                            <small>
                              password strength:{" "}
                              <span className='text-success font-weight-700'>
                                strong
                              </span>
                            </small>
                          </div>
                        }
                        <FormGroup className='has-danger'>
                          <Input
                            className='is-invalid'
                            placeholder='Error Input'
                            type='email'
                          />
                        </FormGroup>

                        <Row className='my-4'>
                          <Col xs='12'>
                            <div className='custom-control custom-control-alternative custom-checkbox'>
                              <input
                                className='custom-control-input'
                                id='customCheckRegister'
                                type='checkbox'
                              />
                              <label
                                className='custom-control-label'
                                htmlFor='customCheckRegister'
                              >
                                <span>
                                  Estoy de acuerdo con los{" "}
                                  <a
                                    href='#pablo'
                                    onClick={e => e.preventDefault()}
                                  >
                                    términos y condiciones
                                  </a>
                                </span>
                              </label>
                            </div>
                          </Col>
                        </Row>

                        <div className='text-center'>
                          <Button
                            className='mt-4'
                            color='primary'
                            type='submit'
                          >
                            Crear cuenta
                          </Button>
                        </div>
                        <br></br>
                        <small className='text-center'>
                          <p>
                            {" "}
                            Ya tenes una cuenta?{" "}
                            <Link className='label' to='/login-page'>
                              Iniciar sesión
                            </Link>
                          </p>
                        </small>
                      </Form>
                    </CardBody>
                  </Card>
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

export default Register;
