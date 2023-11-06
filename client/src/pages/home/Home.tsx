import { MenuItems } from "../../features/layout/menu-items";
import { DataLengths, IMenuItems, Set } from "../../model/Interface";
import { Table } from "../../features/layout/table";
import useHome from "./api/useHome";
import "../../styles/home.scss";

interface IProps {
  setoflen: DataLengths;
  treedata: IMenuItems[];
  length: number;
  overItem: string;
  onmouseover: (str: string) => void;
  set: Set;
  pageSize: number;
  setDataLength: (i: number) => void;
  changecategory: (str: string) => void;
  actcategory: string;
  setLength: (e: number) => void;
  setLen: (e: boolean) => void;
}

export function Home({
  setoflen,
  length,
  treedata,
  actcategory,
  overItem,
  set,
  setLen: s,
  changecategory,
  pageSize,
  onmouseover,
}: IProps) {
  const {
    cross,
    result,
    currentPage,
    lens,
    isDeleting,
    fetching,
    onSort,
    showChevron,
    columns,
    showSelectedColumn,
    setDirection,
    setCurrentPage,
    deleteRow,
  } = useHome(set, setoflen, pageSize, treedata, actcategory);

  return (
    <div className="container">
      <div className="left">
        <div className="menuHome">
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
        <div
          className="ratios"
          style={{
            height: "30px",
            position: "relative",
            top: "-60px",
            left: "-120px",
          }}
        >
          {fetching && (
            <div style={{ marginLeft: "150px" }}>
              ...fetching data from table
            </div>
          )}
          {isDeleting && <div>...deleting </div>}
        </div>
        <Table
          iflen={true}
          cross={cross}
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

            s(true);
          }}
          len={lens && (lens[set.actcategory] as number)}
        />
        {}
      </div>
    </div>
  );
}
