"use client";
import JsBarcode from "jsbarcode";
import React, { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { FaDownload } from "react-icons/fa6";
import MyForm from "@/components/manager/gen-barcode/InputForm";

const Page = () => {
  return(
    <div className="w-full h-[90dvh] flex items-center justify-center">
      <MyForm />
    </div>
  )
};

export default Page;
