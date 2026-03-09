"use client";
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import DownIcon from "@icons/arrows/arrow-down.svg";
import UpIcon from "@icons/arrows/Icon-3.svg";
import ProgressBar from "@/components/PageComponents/ProgressBar";
import Button from "@/components/UiComponents/Button/Button";
import axiosClient from "@/app/axiosClient";
import moment from "moment";
import { useRouter } from "next/router";
import PortfolioExpandedRowData from "./PortfolioExpandedRowData";
import USDCIcon from "../USDCIcon";

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  sectionClass?: string;
  emptyText: string;
  emptySubText?: string;
  isLoggedIn?: Boolean;
  className?: string;
}

export const PortfolioDatatable = <T extends object>({
  data,
  columns,
  sectionClass,
  emptyText,
  emptySubText,
  isLoggedIn,
  className,
}: ReactTableProps<any>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalRowCount = table.getRowModel().rows.length;
  const [expandedRow, setExpandedRow] = useState(-1);
  const [expandedRowData, setExpandedRowData] = useState<any>(null);

  const fetchData = async () => {
    const response = await axiosClient.get(
      `project/getProjectById/${data[expandedRow].projectId}`
    );

    if (response.status == 200) {
      setExpandedRowData(response.data);
    }
  };
  useEffect(() => {
    if (expandedRow == -1) return;
    fetchData();
  }, [expandedRow]);

  const router = useRouter();
  const isPortfolioPage = router.asPath.includes("/portfolio");

  console.log(table.getHeaderGroups());
  // return if data is empty
  if (!(data && data.length > 0) || !isLoggedIn) {
    return (
      <div className={`datatable-container   ${className}`}>
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
          <tbody>
            <tr>
              <td colSpan={5}>
                <div className="empty-section w-full ">
                  <div
                    className={`flex-item empty-section-content ${sectionClass} !border-t-0`}
                  >
                    <div className="text-center">
                      <div className="empty-section-text text-lg text-semiBold">
                        {emptyText}
                      </div>
                      <div className="empty-section-subtext">
                        {emptySubText}
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="datatable-container ">
      <table className=" ">
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
        <tbody className="border-b border-primary-100">
          {table.getRowModel().rows.map((row, rowIndex) => (
            <>
              <tr key={row.id} className="">
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    className={`p-12-24 text-md ${
                      index == 0 && "font-semibold"
                    } ${index == 4 && "font-semibold text-accent-600"} `}
                    key={cell.id}
                  >
                    {" "}
                    <div
                      className={`flex gap-8 items-center ${
                        index == 3 && "justify-between"
                      }`}
                    >
                      {index == 0 ? (
                        <>
                          <Image
                            width={100}
                            height={100}
                            src="/images/projectDetail.jpeg"
                            alt="project image"
                            className="rounded-[5px] min-w-[40px] w-[40px] h-[40px] object-cover"
                          />
                          <Link
                            href={`/user/marketplace/detail/${data[rowIndex].projectId}`}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Link>
                        </>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}

                      {isPortfolioPage && index == 3 && (
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

              <PortfolioExpandedRowData
                isPortfolioPage={true}
                isExpanded={expandedRow == rowIndex}
                row={row}
                expandedRowData={expandedRowData}
                data={data[rowIndex]}
                rowIndex={rowIndex}
              />
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};
