import { useState, useEffect } from "react";
import { MenuItems } from "../../features/layout/menu-items";
import { useLocation } from "react-router-dom";
import { useDeleteRec } from "./api/useDeleteRec";
import useHome from "../home/api/useHome";
import {
  IMenuItems,
  Set,
  DataTable,
  Record,
  DataLengths,
} from "../../model/Interface";
import { Rec } from "../../features/layout/record";
import { useTempTable } from "../../features/layout/table/api/useTempTable";
import { useGetPaginatedData } from "../../features/layout/table/api/useGetPaginatedData";
import { useGetRecord } from "./api/useGetRecord";
import "../../styles/home.scss";

interface IProps {
  setLen: (e: boolean) => void;

  setoflen: DataLengths;
  pageSize: number;
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
  setLen: ss,
  pageSize,
  setoflen,
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
  const location = useLocation();

  const [result, setResult] = useState<any[] | undefined>([] as any[]);
  const [len, setLen] = useState<number | undefined>(0);
  const [direction, setDirection] = useState<boolean>(true);
  const [ref, setRef] = useState<boolean>(false);
  const { currentPage, setLen: s } = useHome(
    set,
    setoflen,
    pageSize,
    treedata,
    actcategory
  );
  const { data: paginated_data } = useGetPaginatedData(
    location.pathname.split("/")[1],
    1,
    direction,
    len as number,
    currentPage,
    set,
    actcategory
  );

  const { columns } = useTempTable(
    set.actcategory,
    paginated_data && paginated_data["data"] && paginated_data["data"]["data"],
    treedata
  );
  const [id, setId] = useState<number>(Number(location.pathname.split("/")[2]));
  const data = useGetRecord(id, set);
  const mutator = useDeleteRec(set, currentPage);
  useEffect(() => {
    setId(Number(location.pathname.split("/")[2]));
  }, []);
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
        </div>
      </div>
      <div className="right">
        <Rec
          record={data?.result?.data?.rec}
          currentPage={currentPage}
          columns={columns}
          deleteRec={() => mutator.mutator.mutate(data?.result?.data?.rec)}
          update={update}
          set={set}
          id={id}
          url={location.pathname}
          setLen={ss}
        />
      </div>
    </div>
  );
}
