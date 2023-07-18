import { useState } from "react";
import { DataTable } from "../components/Interface";
const useSort = () => {
  const [sortDirection, setSortDirection] = useState(false);
  const [sortedData, setSortedData] = useState<DataTable[] | undefined>([]);
  const sortData = (i: number, data?: DataTable[]) => {
    setSortDirection(!sortDirection);
    let r: string[] = [];
    if (data)
      r = Object.keys(data[0]).filter((t) => {
        return data[0][t];
      });
    sortDirection
      ? data &&
        data.sort(function (a: any, b: any) {
          return typeof a[r[i]] === "string"
            ? a[r[i]].localeCompare(b[r[i]])
            : a[r[i]] - b[r[i]];
        })
      : data &&
        data.sort(function (a: any, b: any) {
          return typeof a[r[i]] === "string"
            ? b[r[i]].localeCompare(a[r[i]])
            : b[r[i]] - a[r[i]];
        });
    setSortedData(data);
    return sortData;
  };
  return { sortedData, sortData };
};
export { useSort };
