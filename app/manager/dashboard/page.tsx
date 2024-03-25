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
    <div className="flex justify-around md:pt-12 2xl:pt-0 flex-wrap w-full md:max-lg:pt-0 min-h-[89dvh] max:sm-gap-20 items-center ">
      <div className="xl:space-y-20 max-sm:pb-20 max-sm:space-y-12 md:max-lg:w-[75%] md:max-lg:gap-12 md:max-lg:p-8 md:max-lg:flex">
        <DonutChartUi />
        <StocksInOutCard />
      </div>
      <div className="space-y-20 max-sm:pb-20">
        <ProfitLossCard />
        <AreaChartUsageExample />
      </div>
      <div className="md:max-lg:space-y-20 max-sm:p-4 max-sm:space-y-12 md:max-lg:flex items-end pb-4 justify-center">
        <Amount />
        <BarcodeList />
      </div>

    </div>
  );
};

export default page;
