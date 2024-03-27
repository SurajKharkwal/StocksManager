import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
type formData = {
  barcode: string;
  name: string;
  sellingPrice: string;
  costPrice: string;
  quantity: number;
  size: string;
};

export async function POST(req: Request) {
  try {
    const data: formData = await req.json();
    const cookieStore = cookies();
    const inventoryId: any =
      cookieStore.get("inventoryId") || "7521c698-6768-4d25-83d8-d9fa3cc8ed06";
    const userId: any = cookieStore.get("userId") || "123456789";
    const newBarcode = genBarcode();
    await prisma.barcode.create({
      data: {
        barcode: newBarcode,
        costPrice: data.costPrice,
        sellingPrice: data.sellingPrice,
        name: data.name,
        size: data.size,
        quantity: data.quantity,
        inventoryId: inventoryId,
        userId: userId,
      },
    });
    return new NextResponse("barcode genrated", { status: 200 });
  } catch (error) {
    console.error("Error creating barcode:", error);
    return new NextResponse("Internal Server Error", { status: 403 });
  }
}

const genBarcode = () => {
  let min = Math.pow(10, 11);
  let max = Math.pow(10, 12) - 1;
  let num12 = Math.floor(Math.random() * (max - min + 1)) + min;
  let barcode = "";
  let oddSum = 0;
  let evenSum = 0;
  let temp = num12;
  for (let i = 1; i <= 12; i++) {
    let digit = num12 % 10;
    if (i % 2 === 0) {
      evenSum += digit;
    } else {
      oddSum += digit * 3;
    }
    num12 = Math.floor(num12 / 10);
  }
  const digit13 = (oddSum + evenSum) % 10 ? 10 - ((oddSum + evenSum) % 10) : 0;
  barcode = temp.toString() + digit13.toString();
  console.log(barcode);
  return barcode;
};
