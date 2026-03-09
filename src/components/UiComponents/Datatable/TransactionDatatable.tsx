"use client";
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import styles from "./datatable.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import DownIcon from "@icons/arrows/arrow-down.svg";
import UpIcon from "@icons/arrows/Icon-3.svg";
import ProgressBar from "@/components/PageComponents/ProgressBar";
import Button from "@/components/UiComponents/Button/Button";
import infoIcon from "@icons/general/help-circle-gray.svg?url";
import Skeleton from "react-loading-skeleton";
import axiosClient from "@/app/axiosClient";
import moment from "moment";
import { useRouter } from "next/router";
import { time } from "console";

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  sectionClass?: string;
  emptyText: string;
  emptySubText?: string;
  isLoggedIn?: Boolean;
  className?: string;
}

export const TransactionDatatable = <T extends object>({
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

  // return if data is empty
  if (!(data && data.length > 0) || !isLoggedIn) {
    return (
      <div className={`datatable-container ${className}`}>
        <table className="w-100p border-b border-primary-100">
          <thead className="border-b border-primary-100">
            {table.getHeaderGroups().map((headerGroup, i) => (
              <tr key={`${headerGroup.id}_${i}`}>
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={`${header.id}_${index}`}
                    className="p-12-24 text-left text-sm color-primary-500 font-semibold  "
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
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

  const timeZoneOffset = new Date().getTimezoneOffset();

  return (
    <div className="datatable-container">
      <table className="w-100p ">
        <thead className="border-b border-primary-100 ">
          {table.getHeaderGroups().map((headerGroup, i) => (
            <tr key={`${headerGroup.id}_${i}`}>
              {headerGroup.headers.map((header, index) => (
                <th
                  key={`${header.id}_${index}`}
                  className={`p-12-24 text-left text-sm font-semibold color-primary-500`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="border-b border-primary-100">
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr key={row.id} className="">
              {row.getVisibleCells().map((cell, index) => (
                <td
                  className={`p-12-24 text-md ${
                    index == 0 && "font-semibold"
                  } ${index == 4 && "font-semibold text-accent-600"} `}
                  key={`${cell.id}_${index}`}
                >
                  {" "}
                  <div
                    className={`flex gap-8 items-center ${
                      index == 4 && "justify-between"
                    }`}
                  >
                    {index == 1 ? (
                      moment(Number(data[rowIndex].timestamp))
                        .utcOffset(timeZoneOffset * -1)
                        .format("MMMM Do, YYYY")
                    ) : index == 2 ? (
                      moment(Number(data[rowIndex].timestamp))
                        .utcOffset(timeZoneOffset * -1)
                        .format("LT")
                    ) : index == 3 ? (
                      <Link
                        href={`/user/marketplace/detail/${data[rowIndex].projectId}`}
                        className="font-semibold"
                      >
                        {" "}
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Link>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
