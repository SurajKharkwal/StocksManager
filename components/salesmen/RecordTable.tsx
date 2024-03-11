import { Button } from "@nextui-org/button";

export type ResultList = {
  barcode: string;
  date: string;
  time: string;
};
const RecordTable = ({
  resultList,
  setShowTable,
}: {
  resultList: ResultList[];
  setShowTable(value: boolean): void;
}) => {
  const handleClose = () => {
    setShowTable(false);
  };
  const handleSubmit = () => {};
  return (
    <div className="absolute flex items-center justify-center backdrop-blur-md w-full h-[100dvh] z-10">
      <div className=" border-2 dark:bg-black/60 bg-white/30 p-2 max-w-screen-sm w-full rounded-xl">
        <div className=" flex items-center rounded-3xl bg-blue-400 p-2 w-full gap-8 justify-evenly">
          <h1>BARCODE</h1>
          <h1>TIME</h1>
          <h1>DATE</h1>
        </div>
        {resultList.map(
          (obj: { barcode: string; date: string; time: string }, index: number) => (
            <div key={index} className=" flex items-center justify-evenly p-2 gap-8">
              <h2>{obj.barcode}</h2>
              <h2>{obj.date}</h2>
              <h2>{obj.time}</h2>
            </div>
          )
        )}
        <div className="w-full h-auto gap-4 flex items-center justify-end">
          <Button className="" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button
            onClick={handleClose}
            className="border-blue-400 bg-transparent border-2 "
            variant="bordered"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecordTable;
