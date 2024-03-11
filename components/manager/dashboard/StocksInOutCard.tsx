import { Card } from "@nextui-org/card";
import { Progress } from "@nextui-org/react";
import React from "react";

const StocksInOutCard = () => {
  return (
    <div className="flex flex-col w-full gap-8">
      <Card className="p-4 shadow-lg min-w-[345px] gap-4 flex">
        <div className="flex items-start justify-evenly gap-4 ">
          <h1 className="font-extralight text-gray-400">{"Stocks-in"}</h1>
          <p className="font-semibold text-2xl">{"13,45,598"}</p>
        </div>
        <Progress
          size="sm"
          color="success"
          aria-label="Loading..."
          value={30}
        />
      </Card>

      <Card className="p-4 shadow-lg min-w-[345px] gap-4 flex">
        <div className="flex items-start justify-evenly gap-4 ">
          <h1 className="font-extralight text-gray-400">{"Stocks-out"}</h1>
          <p className="font-semibold text-2xl">{"13,45,598"}</p>
        </div>
        <Progress size="sm" color="danger" aria-label="Loading..." value={30} />
      </Card>
      <Card className="p-4 shadow-lg min-w-[345px] gap-4 flex">
        <div className="flex items-start justify-evenly gap-4 ">
          <h1 className="font-extralight text-gray-400">{"Stocks-Left"}</h1>
          <p className="font-semibold text-2xl">{"15,008"}</p>
        </div>
        <Progress size="sm" color="warning" aria-label="Loading..." value={30} />
      </Card>
    </div>
  );
};

export default StocksInOutCard;
