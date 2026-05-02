export const logininitialValues = {
  email: "",
  password: "",
};




export const LoginSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Email should be valid"),
  password: Yup.string()
    .trim()
    .required("Password is required")
    .min(6, "Minimum six character is required"),
});