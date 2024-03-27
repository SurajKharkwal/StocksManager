// BarcodeScanner.jsx
import React from 'react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

const BarcodeScanner = ({ ref }: { ref: any }) => {
    const router = useRouter()
    const handleClose = () => {
        router.push('/');
    };


    return (
        <>
            <video ref={ref} className="border-2 border-white/20 rounded-lg" />
            <form className="flex w-full items-center justify-center gap-4">
                <Button onClick={handleClose} className="bg-transparent border-2 border-blue-500 text-blue-500">
                    Close
                </Button>
            </form>
        </>
    );
};

export default BarcodeScanner;
