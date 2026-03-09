import styles from "./styles.module.scss";
import * as Yup from "yup";

const initialValues = {
  checkbox1: "",
  checkbox2: "",
};

const formInfo = {
  type: "notificationsForm",
};

const validationSchema = Yup.object({});

const fields = [
  {
    name: "checkbox1",
    label: "",
    type: "checkbox",
    placeholder: <>Notify me when...</>,
    center: true,
  },
  {
    name: "checkbox2",
    label: "",
    type: "checkbox",
    placeholder: <>Notify me when...</>,
    center: true,
  },
];

export { initialValues, formInfo, validationSchema, fields };
