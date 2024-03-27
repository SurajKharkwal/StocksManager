"use client";
import React, { useCallback, useState } from "react";
import { Input, Button, Spacer } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const MyForm: React.FC = () => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    sellingPrice: "",
    costPrice: "",
    quantity: "",
    size: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessag] = useState("");
  const router = useRouter();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    if (
      !formData.costPrice ||
      !formData.sellingPrice ||
      !formData.name ||
      !formData.quantity ||
      !formData.size
    ) {
      setErrorMessag("Please Fill complete form ");
      return;
    } else {
      setIsLoading(true);
      const res = await axios.post("/api/manager/gen-barcode", formData);
      router.push(
        "/manager/showBarcode" + "?" + createQueryString("barcode", res.data)
      );
    }
    setIsLoading(false);
    // Add your form submission logic here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form
      className="max-w-md mx-auto mt-8 p-6 bg-zinc-950 w-full rounded-md shadow-lg "
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          className="text-gray-600 p-4 text-md font-medium mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter the Item Name eg: T-Shirt"
        />
      </div>

      <div className="mb-4">
        <label
          className="text-gray-600 text-md p-4 font-medium mb-2"
          htmlFor="costPrice"
        >
          Cost Price
        </label>
        <Input
          id="costPrice"
          name="costPrice"
          type="number"
          value={formData.costPrice}
          onChange={handleInputChange}
          placeholder="Enter the CostPrice "
        />
      </div>

      <div className="mb-4">
        <label
          className="text-gray-600 text-md p-4 font-medium mb-2"
          htmlFor="sellingPrice"
        >
          Selling Price
        </label>
        <Input
          id="sellingPrice"
          name="sellingPrice"
          type="number"
          value={formData.sellingPrice}
          onChange={handleInputChange}
          placeholder="Enter the SellingPrice"
        />
      </div>
      <div className="mb-4">
        <label
          className="text-gray-600 text-md p-4 font-medium mb-2"
          htmlFor="quantity"
        >
          Quantity
        </label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleInputChange}
          placeholder="Enter the quantity eg: 1 ,2or 3"
        />
      </div>

      <div className="mb-4">
        <label
          className="text-gray-600 text-md p-4 font-medium mb-2"
          htmlFor="size"
        >
          Size
        </label>
        <Input
          id="size"
          name="size"
          value={formData.size}
          onChange={handleInputChange}
          placeholder="Enter the size eg: xl"
        />
      </div>
      <p className="font-extralight text-red-500 w-full text-center flex items-center justify-center">
        {errorMessage}
      </p>

      <Spacer y={2} />

      <div className="flex justify-center">
        <Button isLoading={isLoading} color="primary" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default MyForm;
