import { useState, useEffect } from "react";
import { MenuItems } from "../../features/layout/menu-items";
import { IMenuItems, Set, Enabled, Chevron, Data } from "../../Interface";
import { Table } from "../../features/layout/table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTempTable } from "./useTempTable";
import {
  useGetPaginatedData,
  useGetSortedData,
  useDeleteRow,
} from "./useGetTableData";

import "../../styles/home.scss";
interface Datas {
  data: Data;
  len: number;
}
interface IProps {
  treedata: IMenuItems[];
  length: number;
  selected: string;
  overItem: string;
  onmouseover: (str: string) => void;
  onmouseout: (str: string) => void;
  set: Set;
  pageSize: number;
  setDataLength: (i: number) => void;
  changecategory: (str: string) => void;
  actcategory: string;
  datalength: number;
}

export function Home({
  treedata,
  actcategory,
  datalength,
  selected,
  overItem,
  set,
  setDataLength,
  changecategory,
  pageSize,
  onmouseover,
  onmouseout,
}: IProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const showPage = (id: number) => {
    setCurrentPage(id);
  };
  const [result, setResult] = useState<any[] | undefined>([] as any[]);
  const [len, setLen] = useState<number | undefined>(0);
  const [direction, setDirection] = useState<boolean>(true);
  const [isLoading, isFetching, isPreviousData, paginated_data] =
    useGetPaginatedData(
      direction,
      len as number,
      currentPage,
      set,
      actcategory
    );

  const [
    columns,
    chevron,
    selectedColumn,
    enabled,
    sort,
    onSort,
    showChevron,
    showSelectedColumn,
    showQuery,
  ] = useTempTable(
    set.actcategory,
    paginated_data && paginated_data["data"] && paginated_data["data"]["data"],
    treedata
  );

  const [sorted_isLoading, sorted_data] = useGetSortedData(
    sort,
    set,
    currentPage,
    actcategory,
    columns,
    selectedColumn,
    chevron
  );

  const m = useDeleteRow(set, currentPage);

  const deleteRow = () => m.mutate(9);
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
  }, [sorted_data]);

  useEffect(() => {
    setLen(
      sorted_data &&
        sorted_data["data"] &&
        (sorted_data["data"]["len"] as unknown as number)
    );
  }, [paginated_data, sorted_data]);
  return (
    <div className="container">
      <div className="left">
        <div className="menu">
          {" "}
          <MenuItems
            overItem={overItem}
            onmouseout={(str) => onmouseout(str)}
            onmouseover={(str) => onmouseover(str)}
            selected={actcategory}
            length={datalength}
            treedata={treedata}
            onClick={(str) => {
              changecategory(str);
            }}
          />
        </div>
      </div>
      <div className="right">
        <div className="ratios" style={{ height: "30px" }}>
          {isLoading && <div>isLoading</div>}
          {isFetching && <div>fetching</div>}n{JSON.stringify(isPreviousData)}n
        </div>
        <Table
          sort={() => onSort()}
          showChevron={(e: Boolean) => showChevron(e)}
          columns={columns}
          pageSize={pageSize}
          result={result}
          showSelectedColumn={showSelectedColumn}
          showQuery={(i) => {
            if (currentPage < i) setDirection(false);
            else setDirection(true);
            setCurrentPage(i);
          }}
          deleteRow={() => deleteRow()}
          len={len as number}
        />
      </div>
    </div>
  );
}
