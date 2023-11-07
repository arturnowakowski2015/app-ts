import { useState, useMemo } from "react";

import { Column, Data, DataTable, Record } from "../../../../model/Interface";

const useTable = (actualcategory: string) => {
  const [tableflag, setTableflag] = useState(1);
  const selectedRecord: Record[] = [];
  const data: Data | undefined = {};

  let columns: Column[] = [];
  const filterData = (str: string): DataTable[] | undefined => {
    if (data && (actualcategory === "new" || actualcategory === "postponed")) {
      return data[actualcategory].filter((t) => {
        return typeof t.name === "string" && t.name.includes(str);
      });
    }
  };

  const loadDatabase = (idurl: number): void => {};

  columns = useMemo(() => {
    return data && data["new"]
      ? [
          ...Object.keys(data["new"][0]).map((t: string) => {
            let d: any = { col: { title: t, disp: true } };
            return d;
          }),
        ]
      : []; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualcategory]);

  return {
    columns,

    selectedRecord,

    tableflag,
    loadDatabase,
    filterData,
    setTableflag,
  } as const;
};

export { useTable };
