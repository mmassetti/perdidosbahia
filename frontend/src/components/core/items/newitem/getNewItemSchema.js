import * as yup from "yup";

export default function getNewItemSchema() {
  return yup.object().shape({
    description: yup
      .string()
      .required("Por favor escribí una descripción del objeto")
      .min(3, "La descripción es muy corta"),
    dateOfEvent: yup
      .date()
      .max(new Date(), "La fecha no puede ser posterior al día de hoy")
      .typeError("Por favor selecciona la fecha en que perdiste el objeto"),
    location: yup.string().required("Por favor escribí una ubicación"),
    itemCreatorQuestion: yup.string(),
  });
}
