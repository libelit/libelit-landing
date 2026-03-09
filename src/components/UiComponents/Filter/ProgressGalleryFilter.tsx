import React, { useState, useEffect } from "react";

interface FilterValues {
  progressPhase: string;
  month: string;
}

interface ProgressGalleryFilterProps {
  onSubmit: (values: FilterValues) => void;
  progressDetails: any;
  formik: any;
  handleChange: (e: any) => void;
}

const ProgressGalleryFilter: React.FC<ProgressGalleryFilterProps> = ({
  formik,
  progressDetails,
  handleChange,
}) => {
  const [options, setOptions] = useState<any>();

  useEffect(() => {
    if (!formik.values.year || !progressDetails) {
      return;
    }

    let imageList: any = [];
    if (formik.values.progressPhase == "All") {
      Object.values(progressDetails).forEach((phase: any) =>
        phase.imageList.forEach((item: any) => imageList.push(item))
      );
    } else {
      (progressDetails[formik.values.progressPhase]?.imageList ?? []).forEach(
        (item: any) => imageList.push(item)
      );
    }

    if (
      formik.values.year !== "All" &&
      !imageList.filter((item: any) => item.year == formik.values.year).length
    ) {
      formik.setFieldValue("year", imageList[0].year);
      // return;
    }
    imageList = imageList.filter(
      (item: any) =>
        item.year == formik.values.year || formik.values.year == "All"
    );

    if (
      formik.values.month !== "All" &&
      !imageList.filter(
        (item: any) =>
          (item.year == formik.values.year || formik.values.year == "All") &&
          item.month == formik.values.month
      ).length
    ) {
      formik.setFieldValue(
        "month",

        imageList[0].month
      );
      // return;
    }

    const progressPhases = Object.keys(progressDetails);

    const years = Array.from(new Set(imageList.map((item: any) => item.year)));

    const months = Array.from(
      new Set(
        imageList
          .filter(
            (item: any) =>
              item.year == formik.values.year || formik.values.year == "All"
          )
          .map((item: any) => item.month)
      )
    );

    setOptions({ progressPhases, years, months });
  }, [formik.values, progressDetails]);

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <div className="item filter-input-grid max-w-full box-border">
        <div className="item form-field !mb-0 col-span-2">
          <div className="filter-input">
            <select
              id="progressPhase"
              name="progressPhase"
              onBlur={formik.handleBlur}
              onChange={handleChange}
              value={formik.values.progressPhase ?? ""}
              className="bg-[unset] !max-w-full"
            >
              <option key="All" value="All" label="All" />
              {options?.progressPhases.map((phase: any) => (
                <option key={phase} value={phase} label={phase} />
              ))}
            </select>
          </div>
        </div>
        <div className="item form-field !mb-0 col-span-1">
          <div className="filter-input">
            <select
              id="year"
              name="year"
              onBlur={formik.handleBlur}
              onChange={handleChange}
              value={formik.values.year ?? ""}
              className="bg-[unset] !max-w-full"
            >
              {" "}
              <option key="All" value="All" label="All" />
              {options?.years.map((year: any) => (
                <option key={year} value={year} label={year} />
              ))}
            </select>
          </div>
        </div>

        <div className="item form-field !mb-0 col-span-1">
          <div className="filter-input">
            <select
              id="month"
              name="month"
              onBlur={formik.handleBlur}
              onChange={handleChange}
              value={formik.values.month ?? ""}
              className="bg-[unset] !max-w-full"
            >
              {" "}
              <option key="All" value="All" label="All" />
              {options?.months.map((month: any) => (
                <option key={month} value={month} label={month} />
              ))}
            </select>
          </div>
        </div>
      </div>
    </form>
  );
};
export default ProgressGalleryFilter;
