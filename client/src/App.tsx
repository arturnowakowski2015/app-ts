import { useRef, useEffect, useState } from "react";
import { Home } from "./pages/home/Home";
import { Nav } from "./features/layout/nav";
import { useConvertTree } from "./api/useConvertTree";
import { useTreeSettings } from "./features/layout/tree-settings/api/useTreeSettings";
import { Route, useNavigate, Routes, useLocation } from "react-router-dom";
import { data, tree } from "./data/dummy";
import { DataLengths, Set } from "./model/Interface";
import { useTable } from "./features/layout/table/api/useTableView";
import { Settings } from "./pages/settings";
import { SearchPage } from "./pages/search";
import { Recordpage } from "./pages/record";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRecord } from "./pages/record/useRecord";
import "./App.css";

function App() {
  let initialstep = useRef<Function>();
  const [menuItems, setMenuItems] = useState(true);
  const [actcategory, setActcategory] = useState("new");
  const [selectedMenu, setSelectedMenu] = useState<string[]>([]);
  const [overItem, setOverItem] = useState<string>("");
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
    selectRecord,

    setTableflag,
  } = useTable(actcategory);
  const [pageSize, setPageSize] = useState(10);
  const [datalength, setDatalength] = useState<number>(0);

  const [set, setSet] = useState<Set>({
    host: "http://localhost:3001/",
    actcategory: "new",
    database: "comments",
    datalengths: [{ "": 0 }],
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
  const setLen = (e: DataLengths) => {
    let o: Set = {} as Set;

    for (let k in e)
      for (let i = 0; i < set.datalengths.length; i++)
        for (let u in set.datalengths[i]) {
          // alert(k + "::::uuu  :::" + u);
          if (k === u) setIslen(true);
        }

    if (islen === true)
      for (let k in e) {
        set.datalengths.map((t) => {
          Object.keys(t).map((y) => {
            t[y] = e[k];
          });
        });
      }
    else
      for (let k in e) {
        set.datalengths = { ...set.datalengths, [k]: e[k] };
        //   alert("setbbbbb   " + JSON.stringify(set.datalengths));
      }
    setIslen(false);
    //set.datalengths.push({ [k]: e[k] });
    //alert("::ww:" + JSON.stringify(set.datalengths));

    setSet(set);
    alert("set   " + JSON.stringify(set));
  };
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
  const change = (str: string) => {
    if (location.pathname) setActcategory(str);

    let arr: string[] = [];
    for (let k = 0; k < treedata.length; k++)
      if (treedata[k].name === actcategory) arr[k] = "selected";
      else arr[k] = "item";
    setSelectedMenu(arr);
    navigate(str);
  };
  const changeCategory = (str: string) => {
    change(str);
  };
  const queryClient = new QueryClient({});
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Nav
          one={(str) => {
            if (str === "settings") setMenuItems(false);
            if (str === "search") setMenuItems(true);
          }}
        />
        <Routes>
          <Route
            path={"/:item"}
            element={
              <>
                {" "}
                {JSON.stringify(set)}
                <Home
                  setLength={(e) => setLength(e)}
                  overItem={overItem}
                  onmouseover={(str) => onmouseover(str)}
                  selected={actcategory}
                  length={datalength}
                  treedata={treedata}
                  changecategory={(str) => {
                    changeCategory(str);
                  }}
                  actcategory={actcategory}
                  datalength={datalength}
                  set={set}
                  pageSize={pageSize}
                  setDataLength={(length: number) => setLength(length)}
                  setLen={(e: DataLengths) => setLen(e)}
                />
              </>
            }
          />
          <Route
            path="search"
            element={
              <SearchPage
                onChange={onChange}
                treedata={treedata}
                actcategory={actcategory}
                set={set}
                pageSize={pageSize}
                setDataLength={(length: number) => setDatalength(length)}
              />
            }
          />
          <Route
            path="settings/*"
            element={
              <div>
                {" "}
                {datalength}
                <Settings
                  handleDragEnd={handleDragEnd}
                  display={display}
                  pageSize={pageSize}
                  datalength1={datalength}
                  loadDatabase={(database) =>
                    setSet({ ...set, database: database })
                  }
                  treedata={treedata}
                  el={el}
                  idroot={idroot}
                  handleDragStart={handleDragStart}
                  enableDropping={enableDropping}
                  handleDrop={handleDrop}
                  preview={() => preview()}
                  changeSize={(e) =>
                    changeSize(parseInt(e.currentTarget.value))
                  }
                  set={set}
                  setDataLength={setDatalength}
                  actcategory={actcategory}
                />
              </div>
            }
          />{" "}
          <Route
            path="record/:index"
            element={
              <div className="record">
                <Recordpage
                  overItem={overItem}
                  onmouseover={(str) => onmouseover(str)}
                  selected={actcategory}
                  datalength={datalength}
                  treedata={treedata}
                  actcategory={actcategory}
                  set={set}
                  changecategory={(str) => {
                    changeCategory(str);
                  }}
                  record={selectedRecord}
                  length={datalength}
                  deleteRec={deleteRec}
                  update={update}
                />
              </div>
            }
          />
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
