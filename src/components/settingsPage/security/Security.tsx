import { useState } from "react";
import styles from "./styles.module.scss";
import { passwordForm } from "./formData";
import LibelitForm from "@/components/UiComponents/Forms/LibelitForm";
import AuthMethodForm from "./AuthMethodForm";
import FormButtons from "../FormButtons";
import axiosClient from "@/app/axiosClient";
import { useContainer } from "@/contexts/ContainerContext";
import { useAlert } from "@/contexts/AlertContext";
import Button from "@/components/UiComponents/Button/Button";
import Modal from "@/components/UiComponents/Modal";
import CloseIcon from "@icons/general/x-close.svg";
import DeleteIcon from "@icons/general/delete-red.svg";
import * as Yup from "yup";
import { logout } from "@/utility/auth";
import { useRouter } from "next/router";

function Security() {
  const [passwordFormik, setPasswordFormik] = useState<any>();
  const [authFormik, setAuthFormik] = useState<any>();
  const [deleteConfirmationFormik, setDeleteConfirmationFormik] =
    useState<any>();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { user, setUser } = useContainer();
  const { alert } = useAlert();
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);
  const [isAuthSubmitting, setIsAuthSubmitting] = useState(false);
  const router = useRouter();
  // const handleSubmit = async () => {
  //   if (
  //     Object.keys(passwordFormik.errors).length ||
  //     Object.keys(authFormik.errors).length
  //   ) {
  //     console.log("Form has errors. ");
  //     return;
  //   }

  //   //2FA submit
  //   try {
  //     if (!authFormik.values.twoFactorVerificationType?.length) {
  //       const response = await axiosClient.get(
  //         "/user/enableTwoFactorAuthentication/" + user.id + "?disable=true"
  //       );
  //       if (response.status != 200) {
  //         alert("Some error occured. Please try again later", "error");
  //         return;
  //       }

  //       setUser({ ...user, twoFactorAuthenticationEnabled: false });
  //     } else {
  //       const response = await axiosClient.get(
  //         "/user/enableTwoFactorAuthentication/" + user.id
  //       );

  //       if (response.status != 200) {
  //         alert("Some error occured. Please try again later", "error");
  //         return;
  //       }

  //       setUser({ ...user, twoFactorAuthenticationEnabled: true });
  //     }
  //     //password change
  //     const passwordResponse = await axiosClient.post("/auth/changePassword", {
  //       oldPassword: passwordFormik.values.currentPassword,
  //       newPassword: passwordFormik.values.newPassword,
  //     });

  //     if (passwordResponse.status != 200) {
  //       alert("Some error occured. Please try again later", "error");
  //       return;
  //     }

  //     alert("Changes saved successfully!", "success");
  //     return;
  //   } catch (error: any) {
  //     if (error.response.status == 400) {
  //       alert("Failed! Did you enter your old password correctly?", "error");
  //       return;
  //     }
  //     console.log(error);
  //   }
  // };

  // const handleReset = () => {
  //   passwordFormik.resetForm();
  //   authFormik.resetForm();
  // };

  const handleDeleteSubmit = async (e: any) => {
    await deleteConfirmationFormik.handleSubmit(e);
  };
  const deleteAccount = async (e: any) => {
    try {
      const response = await axiosClient.get("/user/deleteAccount");
      console.log(response.data);
      if (response.data.success) {
        logout();
        router.push("/user/login");
        alert("Your account has been successfully deleted.", "success");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePasswordSubmit = async () => {
    if (Object.keys(passwordFormik.errors).length) {
      alert("Form has some errors.", "error");
      console.log("Form has errors. ");
      return;
    }

    //2FA submit
    try {
      setIsPasswordSubmitting(true);
      //password change
      const passwordResponse = await axiosClient.post("/auth/changePassword", {
        oldPassword: passwordFormik.values.currentPassword,
        newPassword: passwordFormik.values.newPassword,
      });

      setIsPasswordSubmitting(false);

      if (passwordResponse.status != 200) {
        alert("Some error occured. Please try again later", "error");
        return;
      }

      alert("Changes saved successfully!", "success");
      return;
    } catch (error: any) {
      setIsPasswordSubmitting(false);
      if (error.response.status == 400) {
        alert("Failed! Did you enter your old password correctly?", "error");
        return;
      }
      console.log(error);
    }
  };

  const handlePasswordReset = () => {
    passwordFormik.resetForm();
  };

  const handleAuthSubmit = async () => {
    if (Object.keys(authFormik.errors).length) {
      alert("Form has some errors.", "error");
      console.log("Form has errors. ");
      return;
    }

    //2FA submit
    try {
      if (!authFormik.values.twoFactorVerificationType?.length) {
        setIsAuthSubmitting(true);
        const response = await axiosClient.get(
          "/user/enableTwoFactorAuthentication/" + user.id + "?disable=true"
        );
        setIsAuthSubmitting(false);
        if (response.status != 200) {
          alert("Some error occured. Please try again later", "error");

          return;
        }

        setUser({ ...user, twoFactorAuthenticationEnabled: false });
      } else {
        setIsAuthSubmitting(true);

        const response = await axiosClient.get(
          "/user/enableTwoFactorAuthentication/" + user.id
        );
        setIsAuthSubmitting(false);
        if (response.status != 200) {
          alert("Some error occured. Please try again later", "error");
          return;
        }

        setUser({ ...user, twoFactorAuthenticationEnabled: true });
      }

      alert("Changes saved successfully!", "success");
      return;
    } catch (error: any) {
      setIsAuthSubmitting(false);
      alert("Failed! There was a problem saving your changes. ", "error");
      return;
    }
  };
  const handleAuthReset = () => {
    authFormik.resetForm();
  };
  return (
    <div className={styles.container}>
      <div className={styles.sectionContainer}>
        <div className={styles.fromDetails}>
          <div className="d-h5">Password</div>
          <div className="text-md text-regular">Change your password here.</div>
        </div>

        <div>
          <LibelitForm
            initialValues={passwordForm.initialValues}
            validationSchema={passwordForm.validationSchema}
            fields={passwordForm.fields}
            formInfo={passwordForm.formInfo}
            class_name={styles.formContainer}
            renderSubmit={false}
            setFormik={setPasswordFormik}
          />
        </div>
      </div>
      <FormButtons
        handleSubmit={handlePasswordSubmit}
        handleReset={handlePasswordReset}
        isDisabled={isPasswordSubmitting}
      />
      <div className="divider-grey mt-8" />
      <div className={styles.sectionContainer}>
        <div className={styles.fromDetails}>
          <div className="d-h5">Enable 2FA</div>
          <div className="text-md text-regular">
            Set up your two-factor authentication.
          </div>
        </div>

        <div>
          <AuthMethodForm setFormik={setAuthFormik} />
        </div>
      </div>
      <div className="divider-grey mt-8" />

      {/* buttons */}
      <FormButtons
        handleSubmit={handleAuthSubmit}
        handleReset={handleAuthReset}
        isDisabled={isAuthSubmitting}
      />

      {/* delete account  */}
      <div className="mt-8 flex flex-col gap-16">
        <div className="flex-col gap-4">
          <div className="d-h5">Delete account</div>
          <div className="text-md">
            Once you delete your account, there is no going back. Please be
            certain.
          </div>
        </div>

        <Button
          hierarchy="linkGrey"
          size="lg"
          icon="left"
          iconName="trash-01"
          className=" w-fit "
          text={"Delete your account"}
          onClick={() => setIsDeleteModalOpen(true)}
        />
      </div>

      <Modal isOpen={isDeleteModalOpen} className="wallet-connect-modal !h-fit">
        <div className="flex-col gap-32">
          <div className="flex-space-between flex-center">
            <div className="icon-container">
              <DeleteIcon />
            </div>
            <span className="cursor-pointer close-button">
              <CloseIcon onClick={() => setIsDeleteModalOpen(false)} />
            </span>
          </div>
          <div>
            <div className="d-h3">Delete Account</div>
            <div className="mt-16 ">
              Are you sure you want to delete your account linked to the email{" "}
              {user.email}?
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <LibelitForm
              initialValues={{ confirm: false }}
              onSubmit={deleteAccount}
              validationSchema={Yup.object({
                confirm: Yup.boolean()
                  .required("Required")
                  .oneOf([true], "Required"),
              })}
              fields={[
                {
                  name: "confirm",
                  label: "",
                  type: "checkbox",
                  class_name: styles.username,
                  placeholder:
                    "I understand that I won’t be able to recover my account.",
                },
              ]}
              formInfo={{}}
              renderSubmit={false}
              setFormik={setDeleteConfirmationFormik}
            />
            <div className="flex gap-[8px]">
              <Button
                hierarchy="secondary"
                size="lg"
                text="Cancel"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                }}
                className="text-lg   p-12-26 w-100p "
                tooltipTitle="Cancel"
                tooltipText=""
                dataTooltipId="Cancel"
              />
              <Button
                type="submit"
                hierarchy="primary"
                size="lg"
                text="Delete account"
                onClick={handleDeleteSubmit}
                className=" text-lg   p-12-26 w-100p "
                tooltipTitle="Delete account"
                tooltipText=""
                dataTooltipId="Delete account"
                disabled={!deleteConfirmationFormik?.values["confirm"]}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Security;
