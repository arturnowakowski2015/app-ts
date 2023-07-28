import { Route, useNavigate, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import TreeSettings from "../../features/layout/tree-settings/tree-settings";
import { IMenuItems, Set } from "../../model/Interface";
import { useTempTable } from "../../features/layout/table/api/useTempTable";
import { useGetPaginatedData } from "../../features/layout/table/api/useGetPaginatedData";

import { Element } from "../../model/Interface";

import { Table } from "../../features/layout/table/table";
import { PossibleLabel } from "../../features/ui/possible-label";

const useSettings = (
  actcategory: string,
  set: Set,
  datalength: number,
  pageSize: number,

  el: Element,
  idroot: string | null,
  treedata: IMenuItems[]
) => {
  const [result, setResult] = useState<any[] | undefined>([] as any[]);
  const [len, setLen] = useState<number | undefined>(0);
  const [database, setDatabase] = useState<string>("");
  const [direction, setDirection] = useState<boolean>(true);
  const { data: paginated_data, refetch } = useGetPaginatedData(
    pageSize,
    direction,
    len as number,
    1,
    set,
    actcategory
  );

  const {
    columns,

    onSort,
    showChevron,
    showSelectedColumn,
  } = useTempTable(
    set.actcategory,
    paginated_data && paginated_data["data"] && paginated_data["data"]["data"],
    treedata
  );
  useEffect(() => {
    refetch();
  }, [database]);

  return [
    result,
    len,
    columns,
    setDirection,
    showSelectedColumn,
    paginated_data,
    onSort,
    showChevron,
    setDatabase,
  ];
};
export { useSettings };
