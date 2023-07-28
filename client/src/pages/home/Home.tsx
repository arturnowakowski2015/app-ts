import { MenuItems } from "../../features/layout/menu-items";
import { DataLengths, IMenuItems, Set } from "../../model/Interface";
import { Table } from "../../features/layout/table";
import useHome from "./useHome";
import { useEffect, useState } from "react";
import "../../styles/home.scss";

interface IProps {
  setoflen: DataLengths;
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
  setLength: (e: number) => void;
  setLen: (e: boolean) => void;
}

export function Home({
  setoflen,
  setLength,
  treedata,
  actcategory,
  datalength,
  selected,
  overItem,
  set,
  setDataLength,
  setLen: s,
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
    fetching,
    onSort,
    showChevron,
    columns,
    showSelectedColumn,
    setDirection,
    setCurrentPage,
    deleteRow,
    setLen,
  } = useHome(set, pageSize, treedata, actcategory);
  const [p, setP] = useState<boolean>(false);
  useEffect(() => {
    s(true);
    setP(true);
  }, [mutator.isLoading === false]);
  return (
    <div className="container">
      <div className="left">
        <div className="menu">
          <MenuItems
            setoflen={setoflen}
            overItem={overItem}
            onmouseover={(str) => onmouseover(str)}
            selected={actcategory}
            set={set}
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
          {fetching && <div>fetching</div>}
          {mutator.isLoading && <div>...deleting</div>}
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
          }}
          len={setoflen && setoflen[set && set.actcategory]}
        />
      </div>
    </div>
  );
}
