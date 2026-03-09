import React, { useEffect, useRef, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArrayConfig } from "formik";
import Link from "next/link";
import {
  approveToSell,
  getBalance,
  purchase,
  getPrice,
  listTokensForSale,
  resellBackTokens,
} from "./utils";
import { useContainer } from "@/contexts/ContainerContext";
import { useAlert } from "@/contexts/AlertContext";
import styles from "./styles.module.scss";

interface LibelitFormProps {
  initialValues: any;
  onSubmit: () => void;
  validationSchema: any;
  fields: {
    name: string;
    label: string;
    type: string;
    placeholder: any;
    subLabel?: string;
  }[];
  formInfo: any;
  handleError: (error: any) => void;
  handleSucccess: any;
  propertyOwnershipContractAddress: string;
}

const SellBackForm: React.FC<LibelitFormProps> = ({
  initialValues,
  onSubmit,

  validationSchema,
  fields,
  formInfo,
  handleError,
  handleSucccess,
  propertyOwnershipContractAddress,
}) => {
  const { accounts, setTransaction } = useContainer();
  const [price, setPrice] = useState<any>();

  const handleSellBack = async (
    value: number,
    propertyOwnershipContractAddress: string
  ) => {
    try {
      await resellBackTokens(value, propertyOwnershipContractAddress);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (accounts?.length) {
      getPrice(propertyOwnershipContractAddress).then((price) => {
        if (!price && price != 0) {
          handleError({ code: "NO_PRICE" });
          return;
        }
        // setPrice(price);
        setPrice(80);
      });
    } else {
      handleError({ code: "NO_WALLET" });
    }
  }, []);

  const handleSubmit = async (values: any) => {
    onSubmit();

    const totalPrice = values.total;

    if (!window.ethereum || !window.ethereum.isMetaMask) {
      handleError({ code: "NO_METAMASK" });
      return;
    }

    if (accounts?.length) {
      const balance = (await getBalance(accounts[0].address)) ?? 0;

      // if (balance < totalPrice) {
      //   handleError({ code: "INSUFFICIENT_BALANCE" });
      //   return;
      // }

      try {
        await handleSellBack(
          values.numberOfBricks,
          propertyOwnershipContractAddress
        );
        handleSucccess(values);
        return;
      } catch (error) {
        handleError(error);
      }
    } else {
      handleError({ code: "NO_WALLET" });
    }
  };

  if (!price && price != 0) {
    return "Loading...";
  }
  const newInitialValues = { ...initialValues, total: Number(price) };
  return (
    <Formik
      initialValues={newInitialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form className="flex-col flex-col-center ">
          {fields.map((field, index) => (
            <>
              {index == 2 && (
                <div className="text-semiBold text-md mb-[32px] ">
                  Note: All the values are based on the current exchange rate.
                </div>
              )}
              <div
                key={field.name}
                className={`form-field-each mb-[20px] ${
                  field.type == "checkbox" && "mb-[6px]"
                }`}
              >
                <div className={`form-field`}>
                  {field.label && (
                    <label className="form-label" htmlFor={field.name}>
                      {field.label}
                    </label>
                  )}

                  {field.type === "checkbox" ? (
                    <div className="form-checkbox-area ">
                      <Field
                        className={` form-checkbox ${
                          formik.touched[field.name] &&
                          formik.errors[field.name]
                            ? "error-field-checkbox"
                            : ""
                        }`}
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder ? field.placeholder : ""}
                        onChange={async (e: any) => {
                          formik.handleChange(e);
                          if (
                            field.name == "select-all" &&
                            formik.values["select-all"] == false
                          ) {
                            await formik.setFieldValue(
                              "terms-and-conditions",
                              true
                            );
                            await formik.setFieldValue("privacy-policy", true);
                            await formik.setFieldValue("newsletter", true);
                          }
                        }}
                      ></Field>
                      <div className="checkbox-text text-sm">
                        {field.placeholder}

                        <ErrorMessage
                          className="error form-error-section"
                          name={field.name}
                          component="div"
                        />
                      </div>
                      {/* <span dangerouslySetInnerHTML={{__html: JSON.stringify(field.placeholder)}} /> */}
                    </div>
                  ) : (
                    <div className="pos-rel">
                      <Field
                        className={
                          formik.touched[field.name] &&
                          formik.errors[field.name]
                            ? "error-field"
                            : ""
                        }
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder ? field.placeholder : ""}
                        onChange={async (e: any) => {
                          await formik.handleChange(e);
                          if (field.name == "numberOfBricks") {
                            await formik.setFieldValue(
                              "total",
                              e.target.value * Number(price ?? 0)
                            );
                          }
                        }}
                        value={formik.values[field.name]}
                        disabled={field.name == "total"}
                        onWheel={(e: any) => e.target.blur()}
                      />
                      {field.name == "total" ? (
                        <div className="mt-6 form-sublabel">
                          Transaction includes 2% fee:{" "}
                          {0.02 * formik.values["total"]} USDC
                        </div>
                      ) : field.subLabel ? (
                        <div className="mt-6 form-sublabel">
                          {field.subLabel}
                        </div>
                      ) : (
                        ""
                      )}
                      {field.name == "total" && (
                        <div
                          className={`pos-abs tex-lg text-regular ${styles.usdc}`}
                        >
                          USDC
                        </div>
                      )}
                    </div>
                  )}
                  {field.type != "checkbox" && (
                    <ErrorMessage
                      className="error form-error-section"
                      name={field.name}
                      component="div"
                    />
                  )}
                </div>
                {/* special case for having a link between form element for login page */}
              </div>
            </>
          ))}
          <div>
            <button
              type="submit"
              className="btn btn-contained text-lg form-btn"
            >
              Confirm
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SellBackForm;
