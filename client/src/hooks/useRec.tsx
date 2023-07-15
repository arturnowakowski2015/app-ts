import { useState, useEffect, useRef } from "react";
import { DataTable, Column, Record } from "../components/Interface";

const useRec = (record: Record[], columns: Column[]) => {
  const [data, setData] = useState<DataTable>({});
  const data1 = useRef<Function>();
  let arr: DataTable = {};
  const createData = () => {
    if (record)
      arr = {
        [columns[0].col.title]: record[0].toString(),
        [columns[1].col.title]: record[1].toString(),
        [columns[2].col.title]: record[2].toString(),
        [columns[3].col.title]: record[3].toString(),
        [columns[4].col.title]: record[4].toString(),
      };
    setData(arr);
  };
  data1.current = createData;
  useEffect(() => {
    if (data1.current) data1.current();
  }, [record]);
  return [data, setData] as const;
};
export { useRec };
