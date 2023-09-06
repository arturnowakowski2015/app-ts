import { useSearch } from "./api/useSearch";
import { DataLengths, IMenuItems, Set } from "../../model/Interface";
import { Table } from "../../features/layout/table";
import { MenuItems } from "../../features/layout/menu-items";
import "../../styles/searchbox.scss";

import { useState } from "react";
interface IProps {
  url: string;
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
  onChange: (str: string) => void;
}

export const SearchPage = ({
  onChange,
  url,
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
}: IProps) => {
  const {
    data,
    options,
    query,
    filteredOptions,
    setQuery,
    reset,
    lens,
    setDirection,
    showSelectedColumn,
    columns,
    showChevron,
    setCurrentPage,
    currentPage,
    onSort,
    cross,
  } = useSearch(
    url,
    setoflen,
    treedata,
    length,
    overItem,
    set,
    pageSize,

    set && set.actcategory
  );
  const [op, setOp] = useState<boolean>(false);
  return (
    <div className="container" onMouseOut={() => setOp(false)}>
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
        <div className="searchcontainer">
          <label className="searchlabel">search name column</label>
          <div>
            <input
              id="searchinput"
              type="text"
              value={query}
              onMouseOver={() => setOp(true)}
              onChange={(e) => {
                setQuery(e.currentTarget.value);
                filteredOptions(e.currentTarget.value);
                onChange(e.currentTarget.value);
              }}
            />
            <div className={op ? "options" : "not"}>
              {options &&
                options.map((t, j) => {
                  return (
                    <div
                      onMouseOver={() => setOp(true)}
                      onClick={(e) => {
                        setQuery(e.currentTarget.innerText);
                      }}
                      key={j}
                      style={{
                        cursor: "pointer",
                        borderBottom: "black solid 0.5px",
                      }}
                    >
                      {t}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="table">
          <Table
            iflen={true}
            cross={true}
            sort={() => onSort()}
            showChevron={(e: Boolean) => showChevron(e)}
            columns={columns}
            pageSize={pageSize}
            result={data}
            showSelectedColumn={showSelectedColumn}
            showQuery={(i) => {
              if (currentPage < i) setDirection(false);
              else setDirection(true);
              setCurrentPage(i);
            }}
            deleteRow={(i) => {}}
            len={Number(lens)}
          />
        </div>
      </div>
    </div>
  );
};
