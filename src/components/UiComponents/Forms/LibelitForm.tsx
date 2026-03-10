// This is a generic form for Login, Signup and Forgot password user forms
"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FieldArrayConfig,
  useFormik,
  FormikProvider,
} from "formik";
import Link from "next/link";
import { Parser } from "html-to-react";

import EyeOpenIcon from "../../../../public/icons/general/icon-eye-open.svg";
import EyeClosedIcon from "../../../../public/icons/general/icon-eye-close.svg";
import Button from "@/components/UiComponents/Button/Button";
import { useRouter } from "next/router";
import { Playfair_Display_SC } from "next/font/google";
import ReCAPTCHA from "react-google-recaptcha";
import axiosClient from "@/app/axiosClient";

interface LibelitFormProps {
  initialValues: any;
  onSubmit?: (values: any) => void;
  validationSchema: any;
  class_name?: string;
  fields: {
    name: string;
    label: string;
    type: string;
    placeholder?: any;
    subLabel?: string;
    class_name?: string;
    options?: any;
    center?: boolean;
    disabled?: boolean;
  }[];
  formInfo: any;
  renderSubmit?: Boolean;
  setFormik?: any;
  disableSubmit?: Boolean;
  captcha?: Boolean;
}

const LibelitForm: React.FC<LibelitFormProps> = ({
  initialValues,
  onSubmit,
  validationSchema,
  fields,
  formInfo,
  class_name,
  renderSubmit,
  setFormik,
  disableSubmit,
  captcha,
}) => {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit ? onSubmit : (values: any) => {},
    validationSchema: validationSchema,
    validateOnChange: true,
  });

  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef<any>();

  const handleCaptchaChange = async (val: string) => {
    const response = await axiosClient.post("/user/validateCaptcha", {
      responseToken: val,
    });

    if (response.data.success) {
      setCaptchaToken(val);
      console.log(val);
    } else {
      captchaRef.current.reset();
      setCaptchaToken("");
    }
  };

  useEffect(() => {
    const refreshCaptcha = () => {
      if (captchaRef.current && captchaToken) {
        captchaRef.current.reset();
        setCaptchaToken("");
      }
    };

    let tokenRefreshTimeout: NodeJS.Timeout | null = null;

    if (captchaToken) {
      tokenRefreshTimeout = setTimeout(refreshCaptcha, 120000); // 120 seconds
    }

    return () => {
      if (tokenRefreshTimeout) {
        clearTimeout(tokenRefreshTimeout);
      }
    };
  }, [captchaToken]);

  const [autoFilledFields, setAutoFilledFields] = useState<any[]>([]);

  const [showPassword, setShowPassword] = useState<any>({});

  const [isFormReady, setIsFormReady] = useState(false);
  const togglePasswordVisibility = (name: string) => {
    setShowPassword({ ...showPassword, [name]: !showPassword[name] });
  };

  // const htmlToReactParser = new Parser();

  useEffect(() => {
    if (setFormik) {
      setFormik(formik);
    }
  }, [formik.values, formik.errors]);

  useLayoutEffect(() => {
    console.log("Adding event listener for animationstart");
    const handleAnimationStart = (e: any) => {
      console.log(e.target.name);
      setAutoFilledFields((prevFields) => [...prevFields, e.target.name]);
    };

    document.addEventListener("animationstart", handleAnimationStart);
    setIsFormReady(true);
  }, [autoFilledFields]);

  const router = useRouter();
  useEffect(() => {
    if (formInfo.type != "loginform") return;

    if (router.query.email) {
      formik.setFieldValue("username", router.query.email);
    }
  }, [router.query]);

  const [touchedFields, setTouchedFields] = useState<any[]>([]);

  useEffect(() => {
    fields.forEach((field) => {
      formik.setFieldTouched(field.name, true);
    });
  }, []);

  const isSubmitDisabled = () => {
    return fields.some((field: any) => {
      let res = false;
      if (formik.errors[field.name]) {
        if (
          !touchedFields.includes(field.name) &&
          !autoFilledFields.includes(field.name)
        ) {
          res = true;
          console.log("1");
        }

        if (touchedFields.includes(field.name)) {
          res = true;
          console.log("error", field.name);
        }
      }

      if (!touchedFields.includes(field.name)) {
      }
      // if (
      //   !touchedFields.includes(field.name) &&
      //   !autoFilledFields.includes(field.name)
      // ) {
      //   console.log("untouched", field.name);
      //   res = true; // Disable submit if the field is neither touched nor autofilled
      // }

      return res; // If no errors or untouched fields, continue checking other fields
    });
  };

  console.log(autoFilledFields, isSubmitDisabled(), formik.touched);
  return (
    isFormReady && (
      <FormikProvider value={formik}>
        <form className={class_name} onSubmit={(e) => e.preventDefault()}>
          <div className="hidden">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" />
          </div>
          {fields.map((field, index) => (
            <div
              key={field.name}
              className={`form-field-each ${field?.class_name}`}
            >
              <div className={`form-field`}>
                {field.label && (
                  <label className="form-label" htmlFor={field.name}>
                    {field.label}
                  </label>
                )}

                {/* if field type is checkbox, render this part */}
                {field.type === "checkbox" && (
                  <div
                    className={`form-checkbox-area ${
                      field.center && "flex-align-center"
                    }`}
                  >
                    <Field
                      className={`form-checkbox ${
                        touchedFields.includes(field.name) &&
                        formik.errors[field.name]
                          ? "error-field-checkbox"
                          : ""
                      }  `}
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder ? field.placeholder : ""}
                      disabled={field?.disabled}
                      onBlur={() =>
                        setTouchedFields([...touchedFields, field.name])
                      }
                    ></Field>
                    <div className="checkbox-text text-sm">
                      {field.placeholder}
                    </div>
                    {/* <span dangerouslySetInnerHTML={{__html: JSON.stringify(field.placeholder)}} /> */}
                  </div>
                )}
                {/* checkbox part end */}

                {/* if field type is neither checkbox nor radio, render this */}
                {field.type != "checkbox" && field.type != "radio" && (
                  <div className={`pos-rel form-input-container `}>
                    <Field
                      className={`text-lg                        
                    ${
                      touchedFields.includes(field.name) &&
                      formik.errors[field.name]
                        ? "error-field"
                        : ""
                    }

                    ${
                      field.type == "select" &&
                      !formik.values[field.name] &&
                      "text-primary-500"
                    }
                     `}
                      type={
                        field.type === "password"
                          ? showPassword[field.name]
                            ? "text"
                            : "password"
                          : field.type
                      }
                      {...(field.type == "select"
                        ? { as: "select" }
                        : { as: "input" })}
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder ? field.placeholder : ""}
                      disabled={field?.disabled}
                      onBlur={() =>
                        setTouchedFields([...touchedFields, field.name])
                      }
                    >
                      {field.type == "select" ? (
                        <>
                          {!formik.values[field.name] &&
                            !formik.initialValues[field.name] &&
                            field.placeholder && (
                              <option
                                key={field.placeholder}
                                value=""
                                disabled
                                selected
                                className="text-primary-500"
                              >
                                {field.placeholder}
                              </option>
                            )}
                          {field.options.map((option: any) => (
                            <option
                              key={option.value}
                              value={option.value}
                              className="text-primary-900"
                            >
                              {option.label}
                            </option>
                          ))}
                        </>
                      ) : null}
                    </Field>
                    {field.subLabel ? (
                      <div className="form-sublabel">{field.subLabel}</div>
                    ) : (
                      ""
                    )}
                    {field.type === "password" &&
                      !formik.errors[field.name] && (
                        <div
                          className={`eye-icon ${
                            showPassword[field.name]
                              ? "eye-icon-open"
                              : "eye-icon-close"
                          }`}
                          onClick={() => togglePasswordVisibility(field.name)}
                        >
                          {showPassword[field.name] ? (
                            <EyeOpenIcon className="eye-icon-open" />
                          ) : (
                            <EyeClosedIcon className="eye-icon-close " />
                          )}
                        </div>
                      )}
                  </div>
                )}
                {touchedFields.includes(field.name) && (
                  <ErrorMessage
                    className="error form-error-section"
                    name={field.name}
                    component="div"
                  />
                )}
              </div>
              {/* special case for having a link between form element for login page */}
              {formInfo.type === "loginform" && field.type === "password" && (
                <div className="forgot-pw ">
                  <Link href="/user/forgot-password">Forgot password?</Link>
                </div>
              )}
            </div>
          ))}

          {captcha && (
            <div className="w-full ">
              <ReCAPTCHA
                sitekey="6LejinYqAAAAABV5gGqwQbDlJwABBWLrXVYc9y65"
                onChange={(val) => handleCaptchaChange(val as string)}
                className="w-[900px] g-recaptcha"
                size="normal"
                ref={captchaRef}
                onExpired={() => setCaptchaToken("")}
              />
            </div>
          )}
          {renderSubmit && onSubmit && (
            <div>
              {/* <button
              className=" btn btn-contained text-lg form-btn handcursor"
              onClick={(e) => {
                e.preventDefault();
                onSubmit(formik.values);
              }}
            >
              {formInfo.formButtonText!}
            </button> */}

              <Button
                type="submit"
                text={formInfo.formButtonText}
                onClick={async (e: Event) => {
                  e.preventDefault();
                  const touchedFields = Object.keys(formik.values).reduce(
                    (acc: any, fieldName) => {
                      acc[fieldName] = true;
                      return acc;
                    },
                    {}
                  );

                  // Mark all fields as touched
                  await formik.setTouched(touchedFields);
                  console.log(formik.errors);
                  if (
                    Object.keys(formik.errors).length == 0 &&
                    formik.isValid
                  ) {
                    formik.handleSubmit();
                  }
                }}
                hierarchy="primary"
                size="xl"
                className="sm-mt-12 mt-24 w-100p"
                icon="none"
                disabled={
                  (disableSubmit && !!isSubmitDisabled()) ||
                  (captcha && !captchaToken.length)
                }
              />
            </div>
          )}
        </form>
      </FormikProvider>
    )
  );
};

LibelitForm.defaultProps = {
  renderSubmit: true,
};
export default LibelitForm;
