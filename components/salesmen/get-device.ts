
const getDevice = async () => {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
        );
        console.log(videoDevices)
        return videoDevices;

    } catch (error) {
        console.log("Error fetching video devices:", error);
        return [];
    }
};
export default getDevice;