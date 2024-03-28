import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  console.log("ok");
  const { skipCount } = await req.json();
  const cookieStore = cookies();
  // const inventoryId: any =
  //     cookieStore.get("inventoryId") || "7521c698-6768-4d25-83d8-d9fa3cc8ed06";
  // const userId: any = cookieStore.get("userId") || "123456789";

  const inventoryId = String(
    cookieStore.get("inventoryId") || "39730d1c-bdc5-433c-a780-fecf82d08622"
  );
  const userId = String(cookieStore.get("userId") || "123456789");
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  try {
    console.log("ok");
    const readData = await prisma.barcode.findMany({
      take: 3, // Number of records to take
      skip: skipCount, // Number of records to skip
      where: {
        inventoryId: inventoryId,
        userId: userId,
      },
      select: {
        barcode: true,
        costPrice: true,
        sellingPrice: true,
        name: true,
        Stocks: {
          where: {
            date: {
              gte: firstDayOfMonth.toISOString(),
              lte: lastDayOfMonth.toISOString(),
            },
          },
          select: {
            stocksIn: true,
            stocksOut: true,
          },
        },
      },
    });
    console.log(readData);
    const parsedData = stocksParser(readData);

    console.log(parsedData);

    return NextResponse.json(parsedData);
  } catch (error) {
    console.log("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
type ReadData = {
  barcode: string;
  costPrice: Decimal;
  sellingPrice: Decimal;
  name: string;
  Stocks: {
    stocksIn: BigInt;
    stocksOut: BigInt;
  }[];
};
const stocksParser = (readData: ReadData[]) => {
  let count = 1;
  const output: any[] = [];
  readData.forEach((entry: any) => {
    const newData = {
      id: 0,
      name: "",
      barcode: "",
      stocksIn: 0,
      stocksOut: 0,
      amountIn: 0,
      amountOut: 0,
      status: "",
    };
    newData.name = entry.name;
    newData.barcode = entry.barcode;
    newData.id = count;
    let totalAmountIn = 0;
    let toatalAmountOut = 0;
    let totalStocksIn = 0;
    let totalStocksOut = 0;
    entry.Stocks.forEach((stock: { stocksIn: BigInt; stocksOut: BigInt }) => {
      totalAmountIn += Number(stock.stocksIn) * entry.costPrice;
      toatalAmountOut += Number(stock.stocksOut) * entry.sellingPrice;
      totalStocksIn += Number(stock.stocksIn);
      totalStocksOut += Number(stock.stocksOut);
    });
    newData.amountIn = totalAmountIn;
    newData.amountOut = toatalAmountOut;
    newData.stocksIn = totalStocksIn;
    newData.stocksOut = totalStocksOut;
    if (newData.stocksIn > newData.stocksOut) {
      newData.status = "loss";
    } else if (newData.stocksIn === newData.stocksOut) {
      newData.status = "neutral";
    } else {
      newData.status = "profit";
    }
    count++;
    output.push(newData);
  });
  return output;
};
