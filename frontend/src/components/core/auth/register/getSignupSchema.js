import * as yup from "yup";

export default function getSignUpSchema() {
  const phoneRegExp = /^[\d ]*$|^[0-9]+(-[0-9]+)+$/; //Numeros con espacio entre medio  o Numeros que aceptan un guion

  return yup.object().shape({
    firstName: yup.string().required("Por favor ingresa tu nombre"),
    lastName: yup.string().required("Por favor ingresa tu apellido"),
    email: yup.string().email().required(),
    password: yup
      .string()
      .required("Por favor ingresa una contraseña de al menos 8 caracteres.")
      .min(8, "La contraseña debe tener al menos 8 caracteres."),
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
        message: "El número contiene caracteres inválidos",
      })
      .test("phoneNumber", "El número debe tener al menos 7 dígitos", function (
        value
      ) {
        if (!!value) {
          const schema = yup.string().min(7);
          return schema.isValidSync(value);
        }
        return true;
      }),
  });
}
