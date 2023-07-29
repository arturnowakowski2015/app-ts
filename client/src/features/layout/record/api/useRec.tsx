import { useState, useEffect, useRef } from "react";
import { DataTable, Column, Record } from "../../../../model/Interface";

const useRec = (record: DataTable[], columns: Column[]) => {
  const [data, setData] = useState<DataTable>({});
  const data1 = useRef<Function>();
  let arr: DataTable = {};
  const createData = () => {
    if (record) {
      for (let t in record[0]) arr = { ...arr, [t]: record[0][t] };
    }
    setData(arr);
  };
  useEffect(() => {
    createData();
  }, [record]);
  return { data, setData } as const;
};
export { useRec };
