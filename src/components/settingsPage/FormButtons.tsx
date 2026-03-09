import React from "react";
import styles from "./styles.module.scss";
import Button from "../UiComponents/Button/Button";
function FormButtons({
  handleSubmit,
  handleReset,
  isDisabled,
}: {
  handleSubmit: any;
  handleReset: any;
  isDisabled?: boolean;
}) {
  return (
    <div className={styles.buttons}>
      {isDisabled && <div className="loading !border-[3px] !w-6 !h-6"></div>}

      <Button
        hierarchy="secondary"
        className={` box-border text-lg text-semiBold handcursor ${styles.cancelButton}`}
        onClick={handleReset}
        disabled={isDisabled}
        text="Cancel"
      />

      <Button
        hierarchy="primary"
        size="lg"
        className={` box-border text-lg text-semiBold form-btn handcursor ${styles.button}`}
        onClick={handleSubmit}
        disabled={isDisabled}
        text="Save Changes"
      />
    </div>
  );
}

export default FormButtons;
