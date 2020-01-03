import { parseOnlyLetterAndSpace } from "../services/inputParser";
import {
  checkAtLeastLength,
  checkEmailPattern,
  checkIsfilled
} from "../services/inputValidator";

const registrationModel = [
  {
    name: "name",
    label: "Name",
    type: "text",
    parseFun: parseOnlyLetterAndSpace,
    validators: [
      {
        id: "name-length",
        isValidFun: expression => checkAtLeastLength(expression, 3),
        alert: "El nombre es demasiado corto"
      }
    ]
  },
  {
    name: "mail",
    label: "Email",
    type: "text",
    validators: [
      {
        id: "mail-pattern",
        isValidFun: checkEmailPattern,
        alert: "Email no válido"
      },
      {
        id: "email-required",
        isValidFun: checkIsfilled,
        alert: "Ingresa tu email"
      }
    ]
  },
  {
    name: "password",
    label: "Password",
    type: "text",
    parseFun: parseOnlyLetterAndSpace,
    validators: [
      {
        id: "password-length",
        isValidFun: expression => checkAtLeastLength(expression, 6),
        alert: "La contraseña debe tener al menos 6 caracteres"
      }
    ]
  }
];

export default registrationModel;
