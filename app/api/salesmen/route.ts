import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { barcode, stocksIn, stocksOut } = await req.json();
    const cookieStore = cookies();
    // const inventoryId: any =
    //   cookieStore.get("inventoryId") || "7521c698-6768-4d25-83d8-d9fa3cc8ed06";
    // const userId: any = cookieStore.get("userId") || "123456789";

    const inventoryId = String(
      cookieStore.get("inventoryId") || "7521c698-6768-4d25-83d8-d9fa3cc8ed06"
    );
    const userId = String(cookieStore.get("userId") || "123456789");
    const newStocks = await prisma.stocks.findUnique({
      where: {
        barcode_date: {
          barcode: barcode,
          date: new Date().toISOString(),
        },
      },
    });
    console.log(newStocks);

    if (newStocks == null) {
      try {
        const newdata = await prisma.stocks.create({
          data: {
            barcode: barcode,
            inventoryId: inventoryId,
            stocksIn: BigInt(stocksIn), // Convert to BigInt
            stocksOut: BigInt(stocksOut), // Convert to BigInt
            userId: userId,
          },
        });
        console.log(newdata);
        return NextResponse.json("ok");
      } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error }, { status: 403 });
      }
    }
    try {
      const updateData = await prisma.stocks.update({
        where: {
          id: newStocks.id,
        },
        data: {
          stocksIn: BigInt(newStocks.stocksIn) + BigInt(stocksIn), // Convert to BigInt and perform operation
          stocksOut: BigInt(newStocks.stocksOut) + BigInt(stocksOut), // Convert to BigInt and perform operation
        },
      });
    console.log(updateData)
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: error }, { status: 403 });
    }

    return NextResponse.json({ stocks: newStocks });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 403 });
  }
}
