import { useState, useEffect } from "react";
import { MenuItems } from "../../features/layout/menu-items";
import { IMenuItems, Set } from "../../model/Interface";
import { Table } from "../../features/layout/table";
import { useTempTable } from "../../features/layout/table/useTempTable";
import {
  useGetPaginatedData,
  useGetSortedData,
  useDeleteRow,
} from "../../features/layout/table/useGetTableData";

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
  const [currentPage, setCurrentPage] = useState(1);

  const [result, setResult] = useState<any[] | undefined>([] as any[]);
  const [len, setLen] = useState<number | undefined>(0);
  const [direction, setDirection] = useState<boolean>(true);
  const [ref, setRef] = useState<boolean>(false);
  const m = useDeleteRow(set, currentPage);

  const deleteRow = (id: number) => {
    m.mutate(id);
    console.log(id);
    setRef(true);
  };
  useEffect(() => {
    if (m.context?.nextPage.data.length < 1) {
      setCurrentPage(currentPage + 1);
    }
    // alert(currentPage + ":::" + m.context?.nextPage.data.length);
  }, [m.context?.nextPage]);
  const {
    isLoading,
    isFetching,
    isPreviousData,
    data: paginated_data,
  } = useGetPaginatedData(
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
    alert(JSON.stringify(paginated_data));
  }, [paginated_data]);
  useEffect(() => {
    setResult(
      sorted_data &&
        sorted_data["data"] &&
        (sorted_data["data"]["data"] as unknown as any[])
    );
  }, [sorted_data]); // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLen(
      sorted_data &&
        sorted_data["data"] &&
        (sorted_data["data"]["len"] as unknown as number)
    );
  }, [paginated_data, sorted_data]); // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    r();
    setRef(false);
  }, [ref]); // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <div className="container">
      aaaa
      {JSON.stringify(result)}
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
          {m.isLoading && <div>...deleting</div>}
        </div>
        <Table
          sort={() => onSort()}
          showChevron={(e: Boolean) => showChevron(e)}
          columns={columns}
          pageSize={pageSize}
          result={
            m.context?.currentPage1 ? m.context.currentPage1.data : result
          }
          showSelectedColumn={showSelectedColumn}
          showQuery={(i) => {
            if (currentPage < i) setDirection(false);
            else setDirection(true);
            setCurrentPage(i);
          }}
          deleteRow={(i) => {
            deleteRow(i);
          }}
          len={len as number}
        />
      </div>
    </div>
  );
}
