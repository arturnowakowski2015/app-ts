import { Route, useNavigate, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import TreeSettings from "../../features/layout/tree-settings/tree-settings";
import { IMenuItems, Set } from "../../model/Interface";
import { useTempTable } from "../../features/layout/table/api/useTempTable";
import { useGetPaginatedData } from "../../features/layout/table/api/useGetPaginatedData";

import { Element } from "../../model/Interface";

import { Table } from "../../features/layout/table/table";
import { PossibleLabel } from "../../features/ui/possible-label";
import { useSettings } from "./api/useSettings";
import "../../styles/TreeSettings.scss";
interface IProps {
  set: Set;

  pageSize: number;
  datalength1: number;
  el: Element;
  idroot: string | null;
  treedata: IMenuItems[];
  display: boolean;
  actcategory: string;
  setDataLength: (length: number) => void;
  preview: () => void;
  enableDropping: (
    event: React.DragEvent<HTMLDivElement>,
    name: string
  ) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>, name: string) => void;
  handleDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    name: string
  ) => void;
  loadDatabase: (i: string) => void;
  changeSize(e: React.ChangeEvent<HTMLInputElement>): void;
  handleDragEnd: (event: React.DragEvent<HTMLDivElement>, name: string) => void;
}

export const Settings = ({
  actcategory,
  set,
  setDataLength,
  handleDrop,
  pageSize,
  datalength1,
  el,
  idroot,
  treedata,
  display,
  preview,
  enableDropping,
  loadDatabase,
  changeSize,
  handleDragEnd,
  handleDragStart,
}: IProps) => {
  const {
    len,
    columns,
    setDirection,
    showSelectedColumn,
    paginated_data,
    onSort,
    showChevron,
    setDatabase,
    refetch,
  } = useSettings(
    actcategory,
    set,

    pageSize,

    treedata
  );

  const navigate = useNavigate();
  return (
    <>
      {" "}
      <Routes>
        <Route
          path="tablesettings"
          element={
            <div className="settings1">
              <div className="settingtable">
                <div className="div" onClick={preview}>
                  preview
                </div>
                <div className="div" onClick={() => navigate("treesettings")}>
                  tree settings
                </div>
                <label className="div1">change database</label>
                <select
                  className="div1"
                  onChange={(e) => {
                    loadDatabase(e.target.value as string);
                    setDatabase(e.target.value as string);
                  }}
                >
                  <option value="comments">comments</option>
                  <option value="photos">photos</option>
                </select>
                {pageSize}
                <input
                  className="div1"
                  type="range"
                  name="quantity"
                  min="1"
                  max={120}
                  value={pageSize}
                  onChange={(q) => {
                    changeSize(q);
                    refetch();
                  }}
                />
              </div>
              <Table
                iflen={false}
                cross={true}
                sort={() => onSort()}
                showChevron={(e: Boolean) => showChevron(e)}
                columns={columns}
                pageSize={pageSize}
                result={
                  paginated_data &&
                  paginated_data["data"] &&
                  (paginated_data["data"]["data"] as unknown as any[])
                }
                showSelectedColumn={showSelectedColumn}
                showQuery={(i) => {}}
                deleteRow={(i) => {}}
                len={len as number}
              />
            </div>
          }
        />
        <Route
          path="treesettings"
          element={
            <div className="settings1">
              <div className="div" onClick={preview}>
                preview
              </div>
              <div className="div" onClick={() => navigate("tablesettings")}>
                {" "}
                table settings
              </div>
              <p
                id="ROOT"
                className="root"
                draggable="true"
                onDragOver={(event) => enableDropping(event, "sss")}
                onDrop={(event) => handleDrop(event, "ddd")}
              >
                ROOT
              </p>
              <div className="menu">
                {idroot === "ROOT" && (
                  <PossibleLabel
                    ifroot="ifrooty"
                    level={1}
                    title={el.old && el.old.name}
                    display={true}
                  />
                )}

                <TreeSettings
                  display={display}
                  actLabel={el.act && el.act.name}
                  oldLabel={el.old && el.old}
                  data={treedata}
                  handleDragStart={handleDragStart}
                  enableDropping={enableDropping}
                  handleDrop={handleDrop}
                  handleDragEnd={handleDragEnd}
                />
              </div>
              <div className="label1">1. drag'n'drop tree menu items</div>
            </div>
          }
        />
      </Routes>
    </>
  );
};
