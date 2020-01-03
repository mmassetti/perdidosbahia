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
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";

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

const Login = props => {
  const context = useContext(AuthContext);

  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");

  function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
      setValue(e.target.value);
    }

    return [value, handleChange];
  }

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);

  const submitForm = async e => {
    e.preventDefault();
    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
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
        if (resData.data.login.token) {
          context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <DemoNavbar />
      <main>
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
                    <Form role='form' onSubmit={submitForm}>
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
                            onChange={setEmail}
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
                            onChange={setPassword}
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
                        <Button className='my-4' color='primary' type='submit'>
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
};

export default Login;
