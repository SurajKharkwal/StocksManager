"use client";
import React, { useEffect, useState } from "react";
import { IoMdEye } from "react-icons/io";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  ChipProps,
  Button,
} from "@nextui-org/react";
import { Users, columns, fetchData } from "./data";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

const statusColorMap: Record<string, ChipProps["color"]> = {
  profit: "success",
  loss: "danger",
  neutral: "warning",
};

const HeroTable = () => {
  const [users, setUsers] = useState<Users[]>([]); // Assuming User is a type/interface representing your user object

  useEffect(() => {
    async function fetchDataAndUpdateUsers() {
      const userData = await fetchData(0);
      setUsers(userData);
    }
    fetchDataAndUpdateUsers();
  }, []);
  // async function getData() {
  //   const users = await fetchData(0);
  //   return users;
  // }
  type User = (typeof users)[0];
  // console.log("okh");
  const [callRate, setCallRate] = useState(0);
  useEffect(() => {
    fetchData(0);
    console.log("inside useeffect");
  }, [callRate]);
  const [showMessage, setShowMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    setIsLoading(true);
    setCallRate(callRate + 3);
    setUsers(users.concat(await fetchData(callRate)));
    setIsLoading(false);
  };
  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];
    // console.log(cellValue);

    switch (columnKey) {
      case "name":
        return (
          <div>
            <h1>{user.name}</h1>
            <a className="text-blue-500 font-light">{user.barcode}</a>
          </div>
        );
      case "stocksIn":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "Stock-out":
        return (
          <div>
            <p>{user.stocksOut}</p>
          </div>
        );
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
    <div className="flex flex-col gap-4 items-center justify-center w-full min-h-[89dvh]">
      <Table
        className="max-w-screen-lg"
        aria-label="Example table with custom cells"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              className={
                column.name == "AMOUNT-IN" ||
                column.name == "STATUS" ||
                column.name == "AMOUNT-OUT"
                  ? "max-md:hidden"
                  : ""
              }
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody className="" items={users}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell
                  className={
                    columnKey == "outamount" ||
                    columnKey == "status" ||
                    columnKey == "inamount"
                      ? "max-md:hidden dark:text-white"
                      : "dark:text-white"
                  }
                >
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Button onClick={handleClick} isLoading={isLoading} color="primary">
        Load More
      </Button>
      <p>{showMessage}</p>
    </div>
  );
};

export default HeroTable;
