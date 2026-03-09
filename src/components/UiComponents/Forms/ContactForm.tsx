"use client";
import React, { useEffect, useRef } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from "../Modal";
import closeIcon from "@icons/general/x-close-black-lg.svg?url";
import Image from "next/image";
import Button from "../Button/Button";
function ContactForm({ isOpen, closeModal }: any) {
  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your name",
      class_name: "text-base w-full col-span-2 md:col-span-1",
    },
    {
      name: "wt",
      label: "Whatsapp/ Telegram",
      type: "text",
      placeholder: "Enter your number",
      class_name: "text-base w-full col-span-2 md:col-span-1",
    },

    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      class_name: "text-base w-full col-span-2",
    },

    {
      name: "message",
      label: "Message",
      type: "textarea",
      placeholder: "Enter your message",
      class_name: "text-base w-full col-span-2",
    },
  ];
  const initial_values = {
    email: "",
    message: "",
    name: "",
    wt: "",
  };

  const formInfo = {
    type: "contact form",
    formButtonText: "Send message",
  };
  // price: Yup.string().email("Invalid email address").required("Required"),
  // password: Yup.string().required("Required"),
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    wt: Yup.string().matches(/^[0-9]+$/, "Must be only digits"),
    email: Yup.string().email("Invalid email address").required("Required"),
    message: Yup.string().required("Required"),
  });
  const handleSubmit = (data: any) => {
    console.log(data);
  };

  const modalRef = useRef<any>(null);

  const handleOutsideClick = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      className="w-[95%] max-w-[770px]  p-0 overflow-hidden !h-fit"
    >
      <div
        className="max-h-[calc(100vh-180px)] md:max-h-[calc(100vh-100px)] overflow-auto p-4 md:p-8 "
        ref={modalRef}
      >
        <div className="flex justify-end h-11 cursor-pointer">
          <Image src={closeIcon} onClick={closeModal} alt="close icon" />
        </div>

        <div className="text-2xl md:text-3xl md:leading-[2.357rem] lg:text-4xl lg:leading-[2.75rem] font-bold text-center">
          Write to us
        </div>
        <div className="mt-2 text-center text-primary-600 text-base md:text-lg md:leading-[1.625rem] md:font-medium">
          We’ll reply to you within 7 days.
        </div>
        <div className="form-container !w-full !max-w-full mt-32">
          <div className="form">
            <Formik
              initialValues={initial_values}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {(formik) => (
                <Form className="">
                  <div className="flex flex-col md:flex-row gap-5 justify-between w-full">
                    <div key={"name"} className={"form-field-each w-full "}>
                      <div className={`form-field `}>
                        <label className="form-label" htmlFor={"name"}>
                          Name
                        </label>

                        <div className=" pos-rel">
                          <Field
                            className={`
                             !max-w-full ${
                               formik.errors["name"] ? "error-field" : ""
                             }`}
                            type={"text"}
                            id={"name"}
                            name={"name"}
                            placeholder={"Enter your name"}
                            onChange={(e: any) => {
                              formik.handleChange(e);
                            }}
                            value={formik.values["name"]}
                          />
                        </div>

                        <ErrorMessage
                          className="error form-error-section "
                          name={"name"}
                          component="div"
                        />
                      </div>
                    </div>
                    <div key={"wt"} className={"form-field-each  w-full"}>
                      <div className={`form-field `}>
                        <label className="form-label" htmlFor={"wt"}>
                          Whatsapp/ Telegram
                        </label>

                        <div className=" pos-rel">
                          <Field
                            className={`
                              !max-w-full ${
                                formik.errors["wt"] ? "error-field" : ""
                              }`}
                            type={"text"}
                            id={"wt"}
                            name={"wt"}
                            placeholder={"Enter your number"}
                            onChange={(e: any) => {
                              formik.handleChange(e);
                            }}
                            value={formik.values["wt"]}
                          />
                        </div>

                        <ErrorMessage
                          className="error form-error-section "
                          name={"wt"}
                          component="div"
                        />
                      </div>
                    </div>
                  </div>

                  <div key={"email"} className={"form-field-each  mt-5"}>
                    <div className={`form-field `}>
                      <label className="form-label" htmlFor={"email"}>
                        Email
                      </label>

                      <div className="   pos-rel">
                        <Field
                          className={`
                              !max-w-full ${
                                formik.touched["email"] &&
                                formik.errors["email"]
                                  ? "error-field"
                                  : ""
                              }`}
                          type={"email"}
                          id={"email"}
                          name={"email"}
                          placeholder={"Enter your email"}
                          onChange={(e: any) => {
                            formik.handleChange(e);
                          }}
                          value={formik.values["email"]}
                        />
                      </div>

                      <ErrorMessage
                        className="error form-error-section "
                        name={"email"}
                        component="div"
                      />
                    </div>
                  </div>

                  <div key={"message"} className={"form-field-each  mt-5"}>
                    <div className={`form-field !w-full !max-w-full`}>
                      <label className="form-label" htmlFor={"message"}>
                        Message
                      </label>

                      <div className=" pos-rel">
                        <textarea
                          id={"message"}
                          name={"message"}
                          className={`h-[112px] -mb-1 resize-none ${
                            formik.touched["message"] &&
                            formik.errors["message"]
                              ? "error-field"
                              : ""
                          }`}
                          onChange={(e: any) => {
                            formik.handleChange(e);
                          }}
                          value={formik.values["message"]}
                          placeholder="Enter yout message"
                        ></textarea>
                      </div>

                      <ErrorMessage
                        className="error form-error-section "
                        name={"message"}
                        component="div"
                      />
                    </div>
                  </div>

                  <div className=" flex justify-center w-full mt-32">
                    <Button
                      hierarchy="accent"
                      size="lg"
                      text={"Send Message"}
                      type="submit"
                      className=" text-base font-semibold"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ContactForm;
