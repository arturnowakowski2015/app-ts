import { useConvertTree } from "../hooks/useConvertTree";
import { useTreeSettings } from "../hooks/useTreeSettings";
import { useEffect, useRef, useState } from "react";
import { Route, useNavigate, Routes, useLocation } from "react-router-dom";
import { tree } from "../data/dummy";
import useGlobalApi from "../hooks/useGlobalApi";

import Settings from "./Settings";
import MenuItems from "./MenuItems";
import SearchBox from "../pages/SearchBox";
import Table from "../components/Table";
import Rec from "./Rec";
import Nav from "./Nav";
import { useTable } from "../hooks/useTableView";
import { DataTable, Set } from "../components/Interface";
import "../scss/home.scss";
export interface IMenuItems {
  name: string;
  level: number;
  id: number;
  pid: number;
  children?: any[];
}
interface Comments {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const Home = () => {
  const [getHost] = useGlobalApi();
  let initialstep = useRef<Function>();
  const [menuItems, setMenuItems] = useState(true);
  const [actcategory, setActcategory] = useState("new");
  const [selectedMenu, setSelectedMenu] = useState<string[]>([]);
  const [overItem, setOverItem] = useState<string>("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  let { flattenarr, zerotreetoarr } = useConvertTree();

  const [
    columns,

    selectedRecord,

    tableflag,
    deleteRec,
    loadDatabase,
    filterData,
    selectRecord,
    update,
    setTableflag,
  ] = useTable(actcategory);
  const [pageSize, setPageSize] = useState(5);
  const [datalength, setDatalength] = useState<number>(0);

  const [set, setSet] = useState<Set>({
    host: getHost(),
    actcategory: "new",
    database: "comments",
  });
  const changeSize = (i: number) => {
    setPageSize(i);
    console.log(tableflag);
  };
  const preview = () => {
    navigate("/" + actcategory);
    setMenuItems(!menuItems);
  };
  const changeCategory = (str: string) => {
    if (location.pathname) setActcategory(str);

    let arr: string[] = [];
    for (let k = 0; k < treedata.length; k++)
      if (treedata[k].name === actcategory) arr[k] = "selected";
      else arr[k] = "item";
    setSelectedMenu(arr);
    navigate(str);
  };
  const onmouseover = (str: string) => {
    setOverItem(str);
  };
  const onmouseout = (str: string) => {
    setOverItem("");
  };
  let {
    idroot,
    treedata,
    setTreedata,
    el,
    handleDragStart,
    enableDropping,
    handleDrop,
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
    navigate("new");
  };
  initialstep.current = initialstepfunktion;

  interface Photos {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  }

  useEffect(() => {
    initialstep.current && initialstep.current();
  }, []);
  const onChange = (str: string) => {
    setQuery(str);
  };

  return (
    <>
      <Nav
        one={(str) => {
          if (str === "settings") setMenuItems(false);
          if (str === "search") setMenuItems(true);
        }}
      />
      <div className="container">
        {menuItems && (
          <div className="right">
            <div className="menu">
              <MenuItems
                overItem={overItem}
                onmouseout={(str) => onmouseout(str)}
                onmouseover={(str) => onmouseover(str)}
                selected={actcategory}
                length={datalength}
                treedata={treedata}
                onClick={(str) => {
                  changeCategory(str);
                }}
              />{" "}
            </div>
          </div>
        )}
        <Routes>
          {/* switch displays only one component that matches */}

          <Route
            path="/:item"
            element={
              <div className="left">
                ///{datalength}//
                {query}
                <Table
                  set={set}
                  treedata={treedata}
                  pageSize={pageSize}
                  setDataLength={(length) => setDatalength(length)}
                  actcategory={actcategory}
                />
              </div>
            }
          />

          <Route
            path="search"
            element={
              <div className="searchbox">
                <SearchBox onChange={onChange} />
                <div className="table">
                  <Table
                    treedata={treedata}
                    actcategory={actcategory}
                    set={set}
                    pageSize={pageSize}
                    setDataLength={(length) => setDatalength(length)}
                  />
                </div>
              </div>
            }
          />
          <Route
            path="record/:index"
            element={
              <div className="record">
                <Rec
                  update={(index, record) => {
                    // update(index, record as DataTable);
                  }}
                  deleteRec={(str, rec) => deleteRec(str, rec as DataTable)}
                  columns={columns}
                  record={selectedRecord}
                />
              </div>
            }
          />

          <Route
            path="settings/*"
            element={
              <div>
                <Settings
                  pageSize={pageSize}
                  datalength={datalength}
                  columns={columns}
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
          />
        </Routes>
      </div>
    </>
  );
};

export default Home;
