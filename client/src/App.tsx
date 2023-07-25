import { useRef, useEffect, useState } from "react";
import { Home } from "./pages/home/Home";
import { Nav } from "./features/layout/nav";
import { useConvertTree } from "./features/useConvertTree";
import { useTreeSettings } from "./features/layout/tree-settings/useTreeSettings";
import { Route, useNavigate, Routes, useLocation } from "react-router-dom";
import { tree } from "./data/dummy";
import { Set } from "./model/Interface";
import { useTable } from "./features/layout/table/useTableView";
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

  const initialstepfunktion = () => {
    zerotreetoarr(tree.children as [], [0]);
    flattenarr.sort((a, b) => a.id - b.id);
    setTreedata(flattenarr);
    flattenarr.map((t) => {
      if (t.name === actcategory) selectedMenu.push("selected");
      else selectedMenu.push("item");
      return t;
    });
    setSelectedMenu(selectedMenu);
    // navigate("new");
  };
  initialstep.current = initialstepfunktion;

  useEffect(() => {
    initialstep.current && initialstep.current();
  }, []);
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
              <Home
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
                setDataLength={(length: number) => setDatalength(length)}
              />
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
                <Settings
                  handleDragEnd={handleDragEnd}
                  display={display}
                  pageSize={pageSize}
                  datalength={datalength}
                  loadDatabase={loadDatabase}
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
