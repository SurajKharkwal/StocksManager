const columns = [
  { name: "ITEMNAME", uid: "item" },
  { name: "AMOUNT-IN", uid: "inamount" },
  { name: "AMOUNT-OUT", uid: "outamount" },
  { name: "STOCK-OUT", uid: "stockout" },
  { name: "STOCK-IN", uid: "stockin" },
  { name: "STATUS", uid: "status" },
  { name: "TOOLS", uid: "actions" },
];

const users = [
  {
    id: 1,
    item: "Tony Reichert",
    inamount: 20,
    outamount: 20,
    status: "active",
    stockout: "29",
    stockin: "29",
    em13: "1234567890123",
  },
  {
    id: 2,
    item: "Zoey Lang",
    inamount: 20,
    outamount: 20,
    status: "paused",
    stockout: "25",
    stockin: "29",
    em13: "1234567890123",
  },
  {
    id: 3,
    item: "Jane Fisher",
    team: "Development",

    inamount: 20,
    outamount: 20,
    status: "active",
    stockout: "22",
    stockin: "29",
    em13: "1234567890123",
  },
  {
    id: 4,
    item: "William Howard",
    status: "vacation",
    inamount: 20,
    outamount: 20,
    stockout: "28",
    stockin: "29",
    em13: "1234567890123",
  },
  {
    id: 5,
    item: "Kristen Copper",
    status: "active",
    stockout: "24",
    inamount: 20,
    outamount: 20,
    stockin: "29",
    em13: "1234567890123",
  },
];

export { columns, users };
