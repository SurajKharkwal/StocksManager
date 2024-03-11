import { Card } from "@nextui-org/react";
import { SparkLineChart } from "@tremor/react";
import React from "react";
import { FaArrowUpRightDots } from "react-icons/fa6";

const ProfitLossCard = () => {
  const chartdata = [
    {
      month: "Jan 21",
      Performance: 4000,
      Benchmark: 3000,
    },
    {
      month: "Feb 21",
      Performance: 3000,
      Benchmark: 2000,
    },
    {
      month: "Mar 21",
      Performance: 2000,
      Benchmark: 1700,
    },
    {
      month: "Apr 21",
      Performance: 2780,
      Benchmark: 2500,
    },
    {
      month: "May 21",
      Performance: 1890,
      Benchmark: 1890,
    },
    {
      month: "Jun 21",
      Performance: 2390,
      Benchmark: 2000,
    },
    {
      month: "Jul 21",
      Performance: 3490,
      Benchmark: 3000,
    },
  ];

  return (
    <div className="flex max-md:flex-col w-full gap-8">
      <Card className="p-4 shadow-lg w-screen-sm flex">
        <div className="flex items-start justify-evenly gap-4 ">
          <div className="text-green-500 border-2 rounded-full border-green-500 p-2">
            <FaArrowUpRightDots />
          </div>
          <div className="flex flex-col items-start ">
            <h1 className="font-extralight text-gray-400">Total Amount Gain</h1>
            <p className="font-semibold text-2xl">{"13,45,598"}</p>
          </div>
          <div className="w-auto flex flex-col items-center justify-center mt-4 h-full">
            <SparkLineChart
              data={chartdata}
              index="date"
              categories={["Performance"]}
              colors={["green"]}
            />
            <div className="flex items-center justify-cente mt-2 text-green-500 font-extralight gap-2">
              <h1>{"-41%"}</h1>
              <p>{"this mounth"}</p>
            </div>
          </div>
        </div>
      </Card>
      <Card className="p-4 flex shadow-lg">
        <div className="flex items-start justify-evenly gap-4 ">
          <div className="text-red-500 border-2 rounded-full border-red-500 p-2">
            <FaArrowUpRightDots  className="rotate-180"/>
          </div>
          <div className="flex flex-col items-start ">
            <h1 className="font-extralight text-gray-400">Total Amount Gain</h1>
            <p className="font-semibold text-2xl">{"13,45,598"}</p>
          </div>
          <div className="w-auto flex flex-col items-center justify-center mt-4 h-full">
            <SparkLineChart
              data={chartdata}
              index="date"
              categories={["Performance"]}
              colors={["red"]}
            />
            <div className="flex items-center justify-cente mt-2 text-red-500 font-extralight gap-2">
              <h1>{"+41%"}</h1>
              <p>{"this mounth"}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfitLossCard;
