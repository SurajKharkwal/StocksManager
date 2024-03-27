import { PrismaClient } from "@prisma/client";
import { addWeeks, startOfMonth, endOfMonth } from "date-fns";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type RawData = {
  barcode: string;
  sellingPrice: number;
  costPrice: number;
  Stocks: {
    stocksIn: bigint;
    stocksOut: bigint;
  }[];
};

function formatdata(data: RawData[][]) {
  const output = [
    {
      amountIn: 0,
      amountOut: 0,
    },
    {
      amountIn: 0,
      amountOut: 0,
    },
    {
      amountIn: 0,
      amountOut: 0,
    },
    {
      amountIn: 0,
      amountOut: 0,
    },
    {
      amountIn: 0,
      amountOut: 0,
    },
  ];
  for (let i = 0; i < 6; i++) {
    if (data[i].length > 0)
      for (let j = 0; j < data[i].length; j++) {
        console.log(data[i][j]);
        output[j].amountIn +=
          data[i][j].costPrice * Number(data[i][j].Stocks[0].stocksIn);
        output[j].amountOut +=
          data[i][j].costPrice * Number(data[i][j].Stocks[0].stocksOut);
      }
  }
  return output;
}

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cookieStore = cookies();
    const inventoryId: any =
      cookieStore.get("inventoryId") || "7521c698-6768-4d25-83d8-d9fa3cc8ed06";
    const userId: any = cookieStore.get("userId") || "123456789";
    const today = new Date();
    const firstDayOfMonth = startOfMonth(today);
    const lastDayOfMonth = endOfMonth(today);

    const output: any[] = [];

    let startDate = firstDayOfMonth;
    while (startDate <= lastDayOfMonth) {
      const endDate = addWeeks(startDate, 1);

      const getData = await prisma.barcode.findMany({
        where: {
          inventoryId: inventoryId,
          userId: userId,
          Stocks: {
            some: {
              date: {
                gte: startDate.toISOString(),
                lt: endDate.toISOString(),
              },
            },
          },
        },
        select: {
          barcode: true,
          sellingPrice: true,
          costPrice: true,
          Stocks: {
            take: 1,
            where: {
              date: {
                gte: startDate.toISOString(),
                lte: endDate.toISOString(),
              },
            },
            select: {
              stocksIn: true,
              stocksOut: true,
            },
          },
        },
      });

      output.push(getData);

      startDate = addWeeks(startDate, 1);
    }
    const formattedData = formatdata(output);

    console.log(output, formattedData);

    return NextResponse.json({ rawData: formattedData }, { status: 200 });
  } catch (error) {
    console.log("An error occurred:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching data" },
      { status: 500 }
    );
  }
}

const dataFormatter = (rawData: []) => {};
