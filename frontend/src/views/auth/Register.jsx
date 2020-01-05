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
import validate from "../../forms/LoginFormValidationRules";
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
  const SignupSchema = yup.object().shape({
    FirstName: yup
      .string()
      .min(3, "Your name must have at least 3 characters")
      .required("Please enter your first name"),
    firstName: yup
      .string()
      .required()
      .min(3),
    email: yup
      .string()
      .email()
      .required()
  });

  const { handleSubmit, register, reset, control, errors } = useForm({
    mode: "onChange",
    validationSchema: SignupSchema
  });
  const [data, setData] = useState(null);

  //const [name, setName] = useInput("");
  //const [email, setEmail] = useInput("");
  //const [password, setPassword] = useInput("");
  //const [password2, setPassword2] = useInput("");
  //const [validate, setValidate] = useInput({ emailState: "" });
  //const [validateFormEmail, setValidateFormEmail] = useInput("has-sucess");

  /*const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validate
  );*/

  /*function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
      setValue(e.target.value);
    }

    return [value, handleChange];
  }*/

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);

  /*const validateEmail = e => {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(e.target.value)) {
      validate.emailState = "has-success";
    } else {
      validate.emailState = "has-danger";
    }
    this.setState({ validate });
  };*/

  /*const handleChange = async event => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value
    });
  };*/

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

  function firstNameErrors() {
    var msg = "";
    if (errors.FirstName) {
      errors.FirstName.map((item, i) => {
        msg += item.message;
      });
    }

    return <p>{msg}</p>;
  }

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
                          errors.FirstName ? "has-danger" : "has-success"
                        }
                      >
                        <Controller
                          as={
                            <Input
                              autoFocus
                              ref={register()}
                              autoComplete="off"
                              name="FirstName"
                              placeholder={
                                errors.FirstName
                                  ? "Please enter your name"
                                  : "Name"
                              }
                              className={
                                errors.FirstName ? "is-invalid" : "is-valid"
                              }
                            />
                          }
                          name="FirstName"
                          control={control}
                        />
                      </FormGroup>

                      {/* <div className="container"> */}
                      {/* <section>
                          <label>Native Input:</label>
                          <input
                            name="firstName"
                            style={
                              errors.firstName
                                ? { backgroundColor: "pink" }
                                : { backgroundColor: "yellow" }
                            }
                            placeholder={
                              errors.firstName
                                ? "Please enter your name"
                                : "ex: John"
                            }
                            ref={register({ required: true, minLength: 10 })}
                          />
                        </section> */}
                      {/* //* Email */}
                      <FormGroup
                        className={errors.email ? "has-danger" : "has-success"}
                      >
                        {/* <label htmlFor="email">Email (Reactstrap) </label> */}
                        <Controller
                          as={
                            <Input
                              ref={register()}
                              autoComplete="off"
                              placeholder={
                                errors.email
                                  ? "Please enter your email"
                                  : "ex: johndoe@gmail.com"
                              }
                              className={
                                errors.email ? "is-invalid" : "is-valid"
                              }
                            />
                          }
                          name="email"
                          control={control}
                        />
                      </FormGroup>
                      {/* </div> */}
                      {data && (
                        <pre style={{ textAlign: "left" }}>
                          {JSON.stringify(data, null, 2)}
                        </pre>
                      )}
                      <button>submit</button>
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
