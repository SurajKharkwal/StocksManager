"use client";
import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  ChipProps,
} from "@nextui-org/react";
import { columns, users } from "./data";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

type User = (typeof users)[0];

const HeroTable = () => {
  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "item":
        return (
          <div>
            <h1>{user.item}</h1>
            <a className="text-blue-500 font-light">{user.em13}</a>
          </div>
        );
      case "Stocks-in":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
        case "Stock-out":
            return (
                <div>
                    <p>
                        {user.stockout}
                    </p>
                </div>
            )
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="default" content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <AiFillEdit />
              </span>
            </Tooltip>
            <Tooltip color="default" content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <IoMdEye />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <MdDelete />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-[89dvh]">
      <Table className="max-w-screen-lg" aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              className={column.name == "AMOUNT-IN" || column.name == "STATUS" || column.name == "AMOUNT-OUT"? "max-md:hidden": ""}
              
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell className={ columnKey == "outamount" || columnKey== "status" || columnKey == "inamount"? "max-md:hidden dark:text-white": "dark:text-white"} >{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default HeroTable;

