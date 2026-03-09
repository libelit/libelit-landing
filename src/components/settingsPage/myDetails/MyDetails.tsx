import LibelitForm from "@/components/UiComponents/Forms/LibelitForm";
import UploadIcon from "@icons/general/upload-cloud-02.svg";
import UserIcon from "@icons/general/user.svg";
import styles from "./styles.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { validateFile } from "./utils";
import { initialValues, formInfo, validationSchema, fields } from "./formData";
import { useAlert } from "@/contexts/AlertContext";
import FormButtons from "../FormButtons";
import axiosClient from "@/app/axiosClient";
import requests from "@/Api/requests";
import FormData from "form-data";
import { useContainer } from "@/contexts/ContainerContext";
import Button from "@/components/UiComponents/Button/Button";

function MyDetails({ data, fetchData, setData }: any) {
  const [formik, setFormik] = useState<any>();
  const [image, setImage] = useState<any>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tempImageUrl = data.imageUrl;

  const { alert } = useAlert();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const userDetails = { ...formik.values };

    if (Object.keys(formik.errors).length) {
      console.log("Form has errors. ");
      return;
    }

    if (image) {
      const data = new FormData();
      data.append("file", image, image.name);
      await axiosClient
        .post(requests.settings.uploadImage, data, {
          headers: {
            "Content-Type": `multipart/form-data; `,
          },
        })
        // .then((response) => alert("Image updated successfully.", "success"))
        .catch((error) => console.log(error));
    } else {
      userDetails.imageUrl = null;
    }

    if (image == null) {
      userDetails.imageUrl = null;
    }

    await axiosClient
      .put(requests.settings.updateData + `/${data.id}`, { ...userDetails })
      .then(async (response) => {
        if (response.status == 200) {
          if (!userDetails.imageUrl) {
            setData({ ...userDetails, imageUrl: tempImageUrl });
          } else {
            setData({ ...userDetails });
          }
          await fetchData();
          alert(
            `Data updated successfully.
             ${
               //   image ? "Please refresh to see the new image." : ""
               //
               ""
             }
            `,
            "success"
          );
        }
      })
      .catch((error) => console.log(error));

    setIsSubmitting(false);
  };

  const handleDrag = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = async (e: any) => {
    e.preventDefault();
    handleUpload(e.dataTransfer.files[0]);
  };

  const handleClickUpload = async (e: any) => {
    handleUpload(e.target.files[0]);
  };

  const handleUpload = async (file: any) => {
    const imageFile = file;
    const validation = await validateFile(imageFile);

    if (validation.valid) {
      setImage(imageFile);
      return;
    }

    handleError(validation);
  };

  const handleError = (validation: any) => {
    if (validation.errorType == "type") {
      alert("The type of file is not supported.", "error");
      return;
    }

    if (validation.errorType == "dimension") {
      alert("Image size should be less than 800 x 400px", "error");
      return;
    }
  };

  const initialValues = {
    username: data.username,
    email: data.email,
    qualification: data.qualification ?? "",
    displayRole: data.displayRole ?? "",
  };

  if (!data) return "Loading...";
  return (
    <div>
      <div className={styles.mainContainer + " pos-rel"}>
        <div>
          <div className="d-h5">Profile info</div>
          <div className="text-md text-regular">
            Update your personal information here.{" "}
          </div>
        </div>
        <div className={` ${styles.container}`}>
          <LibelitForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            fields={fields}
            formInfo={formInfo}
            class_name={styles.form_container}
            renderSubmit={false}
            setFormik={setFormik}
          />
          <div className="flex gap-24">
            <div className="flex-col flex-center gap-16">
              {!image ? (
                data?.imageUrl && image === undefined ? (
                  <div className={styles.picContainer + " bg-white"}>
                    <Image
                      src={data.imageUrl}
                      alt=""
                      width={1000}
                      height={1000}
                      className={styles.userImage}
                      unoptimized
                    />
                  </div>
                ) : (
                  <div
                    className={styles.picContainer + " bg-color-secondary-400"}
                  >
                    <UserIcon className={styles.userIcon + " icon-white"} />
                  </div>
                )
              ) : (
                <div className={styles.picContainer + " bg-white"}>
                  <Image
                    src={URL.createObjectURL(image)}
                    alt=""
                    className={styles.userImage}
                    width={100}
                    height={100}
                  />
                </div>
              )}

              <div>
                <Button
                  hierarchy="secondary"
                  className={`text-sm text-semiBold handcursor ${styles.deleteButton}`}
                  onClick={() => setImage(null)}
                  text="Delete"
                />
              </div>
            </div>

            <label
              htmlFor="file"
              className={`${styles.fileUpload} text-md text-regular color-gray-500 handcursor`}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                id="file"
                type="file"
                className={styles.fileInput}
                onChange={handleClickUpload}
                accept=".png,.jpg,.jpeg"
              />
              <div className={`bg-color-accent-25 ${styles.iconContainer}`}>
                <UploadIcon />
              </div>
              <div className="text-center">
                <span className="text-md text-semiBold color-accent-500">
                  Click to upload
                </span>{" "}
                or drag and drop.
              </div>
              <div className="text-center">PNG or JPG (max. 800x400px)</div>
            </label>
          </div>
        </div>
      </div>
      <div className="divider-grey" />
      <FormButtons
        handleSubmit={handleSubmit}
        handleReset={() => {
          formik.resetForm();
          setImage(undefined);
        }}
        isDisabled={isSubmitting}
      />
    </div>
  );
}

export default MyDetails;
