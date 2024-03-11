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
    <div className="max-md:p-2">
      <div className="w-full max-md:flex-col flex gap-2 max-md:p-4 md:p-16 ">
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

      <div className=" max-md:flex-col justify-evenly gap-20 flex ">
        <div className=" flex flex-col gap-20">
          <DonutChartUi />
          <StocksInOutCard />
        </div>
        <div className="flex flex-col gap-20">
          <ProfitLossCard />
          <AreaChartUsageExample />
        </div>
        <div className="space-y-4">
          <BarcodeList />
          <Amount />
        </div>
      </div>
    </div>
  );
};

export default page;
