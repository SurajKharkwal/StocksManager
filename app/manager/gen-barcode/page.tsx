"use client";
import JsBarcode from "jsbarcode";
import React, { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { FaDownload } from "react-icons/fa6";
import MyForm from "@/components/manager/gen-barcode/InputForm";

const Page = () => {
  useEffect(() => {
    const generateBarcode = () => {
      const barcodeOptions = {
        format: "EAN13",
        text: "1234567890128",
        fontSize: 18,
        textMargin: 0,
      };

      const barcode = JsBarcode("#barcode");
      barcode.EAN13("1234567890128", barcodeOptions);
      barcode.render();
    };

    generateBarcode()
  }, []);

  const handleDownload = () => {
    const canvas: any = document.getElementById("barcode");
    const dataURL = canvas?.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "barcode.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // return(
  //   <div className="w-full h-[90dvh] flex items-center justify-center">
  //     <MyForm />

  //   </div>
  // )

  return (
    <div className=" w-full h-[89dvh] flex items-center justify-center flex-col gap-8">
      <canvas id="barcode"></canvas>
      <Button color="primary" startContent={<FaDownload />} onClick={handleDownload}>Barcode</Button>
    </div>
  );
};

export default Page;
