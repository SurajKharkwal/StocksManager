import axios from "axios";

const columns = [
  { name: "ITEMNAME", uid: "name" },
  { name: "AMOUNT-IN", uid: "amountIn" },
  { name: "AMOUNT-OUT", uid: "amountOut" },
  { name: "STOCKS-OUT", uid: "stocksOut" },
  { name: "STOCKS-IN", uid: "stocksIn" },
  { name: "STATUS", uid: "status" },
  { name: "TOOLS", uid: "actions" },
];
export type Users = {
  id: number;
  name: String;
  amoountIn: number;
  amountOut: string;
  status: string;
  stocksIn: number;
  stocksOut: number;
  barcode: string;
};
let users: Users[] = [];

async function fetchData(skipCount: number) {
  const res = await axios.post("/api/manager/inventory", { skipCount });
  users = res.data;
  console.log(users);
  return users;
}
export { columns, users, fetchData };
