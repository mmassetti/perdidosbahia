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
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../../common/providers/AuthProvider/auth-context";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import CustomNavbar from "../../../theme/Navbars/CustomNavbar.jsx";
import { useForm, Controller } from "react-hook-form";
import useAPIError from "common/hooks/useAPIError";
import getLoginQuery from "./getLoginQuery";
import getLoginSchema from "./getLoginSchema";

const Login = (props) => {
  const context = useContext(AuthContext);
  const { addError } = useAPIError();

  const defaultValues = {
    email: "",
    password: "",
  };

  const SigninSchema = getLoginSchema();

  const { handleSubmit, register, reset, control, errors, formState } = useForm(
    {
      mode: "onChange",
      validationSchema: SigninSchema,
      defaultValues,
    }
  );

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [[addError]]);

  const submitForm = async (data) => {
    let requestBody = getLoginQuery(data.email, data.password);

    fetch(localStorage.getItem("fetchUrl"), {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Falló el inicio de sesión");
        }
        return res.json();
      })
      .then((resData) => {
        if (resData.data.login.token) {
          context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration,
            resData.data.login.firstName,
            resData.data.login.hasPendingNotifications
          );
        }
      })
      .catch((err) => {
        addError(`${err}`);
      });

    reset({
      email: "",
      password: "",
    });
  };

  const showButtons = () => {
    return (
      <React.Fragment>
        <div className="text-center">
          <Button
            className="my-4"
            color="primary"
            disabled={formState.isValid ? false : true}
            type="submit"
          >
            Iniciar sesión
          </Button>
        </div>
        <br></br>
        <small className="text-center">
          <p>
            {" "}
            ¿Todavía no tenés una cuenta?{" "}
            <Link className="label font-weight-bold" to="/registro">
              Registrate
            </Link>
          </p>
        </small>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <CustomNavbar />
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
                <Card className="bg-secondary shadow border-0 text-center">
                  <CardHeader className="bg-white pb-3 font-weight-bold text-default">
                    Iniciar sesión
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form
                      noValidate
                      role="form"
                      onSubmit={handleSubmit(submitForm)}
                    >
                      {/* //* Email */}
                      <FormGroup
                        className={
                          !formState.touched.email &&
                          (formState.submitCount === 0 || formState.isSubmitted)
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
                              placeholder="Email"
                              className={
                                !formState.touched.email &&
                                (formState.submitCount === 0 ||
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
                          (formState.submitCount === 0 || formState.isSubmitted)
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
                              placeholder="Contraseña"
                              className={
                                !formState.touched.password &&
                                (formState.submitCount === 0 ||
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
                      {showButtons()}
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </React.Fragment>
  );
};

export default Login;
