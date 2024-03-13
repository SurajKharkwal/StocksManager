"use client";

import Amount from "@/components/manager/dashboard/Amount";
import { AreaChartUsageExample } from "@/components/manager/dashboard/AreaChartUi";
import BarcodeList from "@/components/manager/dashboard/BarcodeList";
import DonutChartUi from "@/components/manager/dashboard/DonutChartUI";
import DropDownUI from "@/components/manager/dashboard/DropDwonUI";
import ProfitLossCard from "@/components/manager/dashboard/ProfitLossCard";
import StocksInOutCard from "@/components/manager/dashboard/StocksInOutCard";

const page = () => {
  return (
    <div className="max-md:p-2 flex items-center justify-center flex-col">
      <div className="w-full max-md:flex-col flex gap-2 p-10 md:pb-16 ">
        <section className=" mr-auto">
          <h1 className="font-semibold">Welcome back, {"Suraj Kharkwal !"}</h1>
          <p className="font-extralight text-gray-400">
            this all the record you need to know to keep in going...
          </p>
        </section>
        <section className="">
          <DropDownUI />
        </section>
      </div>
      <div className="grid 2xl:grid-cols-[3fr_1fr]  lg:max-2xl:gap-20 w-full justify-evenly ">
        <div className="flex items-center justify-center max-lg:flex-col gap-20 ">
          <div className="flex flex-col md:max-lg:flex-row items-center justify-center gap-20">
            <DonutChartUi />
            <StocksInOutCard />
          </div>
          <div className="flex items-center flex-col justify-center gap-20">
            <ProfitLossCard />
            <AreaChartUsageExample />
          </div>
        </div>
        <div className=" lg:flex-row lg:gap-10 gap-2 items-start md:max-lg:p-2 max-lg:flex-col md:max-lg:flex-row w-full 2xl:flex-col flex  justify-evenly ">
          <BarcodeList />
          <Amount />
        </div>
      </div>
    </div>
  );
};

export default page;
