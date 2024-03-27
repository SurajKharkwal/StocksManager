import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type RawData = {
  sellingPrice: Decimal;
  costPrice: Decimal;
  Stocks: {
    date: Date;
    stocksIn: bigint;
    stocksOut: bigint;
  }[];
};

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cookieStore = cookies();

    const inventoryId = String(
      cookieStore.get("inventoryId") || "7521c698-6768-4d25-83d8-d9fa3cc8ed06"
    );
    const userId = String(cookieStore.get("userId") || "123456789");
    // const inventoryId: any =
    //   cookieStore.get("inventoryId") || "7521c698-6768-4d25-83d8-d9fa3cc8ed06";
    // const userId: any = cookieStore.get("userId") || "123456789";
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );

    const data = await prisma.barcode.findMany({
      where: {
        userId: userId,
        User_Barcode_inventoryIdToUser: {
          inventoryId: inventoryId,
        },
      },
      select: {
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
    console.log(data);
    const formattedData = dataParser(data);

    return NextResponse.json(formattedData, { status: 200 });
  } catch (error) {
    console.log("An error occurred:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching data" },
      { status: 500 }
    );
  }
}
type Output = {
  date: Date;
  stocksIn: number;
  stocksOut: number;
};
const dataParser = (data: RawData[]) => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const output: Output[] = [];

  data.forEach((element) => {
    element.Stocks.forEach((stock) => {
      const skeleton = {
        date: new Date(),
        stocksIn: 0,
        stocksOut: 0,
      };
      const stockDate = new Date(stock.date);
      // console.log(output);
      if (stockDate >= firstDayOfMonth && stockDate < lastDayOfMonth) {
        const existingEntry = output.find(
          (entry) => entry.date.toISOString() === stockDate.toISOString()
        );
        // console.log(existingEntry);
        if (existingEntry) {
          existingEntry.stocksIn += Number(stock.stocksIn);
          existingEntry.stocksOut += Number(stock.stocksOut);
        } else {
          skeleton.date = stockDate;
          skeleton.stocksIn = Number(stock.stocksIn);
          skeleton.stocksOut = Number(stock.stocksOut);
          output.push(skeleton);
        }
      }
    });
  });

  return output;
};
