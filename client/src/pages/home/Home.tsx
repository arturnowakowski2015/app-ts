import { useState, useEffect } from "react";
import { MenuItems } from "../../features/layout/menu-items";
import { IMenuItems, Set } from "../../model/Interface";
import { Table } from "../../features/layout/table";
import { useTempTable } from "../../features/layout/table/api/useTempTable";
import useHome from "./useHome";
import {
  useGetPaginatedData,
  useGetSortedData,
  useDeleteRow,
  useGetLength,
} from "../../features/layout/table/api/useGetTableData";

import "../../styles/home.scss";

interface IProps {
  treedata: IMenuItems[];
  length: number;
  selected: string;
  overItem: string;
  onmouseover: (str: string) => void;
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

  changecategory,
  pageSize,
  onmouseover,
}: IProps) {
  const {
    mutatedLen,
    result,
    currentPage,
    paginated_data,
    len,
    mutator,
    isLoading,
    isFetching,
    onSort,
    showChevron,
    columns,
    showSelectedColumn,
    setDirection,
    setCurrentPage,
    deleteRow,
    setLen,
  } = useHome(set, treedata, actcategory);
  return (
    <div className="container">
      aaaa
      <div className="left">
        <div className="menu">
          {" "}
          <MenuItems
            overItem={overItem}
            onmouseover={(str) => onmouseover(str)}
            selected={actcategory}
            length={datalength}
            treedata={treedata}
            onClick={(str) => {
              changecategory(str);
            }}
          />
        </div>{" "}
      </div>
      <div className="right">
        <div className="ratios" style={{ height: "30px" }}>
          {isLoading && <div>isLoading</div>}
          {isFetching && <div>fetching</div>}
          {(mutator.isLoading || mutator.isIdle) && <div>...deleting</div>}
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
          deleteRow={(i) => {
            deleteRow(i);
            let x: number = mutatedLen
              ? mutatedLen
              : paginated_data &&
                paginated_data["data"] &&
                (paginated_data["data"]["len"] as unknown as number);
            setLen(x - 1);
          }}
          len={len as number}
        />
      </div>
    </div>
  );
}
