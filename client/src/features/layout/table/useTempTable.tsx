import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  Column,
  DataTable,
  Enabled,
  IMenuItems,
} from "../../../model/Interface";

interface Lenghts {
  [id: string]: number;
}

const useTempTable = (
  actualcategory: string,
  result: any,

  treedata: IMenuItems[]
) => {
  let columns: Column[] = [];

  const navigate = useNavigate();
  const [tableflag, setTableflag] = useState(1);
  /*const filterData = (str: string): DataTable[] | undefined => {
    if (data && (actualcategory === "new" || actualcategory === "postponed")) {
      return data[actualcategory].filter((t) => {
        return typeof t.name === "string" && t.name.includes(str);
      });
    }
  };
 
  
  */
  const [chevron, setChevron] = useState<Boolean>(false);
  const [enabled, setEnabled] = useState<Enabled>({
    e: [false, false],
  } as Enabled);

  const showChevron = (str: Boolean) => {
    setChevron(str);
  };
  const [sort, setSort] = useState<boolean>(false);
  const [selectedColumn, setSelectedColumn] = useState<number>(0);
  const showSelectedColumn = (i: number) => {
    setSelectedColumn(i);
  };
  const onSort = () => {
    setSort(!sort);
  };
  const showQuery = (e: Enabled) => {
    setEnabled(e);
  };
  columns = useMemo(() => {
    return result && result[0]
      ? [
          ...Object.keys(result && result[0]).map((t: string) => {
            let d: any = { col: { title: t, disp: true } };
            return d;
          }),
        ]
      : [];
  }, [result]);

  return {
    columns,
    chevron,
    selectedColumn,
    enabled,
    sort,
    onSort,
    showChevron,
    showSelectedColumn,
    showQuery,
  } as const;
};

export { useTempTable };
