import { Home } from "../home/Home";
import { Nav } from "../../features/layout/nav";
import { Route, useLocation, Routes } from "react-router-dom";
import { Settings } from "../settings";
import { SearchPage } from "../search";
import { Recordpage } from "../record";
import { useApp } from "./api/useApp";
import { AppStateContext } from "../../ctx/useThemeContext";
import { useState } from "react";

import "./App.css";

function App() {
  const {
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
  } = useApp();
  const location = useLocation();

  const initialState = {
    //inital count set to 0
    i: 0,
    theme: ["1", "2", "3"],
    //dummy object that will become function later
    setState: {},
  };
  const [state, setState] = useState(initialState);

  return (
    <AppStateContext.Provider value={{ state, setState }}>
      {" "}
      <div className="App">
        {" "}
        <div className="navcontainer">
          <Nav
            one={(str) => {
              if (str === "settings") setMenuItems(false);
              if (str === "search") setMenuItems(true);
            }}
          />{" "}
        </div>
        <Routes>
          <Route
            path={"/:item"}
            element={
              <>
                <Home
                  setoflen={setoflen}
                  setLength={(e) => setLength(e)}
                  overItem={overItem}
                  onmouseover={(str) => onmouseover(str)}
                  length={datalength}
                  treedata={treedata}
                  changecategory={(str) => {
                    changeCategory(location.pathname, str);
                  }}
                  actcategory={set1.actcategory}
                  set={set1}
                  pageSize={pageSize}
                  setDataLength={(length: number) => setLength(length)}
                  setLen={(e: boolean) => {
                    setLen(e);
                  }}
                />
              </>
            }
          />
          <Route
            path="search"
            element={
              <SearchPage
                url={location.pathname.split("/")[1]}
                onChange={(str) => onChange(str)}
                setoflen={setoflen}
                setLength={(e) => setLength(e)}
                overItem={overItem}
                onmouseover={(str) => onmouseover(str)}
                length={datalength}
                treedata={treedata}
                changecategory={(str) => {
                  changeCategory(location.pathname, str);
                }}
                actcategory={set1.actcategory}
                set={set1}
                pageSize={pageSize}
                setDataLength={(length: number) => setLength(length)}
                setLen={(e: boolean) => {
                  setLen(e);
                }}
              />
            }
          />
          <Route
            path="settings/*"
            element={
              <div className="settingscontainer">
                {" "}
                <Settings
                  handleDragEnd={handleDragEnd}
                  display={display}
                  pageSize={pageSize}
                  datalength1={datalength}
                  loadDatabase={(database) =>
                    setSet1({ ...set1, database: database })
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
                  set={set1}
                  setDataLength={setDatalength}
                  actcategory={actcategory}
                />
              </div>
            }
          />{" "}
          <Route
            path="record/:index"
            element={
              <Recordpage
                pageSize={pageSize}
                setoflen={setoflen}
                overItem={overItem}
                onmouseover={(str) => onmouseover(str)}
                selected={actcategory}
                datalength={datalength}
                treedata={treedata}
                actcategory={actcategory}
                set={set1}
                changecategory={(str) => {
                  changeCategory(location.pathname, str);
                }}
                record={selectedRecord}
                length={datalength}
                deleteRec={deleteRec}
                update={update}
                setLen={(e: boolean) => {
                  setLen(e);
                }}
              />
            }
          />
        </Routes>
      </div>
    </AppStateContext.Provider>
  );
}

export default App;
