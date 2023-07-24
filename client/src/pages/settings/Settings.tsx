import { Route, useNavigate, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import TreeSettings from "../../features/layout/tree-settings/tree-settings";
import { IMenuItems, Set } from "../../model/Interface";
import { useTempTable } from "../../features/layout/table/useTempTable";
import { useGetPaginatedData } from "../../features/layout/table/useGetTableData";
import { Element } from "../../model/Interface";

import { Table } from "../../features/layout/table/table";
import { PossibleLabel } from "../../features/ui/possible-label";
import "../../styles/TreeSettings.scss";
interface IProps {
  set: Set;

  pageSize: number;
  datalength: number;
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
  loadDatabase: (i: number) => void;
  changeSize(e: React.ChangeEvent<HTMLInputElement>): void;
  handleDragEnd: (event: React.DragEvent<HTMLDivElement>, name: string) => void;
}

export const Settings = ({
  actcategory,
  set,
  setDataLength,

  pageSize,
  datalength,
  el,
  idroot,
  treedata,
  display,
  preview,
  enableDropping,
  handleDrop,
  handleDragStart,
  loadDatabase,
  changeSize,
  handleDragEnd,
}: IProps) => {
  const navigate = useNavigate();

  // This function is triggered when the select changes
  const change = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    loadDatabase(parseInt(value));
  };
  const [result, setResult] = useState<any[] | undefined>([] as any[]);
  const [len, setLen] = useState<number | undefined>(0);
  const [direction, setDirection] = useState<boolean>(true);
  const { data: paginated_data } = useGetPaginatedData(
    direction,
    0,
    1,
    set,
    actcategory
  );

  const {
    columns,

    onSort,
    showChevron,
    showSelectedColumn,
  } = useTempTable(
    set.actcategory,
    paginated_data && paginated_data["data"] && paginated_data["data"]["data"],
    treedata
  );
  useEffect(() => {
    setResult(
      paginated_data &&
        paginated_data["data"] &&
        (paginated_data["data"]["data"] as unknown as any[])
    );
  }, [paginated_data]); // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <>
      {" "}
      <Routes>
        <Route
          path="tablesettings"
          element={
            <div className="settings1">
              <div className="div" onClick={preview}>
                preview
              </div>
              <div className="div" onClick={() => navigate("treesettings")}>
                tree settings
              </div>
              <label>change database</label>
              <select onChange={change}>
                <option value="0">comments</option>
                <option value="1">photos</option>
              </select>{" "}
              <input
                type="range"
                name="quantity"
                min="1"
                max={datalength}
                value={pageSize}
                onChange={changeSize}
              />
              <Table
                sort={() => onSort()}
                showChevron={(e: Boolean) => showChevron(e)}
                columns={columns}
                pageSize={pageSize}
                result={result}
                showSelectedColumn={showSelectedColumn}
                showQuery={(i) => {
                  setDirection(false);
                }}
                deleteRow={() => {}}
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
