import * as yup from "yup";

export const userFormValidationSchema = yup.object()
  .shape({
    firstName: yup
      .string()
      .required("First name is required")
      .min(3, "First name must be at least 3 characters"),
    lastName: yup
      .string()
      .required("Last name is required")
      .min(3, "Last name must be at least 3 characters"),
    email: yup
      .string()
      .email("example@gmail.com")
      .required("Email is required"),

    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .length(10),

    address: yup
      .string()
      .required("Address is required")
      .min(3, "Address must be at least 3 characters"),

    zipCode: yup
    .string()
    .required("Zip Code is required")
    .matches(/^[0-9]{6}$/, "Zip Code must be exactly 6 digits"),

    gender: yup
      .object({
        value: yup.string().required(),
        label: yup.string().required()
      })
      .required("Gender is required"),
  });
