import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const { skipCount } = await req.json()
    const cookieStore = cookies();
    const inventoryId: any =
        cookieStore.get("inventoryId") || "7521c698-6768-4d25-83d8-d9fa3cc8ed06";
    const userId: any = cookieStore.get("userId") || "123456789";
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    try {
        const readData = await prisma.barcode.findMany({
            take: 20, // Number of records to take
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
const stocksParser = (readData: any) => {
    readData.forEach((entry: any) => {
        let totalStocksIn = 0;
        let totalStocksOut = 0;
        entry.Stocks.forEach((stock: any) => {
            totalStocksIn += Number(stock.stocksIn);
            totalStocksOut += Number(stock.stocksOut);
        });
        const rec = {
            stocksIn: totalStocksIn,
            stocksOut: totalStocksOut
        };
        entry.Stocks = rec;
    });
    return readData;
};
