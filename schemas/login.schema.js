import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("should be a valid email address")
    .required("this field is required"),
  password: Yup.string().required("this field is required"),
});

export default loginSchema;
