import { Route, useNavigate, Routes } from "react-router-dom";
import TreeSettings from "../components/TreeSettings";
import { IMenuItems } from "../components/Interface";
import { Set, Column } from "../components/Interface";
import { Element } from "../hooks/useTreeSettings";
import PossibleLabel from "../components/PossibleLabel";
import { useTable } from "../hooks/useTableView";

import Table from "../components/Table";
import "../scss/TreeSettings.scss";
interface IProps {
  set: Set;

  pageSize: number;
  datalength: number;
  el: Element;
  idroot: string | null;
  treedata: IMenuItems[];
  columns: Column[];
  actcategory: string;
  setDataLength: (length: number) => void;
  preview: () => void;
  enableDropping: (
    event: React.DragEvent<HTMLDivElement>,
    name: string
  ) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    name: string
  ) => void;
  loadDatabase: (i: number) => void;
  changeSize(e: React.ChangeEvent<HTMLInputElement>): void;
}

const Settings = ({
  actcategory,
  set,
  setDataLength,

  pageSize,
  datalength,
  el,
  idroot,
  treedata,
  columns,
  preview,
  enableDropping,
  handleDrop,
  handleDragStart,
  loadDatabase,
  changeSize,
}: IProps) => {
  const navigate = useNavigate();
  const [selectRecord] = useTable("");
  // This function is triggered when the select changes
  const change = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    loadDatabase(parseInt(value));
  };
  return (
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
              treedata={treedata}
              set={set}
              pageSize={pageSize}
              setDataLength={setDataLength}
              actcategory={actcategory}
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
              onDrop={(event) => handleDrop(event)}
            >
              ROOT
            </p>
            <div className="menu">
              {idroot === "ROOT" && (
                <PossibleLabel
                  ifroot="ifrooty"
                  level={1}
                  title={el.old && el.old.name}
                />
              )}
              <TreeSettings
                actLabel={el.act && el.act.name}
                oldLabel={el.old && el.old}
                data={treedata}
                handleDragStart={handleDragStart}
                enableDropping={enableDropping}
                handleDrop={handleDrop}
              />{" "}
            </div>
            <div className="label1">1. drag'n'drop tree menu items</div>
          </div>
        }
      />
    </Routes>
  );
};

export default Settings;
