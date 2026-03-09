import React, { useEffect, useRef, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArrayConfig } from "formik";
import Link from "next/link";
import {
  approveToSell,
  getBalance,
  purchase,
  getPrice,
  listTokensForSale,
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

const ResaleForm: React.FC<LibelitFormProps> = ({
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
    numberOfBricks: number,
    brickPrice: number,
    propertyOwnershipContractAddress: string
  ) => {
    try {
      await listTokensForSale(
        numberOfBricks,
        brickPrice,
        propertyOwnershipContractAddress
      );
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
        setPrice(Number(price));
        //setPrice(99);
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
          values.brickPrice,
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
  const [risk, setRisk] = useState<string>("Low");

  if (!price && price != 0) {
    return "Loading...";
  }
  const newInitialValues = { ...initialValues };

  const calculateRiskLevel = (initialPrice: number, sellingPrice: number) => {
    let risk = "Low";
    if (sellingPrice < initialPrice + 0.05 * initialPrice) {
      risk = "Low";
    }

    if (sellingPrice >= initialPrice + 0.05 * initialPrice) {
      risk = "Medium";
    }

    if (sellingPrice >= initialPrice + 0.1 * initialPrice) {
      risk = "High degree";
    }

    if (sellingPrice >= initialPrice + 0.15 * initialPrice) {
      risk = "Very tall";
    }
    return risk;
  };
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
              {index == 3 && (
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
                              e.target.value *
                                Number(formik.values.brickPrice ?? 0)
                            );
                          }

                          if (field.name == "brickPrice") {
                            await formik.setFieldValue(
                              "total",
                              e.target.value *
                                Number(formik.values.numberOfBricks ?? 0)
                            );
                            setRisk(
                              calculateRiskLevel(price, e.target.value) ?? "Low"
                            );
                          }
                        }}
                        value={formik.values[field.name]}
                        disabled={field.name == "total"}
                        onWheel={(e: any) => e.target.blur()}
                      />
                      {field.name == "brickPrice" && (
                        <div className="mt-6 form-sublabel">
                          Purchase Risk: {risk}
                        </div>
                      )}
                      {field.name == "total" && (
                        <div className="mt-6 form-sublabel">
                          Transaction includes 2% fee:{" "}
                          {0.02 * formik.values["total"]} USDC
                        </div>
                      )}

                      {field.name != "brickPrice" &&
                      field.name != "total" &&
                      field.subLabel ? (
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

export default ResaleForm;
