"use client";
import React, { Suspense, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { FaDownload } from "react-icons/fa6";
import JsBarcode from "jsbarcode";
import { useSearchParams } from "next/navigation";

const PageWithSuspense = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("barcode") || "1234567890128";
  console.log(search);

  useEffect(() => {
    const generateBarcode = () => {
      const barcodeOptions = {
        format: "EAN13",
        text: search,
        fontSize: 18,
        textMargin: 0,
      };

      const barcode = JsBarcode("#barcode");
      barcode.EAN13(search, barcodeOptions);
      barcode.render();
    };

    generateBarcode();
  }, [search]);

  const handleDownload = () => {
    const canvas: any = document.getElementById("barcode");
    const dataURL = canvas?.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL || "";
    link.download = "barcode.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-[89dvh] flex items-center justify-center flex-col gap-8">
      <canvas id="barcode"></canvas>
      <Button
        color="primary"
        startContent={<FaDownload />}
        onClick={handleDownload}
      >
        Barcode
      </Button>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageWithSuspense />
    </Suspense>
  );
};

export default Page;
