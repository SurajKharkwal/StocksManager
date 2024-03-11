"use client"
import React, { useState } from 'react';
import { Input, Button, Spacer } from '@nextui-org/react';

const MyForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    sellingPrice: '',
    costPrice: '',
    quantity: '',
    size: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Add your form submission logic here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form className="max-w-md mx-auto mt-8 p-6 bg-white/5 w-full rounded-md shadow-lg " onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="text-gray-600 text-sm font-medium mb-2" htmlFor="name">
          Name
        </label>
        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
      </div>

      <div className="mb-4">
        <label className="text-gray-600 text-sm font-medium mb-2" htmlFor="sellingPrice">
          Selling Price
        </label>
        <Input
          id="sellingPrice"
          name="sellingPrice"
          type="number"
          value={formData.sellingPrice}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-600 text-sm font-medium mb-2" htmlFor="costPrice">
          Cost Price
        </label>
        <Input
          id="costPrice"
          name="costPrice"
          type="number"
          value={formData.costPrice}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-600 text-sm font-medium mb-2" htmlFor="quantity">
          Quantity
        </label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-600 text-sm font-medium mb-2" htmlFor="size">
          Size
        </label>
        <Input id="size" name="size" value={formData.size} onChange={handleInputChange} />
      </div>

      <Spacer y={2} />

      <div className="flex justify-center">
        <Button color="primary" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default MyForm;
