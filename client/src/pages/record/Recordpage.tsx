import { useState, useEffect } from "react";
import { MenuItems } from "../../features/layout/menu-items";
import { IMenuItems, Set, DataTable, Record } from "../../model/Interface";
import { Rec } from "../../features/layout/record";
import { useTempTable } from "../../features/layout/table/api/useTempTable";
import { useGetPaginatedData } from "../../features/layout/table/api/useGetPaginatedData";
import { useGetSortedData } from "../../features/layout/table/api/useGetSortedData";
import { useDeleteRow } from "../../features/layout/table/api/useDeleteRow";

import "../../styles/home.scss";

interface IProps {
  treedata: IMenuItems[];
  length: number;
  selected: string;
  overItem: string;
  onmouseover: (str: string) => void;
  set: Set;
  changecategory: (str: string) => void;
  actcategory: string;
  datalength: number;
  record?: Record[];

  deleteRec: (cat: string, str: DataTable) => void;
  update: (url: string, rec: DataTable) => void;
}

export function Recordpage({
  treedata,
  actcategory,
  datalength,
  selected,
  overItem,
  set,

  changecategory,
  onmouseover,
  record,
  deleteRec,
  update,
}: IProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const [result, setResult] = useState<any[] | undefined>([] as any[]);
  const [len, setLen] = useState<number | undefined>(0);
  const [direction, setDirection] = useState<boolean>(true);
  const [ref, setRef] = useState<boolean>(false);
  const { mutator, len1: l } = useDeleteRow(set, currentPage);

  const deleteRow = (id: number) => {
    mutator.mutate(id);

    setRef(true);
  };

  const {
    isLoading,
    isFetching,
    isSuccess,
    data: paginated_data,
  } = useGetPaginatedData(
    1,
    direction,
    len as number,
    currentPage,
    set,
    actcategory
  );

  const {
    columns,
    chevron,
    selectedColumn,
    sort,
    onSort,
    showChevron,
    showSelectedColumn,
  } = useTempTable(
    set.actcategory,
    paginated_data && paginated_data["data"] && paginated_data["data"]["data"],
    treedata
  );

  const { sorted_data, r } = useGetSortedData(
    1,
    sort,
    set,
    currentPage,
    actcategory,
    columns,
    selectedColumn,
    chevron
  );

  useEffect(() => {
    setResult(
      paginated_data &&
        paginated_data["data"] &&
        (paginated_data["data"]["data"] as unknown as any[])
    );
  }, [paginated_data]);
  useEffect(() => {
    setResult(
      sorted_data &&
        sorted_data["data"] &&
        (sorted_data["data"]["data"] as unknown as any[])
    );
  }, [sorted_data]); // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    r();
    setRef(false);
  }, [ref]); // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setLen(
      sorted_data &&
        sorted_data["data"] &&
        (sorted_data["data"]["len"] as unknown as number)
    );
  }, [paginated_data, sorted_data]); // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div className="container">
      <div className="left">
        <div className="menu"> </div>
      </div>
      <div className="reight">
        <Rec
          record={record}
          columns={columns}
          deleteRec={deleteRec}
          update={update}
        />
      </div>
    </div>
  );
}
