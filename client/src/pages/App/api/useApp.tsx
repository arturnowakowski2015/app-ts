import { useRef, useEffect, useState } from "react";

import { useLength } from "./useGetlength";
import { useConvertTree } from "../../../api/useConvertTree";
import { useTreeSettings } from "../../../features/layout/tree-settings/api/useTreeSettings";
import { useNavigate, Routes, useLocation } from "react-router-dom";
import { tree } from "../../../data/dummy";
import { DataLengths, Set } from "../../../model/Interface";

import { useTable } from "../../../features/layout/table/api/useTableView";
import { useRecord } from "../../record/api/useRecord";

const useApp = () => {
  const [menuItems, setMenuItems] = useState(true);
  const [actcategory, setActcategory] = useState("new");
  const [selectedMenu, setSelectedMenu] = useState<string[]>([]);
  const [overItem, setOverItem] = useState<string>("");
  const [setoflen, setSetoflen] = useState<DataLengths>({} as DataLengths);

  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  let { flattenarr, zerotreetoarr } = useConvertTree();
  const { update, deleteRec } = useRecord();
  const {
    columns,

    selectedRecord,

    tableflag,
    loadDatabase,
    filterData,

    setTableflag,
  } = useTable(actcategory);
  const [pageSize, setPageSize] = useState(10);
  const [datalength, setDatalength] = useState<number>(0);

  const [set1, setSet1] = useState<Set>({
    host: "http://localhost:3001/",
    actcategory: "new",
    database: "comments",
  });
  const changeSize = (i: number) => {
    setPageSize(i);
  };
  const preview = () => {
    navigate("/" + actcategory);
    setMenuItems(!menuItems);
  };

  const onmouseover = (str: string) => {
    if (str == "") setOverItem("");
    else setOverItem(str);
  };
  const [islen, setIslen] = useState<boolean>(false);

  const setLen = (e: boolean) => {
    setIslen(true);
    /*let o: Set = {} as Set;

    for (let k in e)
      for (let i = 0; i < set1.datalengths.length; i++)
        for (let u in set1.datalengths[i]) {
          // alert(k + "::::uuu  :::" + u);
          if (k === u) setIslen(true);
        }

    if (islen === true)
      for (let k in e) {
        set1.datalengths.map((t) => {
          Object.keys(t).map((y) => {
            t[y] = e[k];
          });
        });
      }
    else
      for (let k in e) {
        set1.datalengths = { ...set1.datalengths, [k]: e[k] };
        //   alert("setbbbbb   " + JSON.stringify(set.datalengths));
      }
    setIslen(false);
    //set.datalengths.push({ [k]: e[k] });
    //alert("::ww:" + JSON.stringify(set.datalengths));
    setSet1(set1);
    alert("set   " + JSON.stringify(set1));*/
  };
  const { result, isLoading, isFetching, refetch } = useLength(islen, set1);
  useEffect(() => {
    console.log(JSON.stringify(result && result.data.obj));
    setSetoflen(result && result.data.obj);
    setIslen(false);
    refetch();
  }, [islen]);
  useEffect(() => {
    setIslen(true);
  }, []);
  const setLength = (e: number) => {
    setDatalength(e);
  };
  let {
    display,
    idroot,
    treedata,
    setTreedata,
    el,
    handleDragStart,
    enableDropping,
    handleDrop,
    handleDragEnd,
  } = useTreeSettings();

  useEffect(() => {
    zerotreetoarr(tree.children as [], [0]);
    flattenarr.sort((a, b) => a.id - b.id);
    setTreedata(flattenarr);
    flattenarr.map((t) => {
      if (t.name === actcategory) selectedMenu.push("selected");
      else selectedMenu.push("item");
      return t;
    });
    setSelectedMenu(selectedMenu);
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChange = (str: string) => {
    setQuery(str);
  };
  const change = (path: string, str: string) => {
    if (location.pathname) setActcategory(str);
    alert(";;;;;" + path);
    let arr: string[] = [];
    for (let k = 0; k < treedata.length; k++)
      if (treedata[k].name === actcategory) arr[k] = "selected";
      else arr[k] = "item";
    setSelectedMenu(arr);
    navigate(str);
  };
  const changeCategory = (path: string, str: string) => {
    change(path, str);
    setSet1({ ...set1, actcategory: str });
  };
  const checknav = (setoflen: DataLengths, path: string): boolean => {
    for (let t in setoflen)
      if (t === location.pathname.split("/")[1] && setoflen[t] > 0) return true;
    return false;
  };
  return {
    query,
    display,
    idroot,
    treedata,
    setTreedata,
    el,
    handleDragStart,
    enableDropping,
    handleDrop,
    handleDragEnd,
    setDatalength,
    onChange,
    pageSize,
    changeCategory,
    datalength,
    onmouseover,
    overItem,
    setLength,
    setoflen,
    setMenuItems,
    update,
    deleteRec,
    selectedRecord,
    changeSize,
    setLen,
    set1,
    actcategory,
    preview,
    setSet1,
    checknav,
  };
};
export { useApp };
