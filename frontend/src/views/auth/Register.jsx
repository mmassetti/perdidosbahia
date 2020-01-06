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
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import useForm from "../../forms/useForm";
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

import * as yup from "yup";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";

import { useForm, Controller } from "react-hook-form";

const Register = props => {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const SignupSchema = yup.object().shape({
    firstName: yup.string().required("Por favor ingresa tu nombre"),
    lastName: yup.string().required("Por favor ingresa tu apellido"),
    email: yup
      .string()
      .email()
      .required(),
    password: yup
      .string()
      .required("Por favor ingresa una constraseña de al menos 8 caracteres.")
      .min(8, "La contraseña debe tener al menos 8 caracteres.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    phoneNumber: yup.string().matches(phoneRegExp, {
      excludeEmptyString: true,
      message: "El número contiene caracteres inválidos"
    })
  });

  const { handleSubmit, register, reset, control, errors } = useForm({
    mode: "onChange",
    validationSchema: SignupSchema
  });
  const [data, setData] = useState(null);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);

  /*const submitForm = async e => {
    e.preventDefault();

    if (password !== password2) {
      console.log("Las contraseñas no coinciden");
    } else {
      const requestBody = {
        query: `
        mutation {
          createUser(userInput: {email: "${email}", password: "${password}"}) {
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
  };*/

  // function firstNameErrors() {
  //   var errorsMsgs = [];
  //   if (errors.firstName) {
  //     errors.firstName.map((item, i) => {
  //       errorsMsgs.push(item.message);
  //     });
  //   }

  //   console.log("TCL: firstNameErrors -> errorsMsgs", errorsMsgs);

  //   return <div>Hello World</div>;
  // }

  return (
    <>
      <DemoNavbar />
      <main>
        <section className="section section-shaped section-lg">
          <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="pt-lg-md">
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white pb-5">
                    <div className="text-muted text-center mb-3">
                      <small>Registrate con</small>
                    </div>
                    <div className="text-center">
                      <Button
                        className="btn-neutral btn-icon mr-4"
                        color="default"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <span className="btn-inner--icon mr-1">
                          <img
                            alt="..."
                            src={require("assets/img/icons/common/github.svg")}
                          />
                        </span>
                        <span className="btn-inner--text">Github</span>
                      </Button>
                      <Button
                        className="btn-neutral btn-icon ml-1"
                        color="default"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <span className="btn-inner--icon mr-1">
                          <img
                            alt="..."
                            src={require("assets/img/icons/common/google.svg")}
                          />
                        </span>
                        <span className="btn-inner--text">Google</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      {/* Registro usando email */}
                      <small>O registrate usando tu email</small>
                    </div>
                    <Form
                      noValidate
                      role="form"
                      onSubmit={handleSubmit(data => setData(data))}
                    >
                      {/* //* Name */}
                      <FormGroup
                        className={
                          errors.firstName ? "has-danger" : "has-success"
                        }
                      >
                        <Controller
                          as={
                            <Input
                              autoFocus
                              ref={register()}
                              autoComplete="off"
                              placeholder="Nombre"
                              className={
                                errors.firstName ? "is-invalid" : "is-valid"
                              }
                            />
                          }
                          name="firstName"
                          control={control}
                        />

                        {errors.firstName && (
                          <small style={{ color: "red" }}>
                            {errors.firstName.message}
                          </small>
                        )}
                      </FormGroup>

                      {/* //* Lastname */}
                      <FormGroup
                        className={
                          errors.lastName ? "has-danger" : "has-success"
                        }
                      >
                        <Controller
                          as={
                            <Input
                              ref={register()}
                              autoComplete="off"
                              placeholder="Apellido"
                              className={
                                errors.lastName ? "is-invalid" : "is-valid"
                              }
                            />
                          }
                          name="lastName"
                          control={control}
                        />

                        {errors.lastName && (
                          <small style={{ color: "red" }}>
                            {errors.lastName.message}
                          </small>
                        )}
                      </FormGroup>

                      {/* //* Email */}
                      <FormGroup
                        className={errors.email ? "has-danger" : "has-success"}
                      >
                        <Controller
                          as={
                            <Input
                              ref={register()}
                              autoComplete="off"
                              placeholder="Email"
                              className={
                                errors.email ? "is-invalid" : "is-valid"
                              }
                            />
                          }
                          name="email"
                          control={control}
                        />
                        {errors.email && (
                          <small style={{ color: "red" }}>
                            Por favor ingresa un email válido
                          </small>
                        )}
                      </FormGroup>

                      {/* //* Password */}
                      <FormGroup
                        className={
                          errors.password ? "has-danger" : "has-success"
                        }
                      >
                        <Controller
                          as={
                            <Input
                              ref={register()}
                              autoComplete="off"
                              placeholder="Contraseña"
                              className={
                                errors.password ? "is-invalid" : "is-valid"
                              }
                            />
                          }
                          name="password"
                          control={control}
                        />

                        {errors.password && (
                          <small style={{ color: "red" }}>
                            {errors.password.message}
                          </small>
                        )}
                      </FormGroup>

                      {/* //* Phone number */}
                      <FormGroup
                        className={
                          errors.phoneNumber ? "has-danger" : "has-success"
                        }
                      >
                        <Controller
                          as={
                            <Input
                              ref={register()}
                              autoComplete="off"
                              placeholder="Número de celular (opcional)"
                              className={
                                errors.phoneNumber ? "is-invalid" : "is-valid"
                              }
                            />
                          }
                          name="phoneNumber"
                          control={control}
                        />

                        {errors.phoneNumber && (
                          <small style={{ color: "red" }}>
                            {errors.phoneNumber.message}
                          </small>
                        )}
                      </FormGroup>

                      {data && (
                        <pre style={{ textAlign: "left" }}>
                          {JSON.stringify(data, null, 2)}
                        </pre>
                      )}
                      <div className="text-center">
                        <Button className="mt-4" color="primary" type="submit">
                          Crear cuenta
                        </Button>
                      </div>
                      <br></br>
                      <small className="text-center">
                        <p>
                          {" "}
                          Ya tenes una cuenta?{" "}
                          <Link className="label" to="/login-page">
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
};

export default Register;
