import styles from "./styles.module.scss";
import Image from "next/image";
import ProgressBar from "@/components/UiComponents/ProgressBar";
import UserIcon from "@icons/general/user-white-sm.svg";

function ProfileOverview({ data, setData }: any) {
  return (
    <div className="section-tab-content">
      <div className="user-profile-header">
        <div className="user-profile-background pos-rel">
          <div className="flex flex-vertical-center pos-abs profile-circle-pos">
            {data?.imageUrl ? (
              <div
                className={`item user-profile-image bg-color-secondary-400 ${styles.imageCircle} !bg-white`}
              >
                <img
                  src={data.imageUrl}
                  alt=""
                  className={styles.profilePicture}
                />
              </div>
            ) : (
              <div
                className={`item user-profile-image bg-color-secondary-400 ${styles.imageCircle}`}
              >
                <UserIcon className={styles.defaultImage} />
              </div>
            )}

            <div className="item flex-col user-profile-info">
              <div className="item d-h3 color-gray-700">
                {data?.username ?? "Username"}
              </div>
              <div className="item text-md color-gray-500">
                {data?.displayRole ?? "Role"}
              </div>
            </div>
          </div>
        </div>
        <div className="user-profile-subbackground"></div>

        <div className="divider-grey"></div>

        {/* progress section */}
        <div className="flex flex-wrap profile-status">
          <div className="item text-lg progress-section flex-col">
            <div className="item color-primary-800">Experience level:</div>
            <div className="item text-bold mt-4">Beginner</div>
          </div>

          <div className="item text-lg progress-section flex-col">
            <div className="item color-primary-800">Investing success:</div>
            <div className="item text-bold mt-4">0%</div>
          </div>

          <div className="item  text-lg progress-section flex-col">
            <div className="item color-primary-800">Next level:</div>
            <div className="item text-bold mt-4">Intermediate</div>
          </div>
        </div>

        {/* #progress section */}
        <div className="divider-grey"></div>
        {/* <ProgressBar
          progress={9}
          topLeftLabel="9%"
          topRightLabel="Begginer"
          bottomLeftLabel="53,000 $"
          bottomRightLabel="1,51,000 $"
          color="secondary"
        /> */}

        {/* estimation block */}
        {/* <div className="mt-20 mb-4 flex flex-space-between">
                    <div className="flex-item text-lg text-bold">0%</div>
                    <div className="flex-item text-lg text-bold">Begginer</div>
                </div>

                <div className="progress-container">
                    <div className="progress-bar progress-bar-empty"></div>
                </div>

                <div className="mt-4 flex-space-between">
                    <div className="flex-item text-lg color-primary-500">00.00 $</div>
                    <div className="flex-item text-lg color-primary-500">1,000 $</div>
                </div> */}
      </div>
    </div>
  );
}

export default ProfileOverview;
