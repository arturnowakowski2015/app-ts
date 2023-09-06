import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { IMenuItems, Set } from "../../../model/Interface";
import { useTempTable } from "../../../features/layout/table/api/useTempTable";
import { useGetPaginatedData } from "../../../features/layout/table/api/useGetPaginatedData";

const useSettings = (
  actcategory: string,
  set: Set,
  pageSize: number,

  treedata: IMenuItems[]
) => {
  const [len, setLen] = useState<number>(0);
  const [database, setDatabase] = useState<string>("");
  const [direction, setDirection] = useState<boolean>(true);
  const location = useLocation();
  const { data: paginated_data, refetch } = useGetPaginatedData(
    location.pathname.split("/")[1],
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
    paginated_data?.["data"]?.["data"],
    treedata
  );
  useEffect(() => {
    refetch();
  }, [database]);

  return {
    len,
    columns,
    setDirection,
    showSelectedColumn,
    paginated_data,
    onSort,
    showChevron,
    setDatabase,
    refetch,
  };
};
export { useSettings };
