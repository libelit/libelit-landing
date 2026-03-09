import React, { useState } from "react";
import styles from "./styles.module.scss";
import { initialValues, fields, formInfo, validationSchema } from "./formData";
import LibelitForm from "@/components/UiComponents/Forms/LibelitForm";
import FormButtons from "../FormButtons";
function Notifications() {
  const [formik, setFormik] = useState<any>();
  const handleSubmit = () => {
    console.log();
  };
  return (
    <div>
      <div className={styles.sectionContainer}>
        <div className="">
          <div className="d-h5">Notifications</div>
          <div className="text-md text-regular">Change your settings here.</div>
        </div>
        <div>
          <LibelitForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            fields={fields}
            formInfo={formInfo}
            class_name={"flex-col gap-8 mt-6"}
            renderSubmit={false}
            setFormik={setFormik}
          />
        </div>
      </div>
      <div className="divider-grey mt-8" />
      <FormButtons
        handleSubmit={() => console.log(formik.values)}
        handleReset={() => formik.resetForm()}
      />
    </div>
  );
}

export default Notifications;
