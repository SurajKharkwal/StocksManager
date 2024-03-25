import React, { useState, useEffect } from 'react';
import { Button, Radio, RadioGroup } from '@nextui-org/react';
import { useZxing } from 'react-zxing';
import getDevice from './get-device';
import { useRouter } from 'next/navigation';

const Scanner = () => {
    const [result, setResult] = useState("hjhj");
    const [reqType, setReqType] = useState("");
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const videoDevices = await getDevice();
                setDevices(videoDevices);
            } catch (error) {
                console.log("Error fetching video devices:", error);
            }
        };

        fetchDevices();
    }, []);

    const availableDevices = devices.length > 0;
    let deviceId = availableDevices ? devices[0].deviceId : "";

    const { ref } = useZxing({
        deviceId,
        onDecodeResult: (result) => {
            setResult(result.getText());
        },
    });


    const handleClose = () => {
        router.push("/");
    };

    const handleStocksTypeChange = (value: any) => {
        setReqType(value);
    };

    const StocksType = () => (
        <div className={`w-full min-h-[100dvh] z-10 absolute top-0 left-0 backdrop-blur-sm ${!reqType && result ? '' : 'hidden'} p-8 flex flex-col items-center justify-center black/50`}>
            <RadioGroup 
            className='dark:bg-white/50 p-4 rounded-3xl'
             onValueChange={handleStocksTypeChange}>
                <h1>Select the type of the barcode</h1>
                <Radio value="stockIn">Stock In</Radio>
                <Radio value="stockOut">Stock Out</Radio>
            </RadioGroup>
        </div>
    );

    if (!availableDevices) {
        return <div>No Camera Detected</div>;
    }

    return (
        <div className="flex flex-col h-[95dvh] items-center justify-center gap-y-8">
            <StocksType />
            {
                deviceId===""?
                <RadioGroup
                className="w-full min-h-[100dvh]"
                onValueChange={(value) => { deviceId = value; }}
                >
                {devices.map((element: any) => (
                    <Radio key={element.deviceId} value={element.deviceId}>
                        {element.label}
                    </Radio>
                ))}
            </RadioGroup>:null
            }
            <video ref={ref} className="border-2 border-white/20 rounded-lg" />
            <form className="flex w-full items-center justify-center gap-4">
                <Button
                    onClick={handleClose}
                    className="bg-transparent border-2 border-blue-500 text-blue-500"
                >
                    Close
                </Button>
            </form>
        </div>
    );
};

export default Scanner;
