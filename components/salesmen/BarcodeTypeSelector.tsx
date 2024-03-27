// BarcodeTypeSelector.jsx
import React from 'react';
import { Radio, RadioGroup } from '@nextui-org/react';

const BarcodeTypeSelector = ({ onChange }: { onChange: (value: string) => void }) => (
    <div className="w-full min-h-[100dvh] z-20 absolute top-0 left-0 backdrop-blur-sm p-8 flex flex-col items-center justify-center black/50">
        <RadioGroup className="dark:bg-white/50 p-4 rounded-3xl" onValueChange={onChange}>
            <h1>Select the type of the barcode</h1>
            <Radio value="stockIn">Stock In</Radio>
            <Radio value="stockOut">Stock Out</Radio>
        </RadioGroup>
    </div>
);

export default BarcodeTypeSelector;
