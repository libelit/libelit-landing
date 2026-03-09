import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FieldArrayConfig,
  useFormik,
  FormikProvider,
} from "formik";

import { authenticationForm } from "./formData";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import CheckIcon from "@icons/general/check.svg";
import { useContainer } from "@/contexts/ContainerContext";
import PhoneField from "./PhoneField";

function AuthMethodForm({ setFormik }: { setFormik: any }) {
  const { user } = useContainer();

  const formik = useFormik({
    initialValues: {
      email: user.email,
      twoFactorVerificationType: user.twoFactorAuthenticationEnabled
        ? user.twoFactorVerificationType
        : "",
      country: "AU",
      phoneNumber: null,
    },
    onSubmit: async (values: any) => {},
    validationSchema: authenticationForm.validationSchema,
  });

  useEffect(() => {
    setFormik(formik);
  }, [formik.values, formik.errors]);

  return (
    <FormikProvider value={formik}>
      <div className={`form-field-each`}>
        <div className={`form-field`}>
          {/* <label className="form-label" htmlFor={`twoFactorVerificationType`}>
            Choose method
          </label> */}

          <div className="flex-col gap-24">
            <label
              className={`${styles.radioOption}  ${
                formik.values.twoFactorVerificationType == "EMAIL" &&
                styles.selectedRadioOption
              }`}
              onClick={(e) => {
                if (formik.values.twoFactorVerificationType == "EMAIL") {
                  e.preventDefault();

                  formik.setValues({
                    ...formik.values,
                    twoFactorVerificationType: null,
                  });
                  e.stopPropagation();
                }
              }}
            >
              <Field
                type="radio"
                name="twoFactorVerificationType"
                value="EMAIL"
                className={styles.radioButton + " accent-primary-700"}
              />
              <div className={styles.radioLabel}>
                <div className="text-sm color-primary-700">Email</div>
                <div className="text-sm color-primary-500">
                  Recieve a unique code via email.
                </div>
              </div>

              {formik.values.twoFactorVerificationType == "EMAIL" && (
                <div className={styles.tickContainer}>
                  <CheckIcon className={styles.tickIcon} />
                </div>
              )}
            </label>

            {/* <label
              className={`${styles.radioOption}  ${
                formik.values.twoFactorVerificationType == "SMS" &&
                styles.selectedRadioOption
              }`}
              onClick={(e) => {
                if (formik.values.twoFactorVerificationType == "SMS") {
                  e.preventDefault();

                  formik.setValues({
                    ...formik.values,
                    twoFactorVerificationType: null,
                  });
                  e.stopPropagation();
                }
              }}
            >
              <Field
                type="radio"
                name="twoFactorVerificationType"
                value="SMS"
                className={styles.radioButton + " accent-primary-700"}
              />
              <div className={styles.radioLabel}>
                <div className="text-sm color-primary-700">SMS</div>
                <div className="text-sm color-primary-500">
                  Recieve a unique code via SMS.
                </div>
              </div>

              {formik.values.twoFactorVerificationType == "SMS" && (
                <div className={styles.tickContainer}>
                  <CheckIcon className={styles.tickIcon} />
                </div>
              )}
            </label> */}
          </div>

          {/* email  */}
          <div className={`form-field-each mt-24`}>
            {formik.values.twoFactorVerificationType == "EMAIL" && (
              <div className={`form-field`}>
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <div className="pos-rel form-input-container">
                  <Field
                    className={`${
                      formik.touched["email"] && formik.errors["email"]
                        ? "error-formik.field"
                        : ""
                    } text-lg`}
                    type="email"
                    id="email"
                    name="email"
                    placeholder={"Enter your email"}
                    value={formik.values["email"]}
                    onChange={formik.handleChange}
                    disabled
                  ></Field>
                </div>
                <ErrorMessage
                  className="error form-error-section"
                  name={"email"}
                  component="div"
                />
              </div>
            )}

            {formik.values.twoFactorVerificationType == "SMS" && (
              <PhoneField formik={formik} />
            )}
          </div>
        </div>
      </div>
    </FormikProvider>
  );
}

export default AuthMethodForm;
