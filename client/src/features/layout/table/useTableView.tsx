import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { Column, Data, DataTable, Record } from "../../../Interface";

const useTable = (actualcategory: string) => {
  const navigate = useNavigate();
  const [tableflag, setTableflag] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState<Record[]>();
  const [data, setData] = useState<Data | undefined>();

  let columns: Column[] = [];
  const filterData = (str: string): DataTable[] | undefined => {
    if (data && (actualcategory === "new" || actualcategory === "postponed")) {
      return data[actualcategory].filter((t) => {
        return typeof t.name === "string" && t.name.includes(str);
      });
    }
  };
  const update = (url: string, rec: DataTable) => {
    fetch(
      "https://jsonplaceholder.typicode.com/" +
        url +
        "/" +
        rec[columns[1].col.title],
      {
        method: "PUT",
        body: JSON.stringify({
          [columns[0].col.title]: rec[columns[0].col.title],
          [columns[1].col.title]: rec[columns[1].col.title],
          [columns[2].col.title]: rec[columns[2].col.title],
          [columns[3].col.title]: rec[columns[3].col.title],
          [columns[4].col.title]: rec[columns[4].col.title],
        }),

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        if (data)
          data[actualcategory].splice(Number(columns[1].col.title), 1, json);
        setData({ ...data });
        setTableflag(1);
        navigate("/" + actualcategory);
      });
  };
  const deleteRec = (str: string, rec: DataTable) => {
    data && data[actualcategory].splice(1, 1);
    let arr: DataTable[] | undefined = data && data[actualcategory];
    setData({ ...data, actualcategory: arr as DataTable[] });
    navigate("/" + actualcategory);
  };

  const loadDatabase = async (idurl: number): Promise<any> => {};

  const selectRecord = (rec: Record[]) => {
    setSelectedRecord(rec);
  };

  columns = useMemo(() => {
    return data && data["new"]
      ? [
          ...Object.keys(data["new"][0]).map((t: string) => {
            let d: any = { col: { title: t, disp: true } };
            return d;
          }),
        ]
      : [];
  }, [actualcategory]); // eslint-disable-next-line react-hooks/exhaustive-deps

  return [
    columns,

    selectedRecord,

    tableflag,
    deleteRec,
    loadDatabase,
    filterData,
    selectRecord,
    update,
    setTableflag,
  ] as const;
};

export { useTable };
