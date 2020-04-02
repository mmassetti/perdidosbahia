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
import DemoNavbar from "../../theme/Navbars/DemoNavbar.jsx";
import SimpleFooter from "../../theme/Footers/SimpleFooter";

import { useForm, Controller } from "react-hook-form";

const Register = props => {
  // const phoneRegExp = /^[\(]?[\+]?(\d{2}|\d{3})[\)]?[\s]?((\d{6}|\d{8})|(\d{3}[\*\.\-\s]){2}\d{3}|(\d{2}[\*\.\-\s]){3}\d{2}|(\d{4}[\*\.\-\s]){1}\d{4})|\d{8}|\d{10}|\d{12}$/;

  const phoneRegExp = /^[\d ]*$|^[0-9]+(-[0-9]+)+$/; //Numeros con espacio entre medio  o Numeros que aceptan un guion

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: ""
  };

  const SignupSchema = yup.object().shape({
    firstName: yup.string().required("Por favor ingresa tu nombre"),
    lastName: yup.string().required("Por favor ingresa tu apellido"),
    email: yup
      .string()
      .email()
      .required(),
    password: yup
      .string()
      .required("Por favor ingresa una contraseña de al menos 8 caracteres.")
      .min(8, "La contraseña debe tener al menos 8 caracteres."),
    // .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    passwordCheck: yup
      .string()
      .required("Por favor escribe nuevamente tu contraseña.")
      .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
      .min(8, "La contraseña debe tener al menos 8 caracteres."),

    phoneNumber: yup
      .string()
      .notRequired()
      .matches(phoneRegExp, {
        excludeEmptyString: true,
        message: "El número contiene caracteres inválidos"
      })
      .test("phoneNumber", "El número debe tener al menos 7 dígitos", function(
        value
      ) {
        if (!!value) {
          const schema = yup.string().min(7);
          return schema.isValidSync(value);
        }
        return true;
      })
  });

  const { handleSubmit, register, reset, control, errors, formState } = useForm(
    {
      mode: "onChange",
      validationSchema: SignupSchema,
      defaultValues
    }
  );
  const [data, setData] = useState(null);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);

  const submitForm = async data => {
    setData(data);

    const requestBody = {
      query: `
        mutation {
          createUser(userInput: {email: "${data.email}", password: "${data.password}", firstName: "${data.firstName}", lastName: "${data.lastName} , "phoneNumber: "${data.phoneNumber}" }) {
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

    reset({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordCheck: "",
      phoneNumber: ""
    });
  };

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
                      onSubmit={handleSubmit(submitForm)}
                    >
                      {/* //* Name */}
                      <FormGroup
                        className={
                          !formState.touched.firstName &&
                          (formState.submitCount == 0 || formState.isSubmitted)
                            ? ""
                            : errors.firstName
                            ? "has-danger"
                            : "has-success"
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
                                !formState.touched.firstName &&
                                (formState.submitCount == 0 ||
                                  formState.isSubmitted)
                                  ? ""
                                  : errors.firstName
                                  ? "is-invalid"
                                  : "is-valid"
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
                          !formState.touched.lastName &&
                          (formState.submitCount == 0 || formState.isSubmitted)
                            ? ""
                            : errors.lastName
                            ? "has-danger"
                            : "has-success"
                        }
                      >
                        <Controller
                          as={
                            <Input
                              ref={register()}
                              autoComplete="off"
                              placeholder="Apellido"
                              className={
                                !formState.touched.lastName &&
                                (formState.submitCount == 0 ||
                                  formState.isSubmitted)
                                  ? ""
                                  : errors.lastName
                                  ? "is-invalid"
                                  : "is-valid"
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
                        className={
                          !formState.touched.email &&
                          (formState.submitCount == 0 || formState.isSubmitted)
                            ? ""
                            : errors.email
                            ? "has-danger"
                            : "has-success"
                        }
                      >
                        <Controller
                          as={
                            <Input
                              ref={register()}
                              autoComplete="off"
                              placeholder="Email"
                              className={
                                !formState.touched.email &&
                                (formState.submitCount == 0 ||
                                  formState.isSubmitted)
                                  ? ""
                                  : errors.email
                                  ? "is-invalid"
                                  : "is-valid"
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
                          !formState.touched.pasword &&
                          (formState.submitCount == 0 || formState.isSubmitted)
                            ? ""
                            : errors.password
                            ? "has-danger"
                            : "has-success"
                        }
                      >
                        <Controller
                          as={
                            <Input
                              type="password"
                              ref={register()}
                              autoComplete="off"
                              placeholder="Contraseña"
                              className={
                                !formState.touched.password &&
                                (formState.submitCount == 0 ||
                                  formState.isSubmitted)
                                  ? ""
                                  : errors.password
                                  ? "is-invalid"
                                  : "is-valid"
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

                      {/* //* Confirmacion Password */}
                      <FormGroup
                        className={
                          !formState.touched.paswordCheck &&
                          (formState.submitCount == 0 || formState.isSubmitted)
                            ? ""
                            : errors.passwordCheck
                            ? "has-danger"
                            : "has-success"
                        }
                      >
                        <Controller
                          as={
                            <Input
                              type="password"
                              ref={register()}
                              autoComplete="off"
                              placeholder="Escribir nuevamente la contraseña"
                              className={
                                !formState.touched.passwordCheck &&
                                (formState.submitCount == 0 ||
                                  formState.isSubmitted)
                                  ? ""
                                  : errors.passwordCheck
                                  ? "is-invalid"
                                  : "is-valid"
                              }
                            />
                          }
                          name="passwordCheck"
                          control={control}
                        />

                        {errors.passwordCheck && (
                          <small style={{ color: "red" }}>
                            {errors.passwordCheck.message}
                          </small>
                        )}
                      </FormGroup>

                      {/* //* Phone number */}
                      <FormGroup
                        className={
                          !formState.touched.phoneNumber
                            ? ""
                            : errors.phoneNumber
                            ? "has-danger"
                            : "has-success"
                        }
                      >
                        <Controller
                          as={
                            <Input
                              ref={register()}
                              autoComplete="off"
                              placeholder="Número de celular (opcional)"
                              className={
                                !formState.touched.phoneNumber
                                  ? ""
                                  : errors.phoneNumber
                                  ? "is-invalid"
                                  : "is-valid"
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

                      {/* {data && (
                        <div>
                          <pre style={{ textAlign: "left" }}>
                            {JSON.stringify(data, null, 2)}
                          </pre>

                        
                        </div>
                      )} */}
                      <div className="text-center">
                        <Button
                          disabled={formState.isValid ? false : true}
                          className="mt-4"
                          color="primary"
                          type="submit"
                        >
                          Crear cuenta
                        </Button>
                      </div>
                      <br></br>
                      <small className="text-center">
                        <p>
                          {" "}
                          Ya tenes una cuenta?{" "}
                          <Link className="label" to="/inicio-sesion">
                            Iniciar sesión
                          </Link>
                        </p>
                      </small>
                      {/* <pre>{JSON.stringify(formState, null, 2)}</pre> */}
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
