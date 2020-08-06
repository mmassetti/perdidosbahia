import * as yup from "yup";

export default function getLoginSchema() {
  return yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required("Por favor ingresa una contraseña de al menos 8 caracteres.")
      .min(8, "La contraseña debe tener al menos 8 caracteres."),
  });
}
