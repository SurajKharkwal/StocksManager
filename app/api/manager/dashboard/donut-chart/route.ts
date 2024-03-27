import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type Stocks = {
  date: Date;
  stocksIn: bigint;
  stocksOut: bigint;
};

type FormatedStocks = {
  date: Date;
  stocksIn: string;
  stocksOut: string;
};

type FormatedRawData = {
  barcode: string;
  costPrice: number;
  sellingPrice: number;
  formattedStocks: FormatedStocks[];
};

type RawData = {
  barcode: string;
  sellingPrice: Decimal;
  costPrice: Decimal;
  Stocks: Stocks[];
};

function calculateTotalStocks(rawData: FormatedRawData[]) {
  let totalStocksOut = 0;
  let totalStocksIn = 0;

  rawData.forEach((element: FormatedRawData) => {
    element.formattedStocks.forEach((ele: FormatedStocks) => {
      totalStocksIn += Number(ele.stocksIn);
      totalStocksOut += Number(ele.stocksOut);
    });
  });

  return { totalStocksIn, totalStocksOut };
}
const prisma = new PrismaClient();

export async function GET() {
  try {
    const cookieStore = cookies();
    const inventoryId = String(cookieStore.get("inventoryId") || "39730d1c-bdc5-433c-a780-fecf82d08622");
    const userId = String(cookieStore.get("userId") || "123456789");
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );

    const getData = await prisma.barcode.findMany({
      where: {
        inventoryId: inventoryId,
        userId: userId,
      },
      select: {
        barcode: true,
        sellingPrice: true,
        costPrice: true,
        Stocks: {
          where: {
            date: {
              gte: firstDayOfMonth.toISOString(),
              lte: lastDayOfMonth.toISOString(),
            },
          },
          select: {
            date: true,
            stocksIn: true,
            stocksOut: true,
          },
        },
      },
    });

    console.log(getData);

    const rawData = typeConvertor(getData);
    const { totalStocksIn, totalStocksOut } = calculateTotalStocks(rawData);
    console.log(rawData);

    return NextResponse.json(
      { rawData, totalStocksIn, totalStocksOut },
      { status: 200 }
    );
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching data" },
      { status: 500 }
    );
  }
}

const typeConvertor = (getData: RawData[]) => {
  const output: any[] = [];
  getData.map((element: RawData) => {
    const formatedData: FormatedRawData = {
      barcode: "",
      sellingPrice: 0.0,
      costPrice: 0.0,
      formattedStocks: [],
    };
    formatedData.barcode = element.barcode;
    formatedData.costPrice = element.costPrice.toNumber();
    formatedData.sellingPrice = element.sellingPrice.toNumber();
    element.Stocks.forEach((ele: Stocks) => {
      const newSstocks = {
        date: new Date(),
        stocksIn: "",
        stocksOut: "",
      };
      newSstocks.date = ele.date;
      newSstocks.stocksIn = ele.stocksIn.toString();
      newSstocks.stocksOut = ele.stocksOut.toString();
      formatedData.formattedStocks.push(newSstocks);
    });
    output.push(formatedData);
  });
  return output;
};
