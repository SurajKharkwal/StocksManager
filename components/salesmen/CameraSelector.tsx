// CameraSelector.jsx
import React from 'react';
import { Radio, RadioGroup } from '@nextui-org/react';

const CameraSelector = ({ devices, onChange }: { devices: MediaDeviceInfo[], onChange: (value: string) => void }) => {
    console.log(devices)
    return (
        <RadioGroup
            className="w-full absolute top-0 left-0 z-20  min-h-[100dvh]"
            onValueChange={onChange}
        >
            {devices.map((element) => (
                <Radio key={element.deviceId} value={element.deviceId}>
                    {element.label}
                </Radio>
            ))}
        </RadioGroup>
    )
};

export default CameraSelector;
