import { useState, useEffect, useMemo } from "react";

import { Column, Data, DataTable, IMenuItems } from "../components/Interface";

interface Lenghts {
  [id: string]: number;
}

const useTempTable = (
  actualcategory: string,
  data: Data,
  treedata: IMenuItems[]
) => {
  const [categoryurl, setCategoryurl] = useState("");
  let columns: Column[] = [];

  const [datalengths, setDatalengths] = useState<Lenghts>({} as Lenghts);
  /*const filterData = (str: string): DataTable[] | undefined => {
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
       setTableflag(1);
        navigate("/" + actualcategory);
      });
  };
  const deleteRec = (str: string, rec: DataTable) => {
    data && data[actualcategory].splice(1, 1);
    let arr: DataTable[] | undefined = data && data[actualcategory];
    navigate("/" + actualcategory);
  };
  */

  columns = useMemo(() => {
    return data && data["new"]
      ? [
          ...Object.keys(data && data["new"] && data["new"][0]).map(
            (t: string) => {
              let d: any = { col: { title: t, disp: true } };
              return d;
            }
          ),
        ]
      : [];
  }, [data]);

  return [columns] as const;
};

export { useTempTable };
