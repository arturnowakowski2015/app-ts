import { MenuItems } from "../../features/layout/menu-items";
import { DataLengths, IMenuItems, Set } from "../../model/Interface";
import { Table } from "../../features/layout/table";
import useHome from "./useHome";
import { useEffect } from "react";
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
  setLength: (e: number) => void;
  setLen: (e: DataLengths) => void;
}

export function Home({
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
  useEffect(() => {
    alert(
      JSON.stringify(
        paginated_data &&
          paginated_data["data"] &&
          paginated_data["data"]["obj"][actcategory]
      ) +
        ":::" +
        mutatedLen
    );
    let y = "";
    for (let u in paginated_data &&
      paginated_data["data"] &&
      paginated_data["data"]["obj"])
      if (u === set.actcategory) y = u;
    s({
      ...(paginated_data &&
        paginated_data["data"] &&
        paginated_data["data"]["obj"]),
      [y]: mutatedLen
        ? mutatedLen
        : paginated_data &&
          paginated_data["data"] &&
          paginated_data["data"]["obj"][actcategory],
    } as DataLengths);
  }, [deleteRow]);
  return (
    <div className="container">
      aaaa
      <div className="left">
        <div className="menu">
          <MenuItems
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
          len={len as number}
        />
      </div>
    </div>
  );
}
