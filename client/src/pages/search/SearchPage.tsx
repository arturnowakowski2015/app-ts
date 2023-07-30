import { useSearch } from "./api/useSearch";
import { DataLengths, IMenuItems, Set } from "../../model/Interface";
import { Table } from "../../features/layout/table";
import "../../../styles/searchbox.scss";

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

  return (
    <>
      <div className="searchbox">
        <label className="searchlabel">search name column</label>
        <input
          id="searchinput"
          type="text"
          value={query}
          onMouseOut={() => reset()}
          onChange={(e) => {
            setQuery(e.currentTarget.value);
            filteredOptions(e.currentTarget.value);
            onChange(e.currentTarget.value);
          }}
        />
        <div className="options">
          {options.map((t, j) => {
            return <div key={j}>{t}</div>;
          })}
        </div>
      </div>
      <Table
        cross={cross}
        sort={() => onSort()}
        showChevron={(e: Boolean) => showChevron(e)}
        columns={columns}
        pageSize={pageSize}
        result={[]}
        showSelectedColumn={showSelectedColumn}
        showQuery={(i) => {
          if (currentPage < i) setDirection(false);
          else setDirection(true);
          setCurrentPage(i);
        }}
        deleteRow={(i) => {}}
        len={lens && (lens[set.actcategory] as number)}
      />
    </>
  );
};
