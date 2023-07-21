import { useState } from "react";
import { DataTable, Column, Record } from "../../../Interface";

const useBuildRows = (data: any) => {
  const [rows, setRows] = useState<Array<Record[]>>([]);
  let temprows: Array<Record> = [];
  let temp: Array<Array<Record>> = [[]];
  let ii = 0;

  const build = (data?: DataTable[], columns?: Column[]) => {
    const buildRows = (data1: DataTable, j: number) => {
      temprows = [
        ...temprows,
        ...Object.keys(data1).map((k, j) => {
          return (
            data1 !== undefined && typeof data1[k] !== "object" && data1[k]
          );
        }),
      ] as Record[];
    };
    data && data.map(buildRows);
    if (columns && columns.length > 0)
      temprows.map((t, i) => {
        if (columns && i !== 0 && i % columns.length === 0) {
          ii++;
          temp.push([]);
        }

        temp[ii] && temp[ii].push(t);
        return t;
      });
    setRows(temp);
  };

  return [rows, build] as const;
};
export { useBuildRows };
