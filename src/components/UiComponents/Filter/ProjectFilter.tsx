import React, { useState } from "react";
import DoubleArrowIcon from "../../../../public/icons/filters/switch-vertical.svg";
import FilterLineIcon from "../../../../public/icons/filters/filter-lines.svg";
import { Formik, Field, Form, ErrorMessage, FieldArrayConfig } from "formik";
import * as Yup from "yup";
import Button from "@/components/UiComponents/Button/Button";
import { FaArrowRotateLeft, FaSistrix } from "react-icons/fa6";
import DownArrowIcon from "@icons/arrows/Icon-8.svg";
import UpArrowIcon from "@icons/arrows/Icon-13.svg";
import styles from "./styles.module.scss";

const initialValues = {
  maxBrickPrice: null,
  maxNumberOfBricks: null,

  minReturn: null,
  maxProjectCompletion: "",

  blockchain: "All",

  project: "All",
};

const validationSchema = Yup.object({
  // price: Yup.string().email("Invalid email address").required("Required"),
  // password: Yup.string().required("Required"),
});

const currencies = [
  { value: "usd", label: "USD" },
  { value: "asd", label: "ASD" },
  { value: "nrs", label: "NRS" },
];

interface FilterValues {
  maxBrickPrice: number;
  maxNumberOfBricks: number;

  minReturn: number;
  maxProjectCompletion: any;

  blockchain: string;

  project: string;
}

