import { Card, CircularProgress } from "@nextui-org/react";
import React from "react";

const Amount = () => {
  return (
    <Card className="p-4 flex items-center gap-4 aspect-square justify-center">
      <div className="w-full text-xl">
        <h1>Net-Amount</h1>
      </div>
      <CircularProgress
        label="Amount"
        value={25}
        color="success"
        showValueLabel={true}
        classNames={{
          svg: "w-40 h-40 drop-shadow-md",
          indicator: "warning",
          track: "stroke-black/40 ",
          value: "text-3xl font-semibold text-green-500",
        }}
      />
      <div className="w-full flex items-center justify-start ">
        <h1 className="text-gray-500 font-semibol">Amount Received</h1>
        <h1 className="ml-auto text-green-500"> {"Rs 45,000"}</h1>
      </div>
      <div className="w-full h-1 rounded-3xl bg-white/50"></div>
      <div className="w-full flex items-center justify-start">
        <h2 className="font-semibold text-gray-500">Amount Spent</h2>
        <h1 className="ml-auto text-pink-500"> {"Rs 35,500"}</h1>
      </div>
    </Card>
  );
};

export default Amount;
