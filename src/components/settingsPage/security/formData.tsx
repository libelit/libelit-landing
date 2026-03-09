import styles from "./styles.module.scss";
import * as Yup from "yup";

const passwordForm = {
  formInfo: {
    type: "passwordForm",
  },
  initialValues: {
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  },
  validationSchema: Yup.object({
    currentPassword: Yup.string().required("Required"),

    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    repeatNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null as any], "Passwords must match")
      .required("Confirm password is required"),
  }),
  fields: [
    {
      name: "currentPassword",
      label: "Current password",
      type: "password",
      placeholder: "Write current password",
      class_name: styles.currentPassword,
    },
    {
      name: "newPassword",
      label: "New password",
      type: "password",
      placeholder: "Create new password",
      class_name: styles.newPassword,
    },
    {
      name: "repeatNewPassword",
      label: "Repeat new password",
      type: "password",
      placeholder: "Repeat password",
      class_name: styles.repeatNewPassword,
    },
  ],
};

const authenticationForm = {
  formInfo: {
    type: "authenticationForm",
  },
  initialValues: {
    twoFactorVerificationType: "SMS",
    email: "filip@gmail.com",
  },
  validationSchema: Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
  }),
};

export { passwordForm, authenticationForm };