interface ProjectFilterProps {
  onSubmit: (values: FilterValues) => void;
  projects: any[];
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({
  onSubmit,
  projects,
}) => {
  const resetFilter = (formik: any) => {
    formik.resetForm();
    formik.handleSubmit();
  };
  console.log(projects);

  const applyFilter = (formik: any) => {
    formik.handleSubmit();
  };

  const uniqueProjects: any = [];
  projects.forEach((project) => {
    if (!uniqueProjects.filter((p: any) => p.id == project.id).length) {
      uniqueProjects.push(project);
    }
  });

  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  return (
    <>
      {/* filter action section */}

      {/* #filter action section */}

      {/* filter input section*/}
      <Formik
        initialValues={initialValues as any}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <>
            {/* action section */}
            <div className="filter-container">
              <div className="flex filter-sort items-center gap-8">
                <div className="flex gap-8">
                  <div
                    className={`item flex filter-controls cursor-pointer py-[10px] pr-[22px] pl-[18px] ${styles.sortBy}`}
                    tabIndex={100}
                  >
                    <div className="sort-icon">
                      <DoubleArrowIcon />
                    </div>
                    <div
                      className={`filter-label text-md text-semiBold relative `}
                    >
                      Sort by
                      <div
                        className={` shadow-xl focus:overflow-visible min-w-[235px] w-fit min-h-[179px] absolute top-[2rem] -right-[10px] flex flex-col z-[1000] bg-white border border-primary-100 rounded-[10px] text-lg text-primary-600 font-normal ${styles.sortOptions}`}
                      >
                        <div
                          className="flex gap-12 py-[10px] px-[16px] items-center "
                          tabIndex={101}
                        >
                          <div>
                            <UpArrowIcon className=" h-[14px] stroke-[1.5px] stroke-[#344054]" />
                          </div>
                          <div>Price: Ascending</div>
                        </div>
                        <div
                          className="flex gap-12 py-[10px] px-[16px] items-center "
                          tabIndex={102}
                        >
                          <div>
                            <DownArrowIcon className=" h-[18px] stroke-[1.5px] stroke-[#344054]" />
                          </div>
                          <div>Price: Descending</div>
                        </div>
                        <div
                          className="flex gap-12 py-[10px] px-[16px] items-center "
                          tabIndex={103}
                        >
                          <div>
                            <UpArrowIcon className=" h-[14px] stroke-[1.5px] stroke-[#344054]" />
                          </div>
                          <div>Bricks no.: Ascending</div>
                        </div>
                        <div
                          className="flex gap-12 py-[10px] px-[16px] items-center "
                          tabIndex={104}
                        >
                          <div>
                            <DownArrowIcon className=" h-[18px] stroke-[1.5px] stroke-[#344054]" />
                          </div>
                          <div className="text-nowrap">
                            Bricks No.: Descending
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="item flex filter-controls cursor-pointer py-[10px] pr-[22px] pl-[18px] "
                    onClick={() =>
                      setIsFiltersVisible(
                        (isFiltersVisible) => !isFiltersVisible
                      )
                    }
                  >
                    <div className="sort-icon">
                      <FilterLineIcon />
                    </div>
                    <div className="filter-label text-md text-semiBold">
                      Filters
                    </div>
                  </div>
                </div>
                <div
                  className={` gap-8 grow w-full md:grow-0 md:w-fit ${
                    isFiltersVisible ? "flex" : "hidden"
                  } md:flex`}
                >
                  <div className="item flex filter-controls cursor-pointer w-1/2 md:w-fit grow md:grow-0 ">
                    <Button
                      type={"reset"}
                      hierarchy="secondary"
                      size="lg"
                      text="Reset"
                      className="w-full  md:w-[97px] h-[48px] flex items-center justify-center"
                      onClick={async () => {
                        await formik.resetForm();

                        onSubmit(initialValues as any);
                      }}
                    />
                  </div>
                  <div className="item flex filter-controls cursor-pointer w-1/2 md:w-fit grow md:grow-0">
                    <Button
                      hierarchy="primary"
                      size="lg"
                      text="Apply"
                      className="w-full md:w-[97px] h-[48px]"
                      onClick={() => onSubmit(formik.values)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* #action sectiion */}
            <Form
              className={`w-full ${
                isFiltersVisible ? "block" : "hidden"
              } md:block`}
            >
              <div className="flex resell-filters-container  gap-0 md:gap-x-6 mt-16  overflow-auto ">
                {/* filter first */}
                <div className="item flex gap-8   ">
                  <div className="item form-field !mb-[16px] min-w-[135px] md:min-w-[200px]">
                    <div className="filter-label">
                      <label className="form-label " htmlFor="price">
                        Max. Brick Price
                      </label>
                    </div>
                    <div className="filter-input relative">
                      <input
                        id="maxBrickPrice"
                        name="maxBrickPrice"
                        type="number"
                        onWheel={(e: any) => e.target.blur()}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.maxBrickPrice}
                        placeholder="$"
                        className="!h-[42px] md:!h-[48px] !text-sm md:!text-base py-[11px]  md:py-[12px]"
                      />
                      <div
                        className={`absolute !h-[42px] md:!h-[48px] !text-sm md:!text-base text-regular top-[12px] right-[14px] `}
                      >
                        USD
                      </div>
                    </div>
                  </div>
                  <div className="item form-field !mb-[16px] min-w-[135px] md:min-w-[200px]">
                    <div className="filter-label">
                      <label className="form-label " htmlFor="price">
                        Max. number of Bricks
                      </label>
                    </div>
                    <div className="filter-input relative">
                      <input
                        id="maxNumberOfBricks"
                        name="maxNumberOfBricks"
                        type="number"
                        onWheel={(e: any) => e.target.blur()}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.maxNumberOfBricks}
                        placeholder="1"
                        className="!h-[42px] md:!h-[48px] !text-sm md:!text-base"
                      />
                    </div>
                  </div>
                </div>
                {/* #filter first */}

                {/* filter second */}
                <div className="item flex gap-8   ">
                  <div className="item form-field !mb-[16px] min-w-[135px] md:min-w-[200px]">
                    <div className="filter-label">
                      <label className="form-label " htmlFor="price">
                        Min. Return
                      </label>
                    </div>
                    <div className="filter-input relative">
                      <input
                        id="minReturn"
                        name="minReturn"
                        type="number"
                        onWheel={(e: any) => e.target.blur()}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.minReturn}
                        placeholder="%"
                        className="!h-[42px] md:!h-[48px] !text-sm md:!text-base py-[11px]  md:py-[12px] py-[11px]  md:py-[12px]"
                      />
                      <div
                        className={`absolute !text-sm md:!text-base text-regular top-[12px] right-[14px]`}
                      >
                        %
                      </div>
                    </div>
                  </div>
                  <div className="item form-field !mb-[16px] min-w-[135px] md:min-w-[200px]">
                    <div className="filter-label w-fit break-fit">
                      <label className="form-label " htmlFor="price">
                        Max. project completion
                      </label>
                    </div>
                    <div className="filter-input relative">
                      <input
                        id="maxProjectCompletion"
                        name="maxProjectCompletion"
                        type="number"
                        onWheel={(e: any) => e.target.blur()}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.maxProjectCompletion}
                        placeholder="months"
                        className="!h-[42px] md:!h-[48px] !text-sm md:!text-base py-[11px]  md:py-[12px]"
                      />
                      <div
                        className={`absolute !text-sm md:!text-base text-regular top-[12px] right-[14px]`}
                      >
                        months
                      </div>
                    </div>
                  </div>
                </div>
                {/* #filter second */}

                {/* filter third */}
                <div className="item flex gap-8   ">
                  <div className="item form-field !mb-[16px] min-w-[135px] md:min-w-[200px]  ">
                    <div className="filter-label">
                      <label className="form-label " htmlFor="price">
                        Blockchain
                      </label>
                    </div>
                    <div className="filter-input relative">
                      <select
                        id="blockchain"
                        name="blockchain"
                        onWheel={(e: any) => e.target.blur()}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.blockchain}
                        placeholder="from"
                        className="min-w-[200px] !max-w-full !h-[42px] md:!h-[48px] !text-sm md:!text-base py-[11px]  md:py-[12px]"
                      >
                        <option value="All">All</option>
                        <option value="Ethereum Mainnet">
                          Ethereum Mainnet
                        </option>
                        <option value="Amoy Testnet">Amoy Testnet</option>
                      </select>
                    </div>
                  </div>
                  <div className="item form-field !mb-[16px] min-w-[135px] md:min-w-[200px] ">
                    <div className="filter-label">
                      <label className="form-label " htmlFor="price">
                        Project
                      </label>
                    </div>
                    <div className="filter-input relative">
                      <select
                        id="project"
                        name="project"
                        onWheel={(e: any) => e.target.blur()}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.project}
                        placeholder="from"
                        className="min-w-[200px] !max-w-full !h-[42px] md:!h-[48px] !text-sm md:!text-base py-[11px]  md:py-[12px]"
                      >
                        <option>All</option>
                        {uniqueProjects.map((p: any) => (
                          <option value={p.project.name} key={p.project.name}>
                            {p.project.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                {/* #filter third */}
              </div>
            </Form>
          </>
        )}
      </Formik>
      {/* #filter input section */}
    </>
  );
};

export default ProjectFilter;
