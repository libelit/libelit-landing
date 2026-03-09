import { count } from "console";
import { ErrorMessage, Field } from "formik";
import React, { useRef } from "react";
import country_codes from "./country_codes.json";

function PhoneField({ formik }: any) {
  const countries_code = { AU: 61, PL: 22 };
  const containerRef = useRef<any>();
  // ${
  //   //   containerRef?.current?.contains(document.focusedElement)
  // //   containerRef?.current?.matches(":focus-within") && " !border-red-400"
  // }

  const numToPhone = (num: string) => {
    const normalNum = num.split(" ").join("").split("");
    const formattedNum = [];

    let counter = 0;

    for (let num of normalNum) {
      if (counter % 3 == 0) {
        formattedNum.push(" ");
      }

      formattedNum.push(num);
      counter++;
    }

    return formattedNum.join("");
  };
  return (
    <div className={`form-field`}>
      <label className="form-label" htmlFor="email">
        Phone numbers
      </label>
      <div
        ref={containerRef}
        className={`${
          formik.touched["country"] || formik.touched["phoneNumber"]
            ? "error-formik.field"
            : ""
        }
        focus-within:shadow-accent-focus     
        pos-rel form-input-container flex items-center border rounded-[7px] 
        border-primary-200 max-w-[100%] w-[360px] bg-white`}
      >
        <Field
          className={`!border-0 !w-[72px] !pr-[22px]  text-lg text-primary-900`}
          type="select"
          as="select"
          id="country"
          name="country"
          //   placeholder={"Enter your email"}
          value={formik.values["country"]}
          onChange={formik.handleChange}
        >
          {Object.keys(countries_code).map((c) =>
            country_codes.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code}
              </option>
            ))
          )}
        </Field>

        <div className="flex items-center">
          <div className=" h-[48px] bg-white text-lg  text-primary-500 flex items-center pr-[0px]">
            {
              country_codes.find((c) => c.code == formik.values.country)
                ?.dial_code
            }
          </div>

          <Field
            className={`!border-0   focus:!shadow-none text-lg text-primary-500 pl-[2px]`}
            type="string"
            id="phoneNumber"
            name="phoneNumber"
            //   placeholder={"Enter your email"}
            value={formik.values["phoneNumber"]}
            onChange={(e: any) => {
              const val = e.target.value.split(" ").join("");

              if (!isNaN(val) && val.length <= 15) {
                e.target.value = numToPhone(e.target.value);
                formik.handleChange(e);
              } else {
                e.target.value = "";
              }
            }}
            onWheel={(e: any) => e.target.blur()}
          ></Field>
        </div>
      </div>
    </div>
  );
}

export default PhoneField;
