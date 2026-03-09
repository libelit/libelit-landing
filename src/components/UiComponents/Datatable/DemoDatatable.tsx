import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import styles from "./datatable.module.scss";
import Image from "next/image";
import DownIcon from "@icons/arrows/arrow-down.svg";
import UpIcon from "@icons/arrows/Icon-3.svg";

import { useState } from "react";
import ProgressBar from "@/components/PageComponents/ProgressBar";
import Button from "@/components/UiComponents/Button/Button";
import infoIcon from "@icons/general/help-circle-gray.svg?url";
import USDCIcon from "../USDCIcon";

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  sectionClass?: string;
  emptyText: string;
  emptySubText?: string;
  isLoggedIn?: Boolean;
}

export const DemoDatatable = <T extends object>({
  data,
  columns,
  sectionClass,
  emptyText,
  emptySubText,
  isLoggedIn,
}: ReactTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalRowCount = table.getRowModel().rows.length;

  const [expandedRow, setExpandedRow] = useState(-1);

  // return if data is empty
  if (!(data && data.length > 0)) {
    return (
      <div className="datatable-container">
        <table className="w-100p border-b border-primary-100">
          <thead className="border-b border-primary-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-12-24 text-left text-sm color-primary-500 font-semibold  "
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.id == "bricksValue" && (
                      <USDCIcon type="primary" className="w-[14px]" />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        </table>
        <div className="empty-section">
          <div className={`flex-item empty-section-content ${sectionClass}`}>
            <div className="text-center">
              <div className="empty-section-text text-lg text-semiBold">
                {emptyText}
              </div>
              <div className="empty-section-subtext">{emptySubText}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="datatable-container">
      <table className="w-100p ">
        <thead className="border-b border-primary-100 ">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`p-12-24 text-left text-sm font-semibold color-primary-500`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {header.id == "bricksValue" && (
                    <USDCIcon type="primary" className="w-[14px]" />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="border-b border-primary-100 ">
          {table.getRowModel().rows.map((row, rowIndex) => (
            <>
              <tr key={row.id} className={`h-[72px]  `}>
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    className={`p-12-24 text-md ${
                      index == 0 && "font-semibold"
                    } ${index == 4 && "font-semibold text-accent-600"} 
                    
                   `}
                    key={cell.id}
                  >
                    <div className="flex gap-8 items-center">
                      {index == 0 && (
                        <div>
                          <Image
                            src="/images/project.png"
                            alt="project image"
                            width="100"
                            height="100"
                            className="object-cover h-[40px] w-[40px] min-w-[40px] border rounded-[6px]"
                          />
                        </div>
                      )}

                      <div>
                        {index == 4
                          ? "16 days"
                          : flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                      </div>

                      {index == 4 && (
                        <div className="ml-[14px]">
                          {expandedRow == rowIndex ? (
                            <UpIcon
                              width="20px"
                              onClick={() => setExpandedRow(-1)}
                              className="cursor-pointer"
                            />
                          ) : (
                            <DownIcon
                              width="20px"
                              onClick={() => setExpandedRow(rowIndex)}
                              className="cursor-pointer"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {expandedRow == rowIndex && (
                <tr className="relative">
                  <td className="flex items-start flex-col lg:flex-row w-full  absolute  px-5 gap-16">
                    <div className="w-full flex flex-col gap-16">
                      <ProgressBar
                        progress={12.5}
                        topLeftLabel={"12.5"}
                        topRightLabel={"Pre-execution"}
                        bottomLeftLabel={""}
                        bottomRightLabel={""}
                        color="accent"
                        page="project-details"
                      />

                      {/* details */}
                      <div className="flex justify-between gap-4">
                        <div className="flex flex-col gap-4 grow">
                          <div className="text-md text-primary-600">
                            Brick Price:
                          </div>
                          <div className="text-lg text-primary-900 font-bold">
                            $98.56
                          </div>
                        </div>

                        <div className="flex flex-col gap-4 grow">
                          <div className="text-md text-primary-600">
                            Available Bricks:
                          </div>
                          <div className="text-lg text-accent-500 font-bold">
                            8755
                          </div>
                        </div>

                        <div className="flex flex-col gap-4 grow">
                          <div className="text-md text-primary-600">
                            Return Estimate:
                          </div>
                          <div className="text-lg text-secondary-900 font-bold">
                            8-11%
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row lg:flex-col gap-16  w-full md:w-full lg:w-[254px] sm:mt-6">
                      <Button
                        hierarchy="accent"
                        size="md"
                        text="Buy more Bricks"
                        className="w-full"
                      />
                      <Button
                        hierarchy="secondary"
                        size="md"
                        text="Sell your Bricks"
                        className="w-full"
                        disabled
                      />
                    </div>
                  </td>
                </tr>
              )}

              <tr
                className={
                  expandedRow == rowIndex
                    ? "h-[320px] md:h-[250px] lg:h-[172px]"
                    : ""
                }
              ></tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};
