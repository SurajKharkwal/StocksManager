import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";

const BarcodeList = () => {
  return (
    <Card className=" max-md:w-sm w-[375px] shadow-lg">
      <CardHeader className="justify-between">
        <div className="flex gap-5 flex-col">
          <h1>List of Barcode</h1>
          <p className="font-extralight text-neutral-400">{"Today's Stocks/Mounthly's Stocks"}</p>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 gap-4 text-small text-default-400">
        <div className="flex items-center justify-center rounded-md dark:bg-neutral-800 pr-1">
          <section className="mr-auto flex items-center justify-center gap-2">
            <div className="p-2 text-white bg-blue-500 rounded-lg">
              {"65.5%"}
            </div>
            <div>{"Jeans"}</div>
          </section>
          <div>{"25/100"}</div>
        </div>
        <div className="flex items-center justify-center rounded-md dark:bg-neutral-800 pr-1">
          <section className="mr-auto flex items-center justify-center gap-2">
            <div className="p-2 text-white bg-blue-500 rounded-lg">
              {"65.5%"}
            </div>
            <div>{"Jeans"}</div>
          </section>
          <div>{"25/100"}</div>
        </div>
        <div className="flex items-center justify-center rounded-md dark:bg-neutral-800 pr-1">
          <section className="mr-auto flex items-center justify-center gap-2">
            <div className="p-2 text-white bg-blue-500 rounded-lg">
              {"65.5%"}
            </div>
            <div>{"Jeans"}</div>
          </section>
          <div>{"25/100"}</div>
        </div>
        <div className="flex items-center justify-center rounded-md dark:bg-neutral-800 pr-1">
          <section className="mr-auto flex items-center justify-center gap-2">
            <div className="p-2 text-white bg-blue-500 rounded-lg">
              {"65.5%"}
            </div>
            <div>{"Jeans"}</div>
          </section>
          <div>{"25/100"}</div>
        </div>
        <div className="flex items-center justify-center rounded-md dark:bg-neutral-800 pr-1">
          <section className="mr-auto flex items-center justify-center gap-2">
            <div className="p-2 text-white bg-blue-500 rounded-lg">
              {"65.5%"}
            </div>
            <div>{"Jeans"}</div>
          </section>
          <div>{"25/100"}</div>
        </div>
      </CardBody>
      <CardFooter className="gap-3">
        <p className="text-gray-400 font-extralight">
          scroll to see the rest of the barcode
        </p>
      </CardFooter>
    </Card>
  );
};

export default BarcodeList;
