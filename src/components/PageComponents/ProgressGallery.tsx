import { useFormik } from "formik";
import ProgressGalleryFilter from "../UiComponents/Filter/ProgressGalleryFilter";
import ImageGallery from "../UiComponents/ImageGallery/ImageGallery";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import FilterLineIcon from "@icons/filters/filter-lines.svg";

const handleFormSubmit = (values: any) => {
  alert("form submit called");
};

const validationSchema = Yup.object({
  // price: Yup.string().email("Invalid email address").required("Required"),
  // password: Yup.string().required("Required"),
});

function ProgressGallery({ progressDetails }: { progressDetails: any }) {
  const [sortedProgressDetails, setSortedProgressDetails] = useState<any>();
  const [showFilters, setShowFilters] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>();

  console.log(progressDetails);

  const [galleryImages, setGalleryImages] = useState([]);

  const formik = useFormik({
    initialValues: {
      progressPhase: null as any,
      year: null as any,
      month: null as any,
    },
    validationSchema: validationSchema,
    onSubmit: handleFormSubmit,
  });

  const handleChange = async (e: any) => {
    setGalleryImages([]);
    formik.handleChange(e);
  };

  useEffect(() => {
    if (!progressDetails || !Object.keys(progressDetails).length) return;

    const temp_progressDetails = progressDetails;
    const initialProgressPhase = "All";

    const initialYear = "All";

    const initialMonth = "All";

    // sort

    // Function to sort image lists by year and month
    function sortImageList(imageList: any) {
      const months: any = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12,
      };
      return imageList.sort((a: any, b: any) => {
        // Compare years
        if (b.year !== a.year) {
          return b.year - a.year;
        }
        // If years are the same, compare months
        return months[b.month] - months[a.month];
      });
    }

    // Loop through all phases and sort each image list
    for (const phase in temp_progressDetails) {
      if (temp_progressDetails[phase].imageList) {
        temp_progressDetails[phase].imageList = sortImageList(
          temp_progressDetails[phase].imageList
        );
      }
    }

    // Output the sorted lists
    console.log(temp_progressDetails);
    setSortedProgressDetails(temp_progressDetails);

    // # sort
    formik.setValues({
      progressPhase: initialProgressPhase,
      year: initialYear,
      month: initialMonth,
    });
  }, [progressDetails]);

  const handleFilterChange = async () => {
    if (
      !sortedProgressDetails ||
      !Object.keys(sortedProgressDetails).length ||
      !formik.values.year
    ) {
      return;
    }

    let images = [];

    if (formik.values.progressPhase == "All") {
      Object.values(sortedProgressDetails).forEach((phase: any) =>
        phase.imageList.forEach((item: any) => images.push(item))
      );
    } else {
      images = sortedProgressDetails[formik.values.progressPhase].imageList;
    }

    images = images
      .filter(
        (item: any) =>
          (item.year == formik.values.year || formik.values.year == "All") &&
          (item.month == formik.values.month || formik.values.month == "All")
      )
      .map((item: any) => ({
        month: item.month,
        year: item.year,
        image_url: item.image_url,
      }));

    const imageList = images
      ? images.map((item: any) => {
          return {
            original: item.image_url,
            thumbnail: item.image_url,
            month: item.month,
            year: item.year,
          };
        })
      : [];

    setGalleryImages(imageList);
  };
  useEffect(() => {
    // set up images for image gallery

    handleFilterChange();
  }, [sortedProgressDetails, formik.values]);

  console.log(currentItem);
  if (!sortedProgressDetails) return "Loading...";
  return (
    <div>
      {sortedProgressDetails && Object.keys(sortedProgressDetails).length ? (
        <>
          <div className="progress-gallery-header  gap-[12px] ">
            <h3 className="d-h4 whitespace-nowrap">Progress gallery</h3>
            <div
              className="w-fit md:hidden flex gap-8 text-semiBold items-center text-md"
              onClick={() => {
                setShowFilters((showFilters) => !showFilters);
                console.log("s");
              }}
            >
              {" "}
              <div className="sort-icon">
                <FilterLineIcon />
              </div>
              Filters
            </div>

            <div className="progress-gallery-filter-xl">
              {Object.keys(sortedProgressDetails).length && (
                <ProgressGalleryFilter
                  onSubmit={handleFormSubmit}
                  progressDetails={sortedProgressDetails}
                  formik={formik}
                  handleChange={handleChange}
                />
              )}
            </div>
          </div>
          <div
            className={`progress-gallery-filter-lg h-[92px] overflow-hidden transition-all duration-200 ease-in-out ${
              !showFilters ? "!h-0  md:!h-auto  xl:!hidden" : ""
            }`}
          >
            {Object.keys(sortedProgressDetails).length && (
              <ProgressGalleryFilter
                onSubmit={handleFormSubmit}
                progressDetails={sortedProgressDetails}
                formik={formik}
                handleChange={handleChange}
              />
            )}
          </div>
          <div className="progress-gallery-carousel  h-[288px] md:h-[504px] mt-[12px] bg-white">
            {galleryImages.length == 0 ? (
              <Skeleton className={` h-[288px] md:h-[504px]`} />
            ) : (
              <ImageGallery
                items={galleryImages}
                imageClassName=" w-full h-[100%] object-contain"
                skeletonClassName=" w-full  h-full md:h-[504px]"
                setCurrentItem={setCurrentItem}
              />
            )}
          </div>
          <div className="text-md mt-12">
            {currentItem?.month}, {currentItem?.year}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default ProgressGallery;
