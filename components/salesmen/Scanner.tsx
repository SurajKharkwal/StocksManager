import React, { useEffect, useState } from 'react'
import { useZxing } from 'react-zxing';
import CameraSelector from './CameraSelector';
import BarcodeScanner from './BarcodeScanner';
import NoCameraDetected from './NoCameraDetected';
import BarcodeTypeSelector from './BarcodeTypeSelector';

const Scanner = () => {
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
    const [deviceId, setDeviceId] = useState("");
    const [reqType, setReqType] = useState("")
    const [result, setResult] = useState("")
    useEffect(() => {
        const getDevice = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                console.log(devices)
                const videoDevices = devices.filter(
                    (device) => device.kind === "videoinput"
                );
                if (videoDevices.length > 1)
                    setDevices(videoDevices)
                if (videoDevices.length === 1)
                    setDeviceId(devices[0].deviceId)

            } catch (error) {
                console.log("Error fetching video devices:", error);
            }
        };
        getDevice()
    }, [])

    const { ref } = useZxing({
        deviceId,
        onDecodeResult: (result) => {
            setResult(result.getText());
        },
    });
    if (devices.length === 0) {
        return <NoCameraDetected />
    }
    if (devices.length > 1) {
        return <CameraSelector devices={devices} onChange={setDeviceId} />
    }
    if (deviceId && devices.length > 0)
        return (
            <div>
                <BarcodeScanner ref={ref} />
                {
                    result && !reqType ? <BarcodeTypeSelector onChange={setReqType} /> : null
                }
            </div>
        )
    else {
        <div>Internal Server Error</div>
        }

}

export default Scanner