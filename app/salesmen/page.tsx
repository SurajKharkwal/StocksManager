"use client";
import React, { useEffect, useState } from "react";
import { useZxing } from "react-zxing";
import { Button } from "@nextui-org/button";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { useRouter } from "next/navigation";
import RecordTable, { ResultList } from "@/components/salesmen/RecordTable";

const Page: React.FC = () => {
  const router = useRouter();

  const [resultList, setResultList] = useState<ResultList[]>([]);
  const BarcodeScanner: React.FC = () => {
    const [showTable, setShowTable] = useState(false);
    const [result, setResult] = useState("23673376r47");
    const [deviceId, setDeviceId] = useState("");
    const [resultType, setResultType] = useState("");
    const [availableVideoDevices, setAvailableVideoDevices] = useState<
      MediaDeviceInfo[]
    >([]);

    useEffect(() => {
      const fetchDevices = async () => {
        try {
          const devices = await navigator.mediaDevices.enumerateDevices();
          const videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );

          setAvailableVideoDevices(videoDevices);

          if (videoDevices.length == 0) {
            setDeviceId(videoDevices[0].deviceId);
          }
        } catch (error) {
          console.error("Error fetching video devices:", error);
        }
      };

      fetchDevices();
    }, []);

    const { ref } = useZxing({
      deviceId,
      onDecodeResult: (result) => {
        setResult(result.getText());
      },
    });
    const handleClose = () => {
      router.push("/manager/dashboard");
    };
    const handleSubmit = () => {
      const dateObj = new Date();
      const record: ResultList[] = resultList;
      if (result && resultType) {
        const time = dateObj.getHours() + ":" + dateObj.getMinutes();
        const date =
          dateObj.getDate() +
          "/" +
          dateObj.getMonth() +
          "/" +
          dateObj.getFullYear();
        record.push({ barcode: result, time: time, date: date });
        setResultList(record);
        setResult("");
        setResultType("");
        console.log(resultList);
      }
      setShowTable(true);
    };
    const SelectType: React.FC = () => {
      return (
        <div className="w-full h-[100dvh] backdrop-blur-lg absolute z-10 top-0 left-0 flex items-center justify-center">
          <div className="w-sm h-auto p-8 bg-black/80 rounded-lg  absolute z-10 ">
            <div className="w-full">
              <RadioGroup
                label="Select the Type"
                onValueChange={setResultType}
                value={resultType}
                color="primary"
              >
                <Radio key={1} value={"stock-in"}>
                  Add Product(Stock-in);
                </Radio>
                <Radio key={2} value={"stock-out"}>
                  Sell Product(Stock-out);
                </Radio>
              </RadioGroup>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="w-full h-[100vh] flex items-center justify-center p-4">
        {result && !resultType && <SelectType />}
        {availableVideoDevices.length > 1 && !deviceId ? (
          <div className="w-sm h-auto p-8 bg-white/10 rounded-lg  absolute z-10 ">
            <div className="w-full">
              <RadioGroup
                label="Select the device"
                onValueChange={setDeviceId}
                value={deviceId}
              >
                {availableVideoDevices.map((device) => (
                  <Radio key={device.deviceId} value={device.deviceId}>
                    {device.label || `Device ${device.deviceId}`}
                  </Radio>
                ))}
              </RadioGroup>
            </div>
          </div>
        ) : (
          <div className="grid items-center justify-center gap-y-8">
            <video ref={ref} className="border-2 border-white/20 rounded-lg" />
            <form className="flex w-full items-center justify-center gap-4">
              <Button onClick={handleSubmit} color="primary">
                Submit
              </Button>
              <Button
                onClick={handleClose}
                className="bg-transparent border-2 border-blue-500 text-blue-500"
              >
                Close
              </Button>
            </form>
          </div>
        )}
        {showTable && (
          <RecordTable resultList={resultList} setShowTable={setShowTable} />
        )}
      </div>
    );
  };
  return (
    <div className="relative">
      <BarcodeScanner />
    </div>
  );
};

export default Page;
